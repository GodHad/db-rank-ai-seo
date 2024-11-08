<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class HomeController extends Controller
{
    public function render(): InertiaResponse
    {
        $content = Content::where('page', 'home')->first();
        return Inertia::render('user/home', ['content' => $content, 'title' => 'Home']);
    }
}
