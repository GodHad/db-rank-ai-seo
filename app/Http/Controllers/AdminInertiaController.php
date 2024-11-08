<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AdminInertiaController extends Controller
{
    public function renderDBMS(): InertiaResponse
    {
        return Inertia::render('admin/dbms');
    }

    public function renderBanner(): InertiaResponse
    {
        return Inertia::render('admin/banner');
    }

    public function renderVendor(): InertiaResponse
    {
        return Inertia::render('admin/users');
    }

    public function renderEncyclopedia(): InertiaResponse
    {
        return Inertia::render('admin/encyclopedia');
    }

    public function renderBlog(): InertiaResponse
    {
        return Inertia::render('admin/blog');
    }

    public function renderSponsor(): InertiaResponse
    {
    return Inertia::render('admin/sponsors');
    }

    public function renderFeaturedProducts(): InertiaResponse
    {
        return Inertia::render('admin/featured-products');
    }

    public function renderMetaData(): InertiaResponse
    {
        return Inertia::render('admin/meta-data');
    }
}
