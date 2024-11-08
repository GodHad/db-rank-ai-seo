<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ContentController extends Controller
{
    public function getContent(Request $request)
    {
        $page = $request->query('page');
        if (!isset($page)) return response()->json(['content' => ['content' => '', 'meta_title' => '', 'meta_description' => '', 'og_graph_file' => '', 'twitter_graph_file' => '']]);

        $content = Content::where('page', $page)->first();
        
        if (!isset($content)) return response()->json(['content' => ['content' => '', 'meta_title' => '', 'meta_description' => '', 'og_graph_file' => '', 'twitter_graph_file' => '']]);
        
        return response()->json(['success' => true, 'content' => $content]);
    }

    public function saveContent(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'content' => 'nullable|string',
            'page' => 'required|string',
            'meta_title' => ['nullable', 'string'],
            'meta_description' => ['nullable', 'string'],
            'og_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp'],
            'twitter_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp']
        ]);

        if ($validator->fails()) return response()->json(['success' => false, 'errors' => $validator->errors()], 422);

        $content = Content::where('page', $data['page'])->first();
        
        if (!$content) $content = Content::create(['page' => $data['page']]);

        if ($request->hasFile('og_graph_file')) {
            if ($content->og_graph_image) Storage::disk('public')->delete($content->og_graph_image);
            $og_graph_image = $request->file('og_graph_file')->store('images/contents/og_graph_images', 'public');
            $content->og_graph_image = $og_graph_image;
        }

        if ($request->hasFile('twitter_graph_file')) {
            if ($content->twitter_graph_image) Storage::disk('public')->delete($content->twitter_graph_image);
            $twitter_graph_image = $request->file('twitter_graph_file')->store('images/contents/twitter_graph_images', 'public');
            $content->twitter_graph_image = $twitter_graph_image;
        }

        $content->content = $data['content'];
        $content->meta_title = $data['meta_title'];
        $content->meta_description = $data['meta_description'];
        $content->save();

        return response()->json(['success' => true]);
    }

    public function renderService(): InertiaResponse
    {
        $content = Content::where('page', 'services')->first();
        return Inertia::render('user/services', ['content' => $content]);
    }

    public function renderAboutus(): InertiaResponse
    {
        $content = Content::where('page', 'aboutus')->first();
        return Inertia::render('user/aboutus', ['content' => $content]);
    }
}
