<?php

use App\Http\Controllers\AdminInertiaController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ChatBotController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\EncyclopediaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\SponsorController;
use App\Http\Controllers\SuggestedQuestionController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\VendorRequestController;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', [HomeController::class, 'render']);

Route::get('/explorer', [ChatBotController::class, 'render']);

Route::get('/ranking', [RankingController::class, 'renderTable']);
Route::get('/ranking/chart-view', [RankingController::class, 'renderChart']);

Route::get('/dbms', [VendorController::class, 'render']);
Route::get('/dbms/{slug}', [VendorController::class, 'renderDBMS']);
Route::get('/dbms/compare/{slug}', [VendorController::class, 'renderCompareDBMS']);
Route::get('/dbms/claim-dbms/{slug}', [VendorController::class, 'renderClaimDBMS']);

Route::get('/encyclopedia', [EncyclopediaController::class, 'render']);
Route::get('/encyclopedia/{slug}', [EncyclopediaController::class, 'renderEncyclopedia']);

Route::get('/blog', [BlogController::class, 'render']);
Route::get('/blog/create-blog', [BlogController::class, 'renderCreateBlog']);
Route::get('/blog/{slug}', [BlogController::class, 'renderBlog']);
Route::get('/blog/edit/{slug}', [BlogController::class, 'renderEditBlog']);

Route::get('/sponsors', [SponsorController::class, 'render']);

Route::get('/services', [ContentController::class, 'renderService']);
Route::get('/aboutus', [ContentController::class, 'renderAboutus']);

Route::get('/profile', [VendorRequestController::class, 'renderProfile']);

Route::get('/contact-us', [ContactController::class, 'render']);

Route::get('/sign-in', [LoginController::class, 'render']);
Route::get('/not-found', function() {
    return Inertia::render('NotFound');
});

Route::middleware(['admin'])->group(function () {
    Route::get('/admin', function () {
        return redirect('/admin/default');
    });
    Route::get('/admin/default', [AdminInertiaController::class, 'renderDBMS']);
    Route::get('/admin/banner', [AdminInertiaController::class, 'renderBanner']);
    Route::get('/admin/vendors', [AdminInertiaController::class, 'renderVendor']);
    Route::get('/admin/encyclopedia', [AdminInertiaController::class, 'renderEncyclopedia']);
    Route::get('/admin/blog', [AdminInertiaController::class, 'renderBlog']);
    Route::get('/admin/sponsor', [AdminInertiaController::class, 'renderSponsor']);
    Route::get('/admin/featured-products', [AdminInertiaController::class, 'renderFeaturedProducts']);
    Route::get('/admin/meta-data', [AdminInertiaController::class, 'renderMetaData']);
    Route::get('/admin/suggested-questions', [SuggestedQuestionController::class, 'render']);
});
