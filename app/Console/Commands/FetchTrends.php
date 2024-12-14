<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Vendor;
use App\Models\GHPull;
use App\Models\GHStar;
use App\Models\HNCount;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class FetchTrends extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fetch:trends {id?} {--all}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fetch Google Trends data for specified keywords';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        set_time_limit(0);
    
        if ($this->option('all')) {
            $keywords = Vendor::get(['db_name', 'giturl', 'id'])->map(function ($vendor) {
                return [
                    'db_name' => $vendor->db_name,
                    'giturl' => $vendor->giturl,
                    'id' => $vendor->id,
                ];
            })->toArray();

            foreach ($keywords as $keyword) {
                $this->processTrendData($keyword);
            }
            $this->updateRankings();
        } else {
            $keyword = Vendor::find($this->argument('id'));

            if ($keyword) {
                $keyword = [
                    'db_name' => $keyword->db_name,
                    'giturl' => $keyword->giturl,
                    'id' => $keyword->id,
                ];
            }
            $this->processTrendData($keyword);
            $this->updateRankings();
        }

        $this->info("Trends fetched and processed");
    }

    private function processTrendData($keyword)
    {
        $to = Carbon::now()->subMonth()->startOfMonth();
        $from = $to->copy()->subMonths(12); 
        $fromDate = $from->toDateString();
        $toDate = $to->toDateString();
        $monthlyCounts = $this->fetchMonthlyMentions($keyword['db_name'], $fromDate, $toDate);
        $stars = $this->fetchGitHubStars($to->copy()->subMonths(13)->toDateString(), $toDate, $keyword['giturl']);
        $pulls = $this->fetchGitHubPulls($to->copy()->subMonths(13)->toDateString(), $toDate, $keyword['giturl']);
        
        HNCount::where('vendor_id', $keyword['id'])->delete();
        GHStar::where('vendor_id', $keyword['id'])->delete();
        GHPull::where('vendor_id', $keyword['id'])->delete();

        $elements = [];
        foreach ($monthlyCounts as $date => $count) {
            array_push($elements, [
                'vendor_id' => $keyword['id'],
                'date' => $date,
                'count' => $count
            ]);
        }
        HNCount::insert($elements);

        $elements = [];
        foreach ($stars as $date => $count) {
            array_push($elements, [
                'vendor_id' => $keyword['id'],
                'date' => $date,
                'count' => $count
            ]);
        }
        GHStar::insert($elements);

        $elements = [];
        foreach ($pulls as $date => $count) {
            array_push($elements, [
                'vendor_id' => $keyword['id'],
                'date' => $date,
                'count' => $count
            ]);
        }
        GHPull::insert($elements);
    }

    private function findMatchingRecord($records, $vendorId) {
        foreach ($records as $record) {
            if ((int)$record['vendor_id'] === (int)$vendorId) {
                return $record;
            }
        }
        return null;
    }

    private function updateRankings()
    {
        $latestDate = HNCount::max('date');
        
        $hnCounts = HNCount::where('date', $latestDate)->get()->toArray();
        $githubStars = GHStar::where('date', $latestDate)->get()->toArray();
        $githubPulls = GHPull::where('date', $latestDate)->get()->toArray();
        
        $maxHNCount = collect($hnCounts)->max('count');
        $maxGHStar = collect($githubStars)->max('count');
        $maxGHPull = collect($githubPulls)->max('count');
        
        $averageScores = [];
        foreach ($hnCounts as $hnCount) {
            $vendorId = $hnCount['vendor_id'];

            $matchingStar = $this->findMatchingRecord($githubStars, $vendorId);
            $matchingPull = $this->findMatchingRecord($githubPulls, $vendorId);

            $averageScores[$vendorId] = $hnCount['count'] * 50 / $maxHNCount;
            if (isset($matchingStar)) {
                $averageScores[$vendorId] += $matchingStar['count'] * 25 / $maxGHStar;
            }
            if (isset($matchingPull)) {
                $averageScores[$vendorId] += $matchingPull['count'] * 25 / $maxGHPull;
            }
        }
        
        arsort($averageScores);

        $rank = 1;
        foreach ($averageScores as $vendorId => $averageScore) {
            $vendor = Vendor::with('primaryCategory')->find($vendorId);
            if ($vendor) {
                $vendor->overall_ranking = $rank++;
                $vendor->primary_ranking = ''; 
                $vendor->save();
            }
        }

        $categoryRankings = [];

        $vendors = Vendor::with('primaryCategory')->get();

        $categoryRankings = [];

        foreach ($vendors as $vendor) {
            foreach ($vendor->primaryCategory as $category) {
                $categoryId = $category->id;

                if (!isset($categoryRankings[$categoryId])) {
                    $categoryRankings[$categoryId] = [];
                }

                $categoryRankings[$categoryId][] = $vendor;
            }
        }

        ksort($categoryRankings);

        foreach ($categoryRankings as $categoryId => $vendorsInCategory) {
            usort($vendorsInCategory, fn($a, $b) => $a->overall_ranking <=> $b->overall_ranking);

            foreach ($vendorsInCategory as $index => $vendor) {
                $currentRanking = $vendor->primary_ranking ?? '';
                $vendor->primary_ranking = trim($currentRanking . ' ' . ($index + 1));
            }
        }

        foreach ($vendors as $vendor) {
            $vendor->save();
        }
    }

    private function fetchMonthlyMentions($keyword, $startDate, $endDate)
    {
        $monthlyCounts = [];
        $start = Carbon::parse($startDate)->startOfMonth();
        $end = Carbon::parse($endDate)->startOfMonth();

        while ($start <= $end) {
            $monthStart = $start->timestamp;
            $monthEnd = $start->copy()->endOfMonth()->timestamp;

            $response = Http::timeout(60)->get("https://hn.algolia.com/api/v1/search", [
                'query' => $keyword,
                'numericFilters' => "created_at_i>{$monthStart},created_at_i<{$monthEnd}"
            ]);

            $monthlyCounts[$start->toDateString()] = $response->json()['nbHits'] ?? 0;
            sleep(1);
            $start->addMonth();
        }

        return $monthlyCounts;
    }

    private function fetchGitHubStars($from, $to, $keywords)
    {
        $totalStarChanges = [];

        $repos = explode(',', $keywords);

        foreach ($repos as $repo) {
            $repo = trim($repo);

            $response = Http::withHeaders([
                'Accept' => 'application/json',
            ])->get("https://api.ossinsight.io/v1/repos/$repo/stargazers/history", [
                'per' => 'month',
                'from' => $from,
                'to' => $to,
            ]);

            if ($response->failed()) continue;
            $data = $response->json()['data']['rows'];

            foreach ($data as $index => $entry) {
                if ($index === 0) continue;

                $date = $entry['date'];
                $starChange = (int)$entry['stargazers'] - (int)$data[$index - 1]['stargazers'];

                if (isset($totalStarChanges[$date])) {
                    $totalStarChanges[$date] += $starChange;
                } else {
                    $totalStarChanges[$date] = $starChange;
                }
            }
        }

        return $totalStarChanges;
    }


    private function fetchGitHubPulls($from, $to, $keywords)
    {
        $totalPullRequestChanges = [];

        $repos = explode(',', $keywords);

        foreach ($repos as $repo) {
            $repo = trim($repo);

            $response = Http::withHeaders([
                'Accept' => 'application/json',
            ])->get("https://api.ossinsight.io/v1/repos/$repo/pull_request_creators/history", [
                'per' => 'month',
                'from' => $from,
                'to' => $to,
            ]);

            if ($response->failed()) continue;
            $data = $response->json()['data']['rows'];

            foreach ($data as $index => $entry) {
                if ($index === 0) continue;

                $date = $entry['date'];
                $pullRequestChange = (int)$entry['pull_request_creators'] - (int)$data[$index - 1]['pull_request_creators'];

                if (isset($totalPullRequestChanges[$date])) {
                    $totalPullRequestChanges[$date] += $pullRequestChange;
                } else {
                    $totalPullRequestChanges[$date] = $pullRequestChange;
                }
            }
        }

        return $totalPullRequestChanges;
    }

}