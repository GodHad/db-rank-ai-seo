<?php

namespace App\Http\Controllers;

use App\Models\Trend;
use App\Models\CountryTrend;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TrendsController extends Controller
{
    public function getChartData(Request $request)
    {
        try {
            $country = $request->query('country');
            $query = $country 
                ? CountryTrend::where('country_code', $country)
                : Trend::query();

            $chartData = $query->select(
                    'vendor_id',
                    DB::raw('ROUND(AVG(score), 2) as average_score'), // Calculate average score for each month
                    DB::raw('DATE_FORMAT(date, "%Y-%m") as month') // Format the date to 'YYYY-MM' format for month grouping
                )
                ->with('vendor')
                ->groupBy('vendor_id', 'month') // Group by vendor and month
                ->get()
                ->groupBy('vendor_id')
                ->map(function ($trends, $vendorId) {
                    $vendor = Vendor::with('primaryCategory')->find($vendorId);
                    if (!$vendor) {
                        return null;
                    }

                    $vendorName = $vendor->db_name;
                    $primary_category = $vendor->primaryCategory;
                    $scores = $trends->pluck('average_score')->map(function ($score) {
                        return (float)$score; // Cast score to float
                    })->toArray(); 

                    return [
                        'name' => $vendorName,
                        'data' => $scores,
                        'primary_category' => $primary_category
                    ];
                })
                ->filter() // Remove any null values
                ->values()
                ->toArray();

            $vendor = Vendor::first();

            $xaxisOption = $vendor
                ? Trend::select(DB::raw('DATE_FORMAT(date, "%Y-%m") as month'))
                    ->where('vendor_id', $vendor->id)
                    ->distinct()
                    ->orderBy('month')
                    ->pluck('month')
                    ->toArray()
                : [];

            if (!$vendor) {
                Log::info('No vendor found.');
            }

            return response()->json(['success' => true, 'chartData' => $chartData, 'xaxis' => $xaxisOption]);
        } catch (\Exception $th) {
            return response()->json(['success' => false, 'error' => $th->getMessage()]);
        }
    }
}
