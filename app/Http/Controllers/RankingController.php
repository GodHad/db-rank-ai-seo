<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class RankingController extends Controller
{
    public function renderTable(Request $request): InertiaResponse
    {
        $category = $request->query('category', 0);
        $content = Content::where('page', 'dbms-ranking')->first();
        return Inertia::render('user/ranking', ['route' => 'table-view', 'content' => $content, 'category' => $category]);
    }

    public function renderChart(): InertiaResponse
    {
        $content = Content::where('page', 'dbms-ranking')->first();
        return Inertia::render('user/ranking', ['route' => 'chart-view', 'content' => $content]);
    }
}
