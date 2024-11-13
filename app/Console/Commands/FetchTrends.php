<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Vendor;
use App\Models\PrimaryCategoryVendor;
use App\Models\CountryTrend;
use App\Models\Trend;
use App\Models\GHPull;
use App\Models\GHStar;
use App\Models\HNCount;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Collection;
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
        $exePath = __DIR__ . '/main.exe';
    
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

    private function updateRankings()
    {
        Log::info('Start to re-ranking');
        
        function findMatchingRecord($records, $vendorId) {
            foreach ($records as $record) {
                if ((int)$record['vendor_id'] === (int)$vendorId) {
                    return $record;
                }
            }
            return null;
        }

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
        
            $matchingStar = findMatchingRecord($githubStars, $vendorId);
            $matchingPull = findMatchingRecord($githubPulls, $vendorId);

            if ($matchingStar && $matchingPull) {
                $averageScores[$vendorId] = $hnCount['count'] * 50 / $maxHNCount +
                    ($matchingStar['count'] * 25 / $maxGHStar) + 
                    ($matchingPull['count'] * 25 / $maxGHPull);
            } else if ($matchingStar) {
                $averageScores[$vendorId] = $hnCount['count'] * 75 / $maxHNCount +
                    ($matchingStar['count'] * 25 / $maxGHStar);
            } else if ($matchingPull) {
                $averageScores[$vendorId] = $hnCount['count'] * 75 / $maxHNCount +
                    ($matchingPull['count'] * 25 / $maxGHPull);
            } else {
                $averageScores[$vendorId] = $hnCount['count'] * 100 / $maxHNCount;
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

        Log::info('Update overall ranking');
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

        Log::info('Finish re-ranking');
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

    private function fetchGitHubStars($from, $to, $keyword)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->get('https://api.ossinsight.io/v1/repos/' . $keyword . '/stargazers/history', [
            'per' => 'month',
            'from' => $from,
            'to' => $to,
        ]);

        $result = [];
        $data = $response->json()['data']['rows'];
        foreach ($data as $index => $entry) {
            if ($index === 0) continue;
            $result[$entry['date']] = (int)$entry['stargazers'] - (int)$data[$index - 1]['stargazers'];
        }
        
        return $result;
    }

    private function fetchGitHubPulls($from, $to, $keyword)
    {
        $response = Http::withHeaders([
            'Accept' => 'application/json',
        ])->get('https://api.ossinsight.io/v1/repos/' . $keyword . '/pull_request_creators/history', [
            'per' => 'month',
            'from' => $from,
            'to' => $to,
        ]);

        $result = [];
        $data = $response->json()['data']['rows'];
        foreach ($data as $index => $entry) {
            if ($index === 0) continue;
            $result[$entry['date']] = (int)$entry['pull_request_creators'] - (int)$data[$index - 1]['pull_request_creators'];
        }
        
        return $result;
    }
}