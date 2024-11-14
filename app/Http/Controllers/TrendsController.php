<?php

namespace App\Http\Controllers;

use App\Models\Trend;
use App\Models\CountryTrend;
use App\Models\Vendor;
use App\Models\GHPull;
use App\Models\GHStar;
use App\Models\HNCount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class TrendsController extends Controller
{
    public function getChartData(Request $request)
    {
        try {
            $vendors = Vendor::with('primaryCategory')->get();
            $chartData = [];

            // Step 2: Iterate over vendors and calculate scores
            foreach ($vendors as $vendor) {
                $hnCounts = HNCount::where('vendor_id', $vendor->id)->get();
                $values = [];
                
                foreach ($hnCounts as $hnCount) {
                    $matchingPull = GHPull::where('date', $hnCount->date)
                                    ->where('vendor_id', $vendor->id)
                                    ->first();
                    $matchingStar = GHStar::where('date', $hnCount->date)
                                    ->where('vendor_id', $vendor->id)
                                    ->first();
                    $maxHNCount = HNCount::where('date', $hnCount->date)->max('count');
                    $maxGHStar = GHStar::where('date', $hnCount->date)->max('count');
                    $maxGHPull = GHPull::where('date', $hnCount->date)->max('count');
                    // Calculate the score based on normalized values
                    if (isset($matchingStar) && isset($matchingPull)) {
                        $score = $hnCount->count * 50 / $maxHNCount +
                                ($matchingStar->count * 25 / $maxGHStar) + 
                                ($matchingPull->count * 25 / $maxGHPull);
                    } else if (isset($matchingStar)) {
                        $score = $hnCount->count * 75 / $maxHNCount +
                                ($matchingStar->count * 25 / $maxGHStar);
                    } else if (isset($matchingPull)) {
                        $score = $hnCount->count * 75 / $maxHNCount +
                                ($matchingPull->count * 25 / $maxGHPull);
                    } else {
                        $score = $hnCount->count * 100 / $maxHNCount;
                    }

                    // Format the score to two decimal places and add it to values
                    array_push($values, number_format($score, 2));
                }

                // Add the vendor's data to chartData
                array_push($chartData, [
                    'name' => $vendor->db_name,
                    'data' => $values,
                    'primary_category' => $vendor->primaryCategory
                ]);
            }

            // Get x-axis options (dates for the first vendor)
            $vendor = Vendor::first();
            $xaxisOption = $vendor ? 
                HNCount::where('vendor_id', $vendor->id)->pluck('date')->toArray() : [];

            if (!$vendor) {
                Log::info('No vendor found.');
            }

            return response()->json(['success' => true, 'chartData' => $chartData, 'xaxis' => $xaxisOption]);
        } catch (\Exception $th) {
            return response()->json(['success' => false, 'error' => $th->getMessage()]);
        }
    }

}
