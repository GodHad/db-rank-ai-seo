<?php

namespace App\Http\Controllers;

use App\Models\Encyclopedia;
use App\Models\Content;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class EncyclopediaController extends Controller
{
    public function encyclopedias()
    {
        $encyclopedias = Encyclopedia::all();
        return response()->json(['encyclopedias' => $encyclopedias]);
    }

    public function encyclopedia(Request $request)
    {
        $id = $request->query('id');
        $encyclopedia = EncycloPedia::find($id);
        return response()->json(['encyclopedia' => $encyclopedia]);
    }

    public function create(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'meta_title' => ['nullable', 'string'],
            'meta_description' => ['nullable', 'string'],
            'og_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp'],
            'twitter_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp']
        ]);
        
        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $og_graph_image = $request->file('og_graph_file')->store('images/encyclopedia/og_graph_images', 'public');
        $twitter_graph_image = $request->file('twitter_graph_file')->store('images/encyclopedia/twitter_graph_images', 'public');

        Encyclopedia::create([
            ...$validator->validated(),
            'og_graph_image' => $og_graph_image,
            'twitter_graph_image' => $twitter_graph_image
        ]);

        return response()->json(['success' => true]);
    }

    public function update(Request $request)
    {
        $data = $request->all();
        $id = $request->query('id');
        $validator = Validator::make($data, [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'meta_title' => ['nullable', 'string'],
            'meta_description' => ['nullable', 'string'],
            'og_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp'],
            'twitter_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp']
        ]);

        $encyclopedia = Encyclopedia::find($id);
        if (!$encyclopedia) return response()->json(['errors' => 'Not found the encyclopedia'], 422);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);
        
        $encyclopedia->title = $data['title'];
        $encyclopedia->content = $data['content'];
        $encyclopedia->meta_title = $data['meta_title'];
        $encyclopedia->meta_description = $data['meta_description'];

        if ($request->hasFile('og_graph_file')) {
            if ($encyclopedia->og_graph_image) Storage::disk('public')->delete($encyclopedia->og_graph_image);
            $og_graph_image = $request->file('og_graph_file')->store('images/encyclopedia/og_graph_images', 'public');
            $encyclopedia->og_graph_image = $og_graph_image;
        }

        if ($request->hasFile('twitter_graph_file')) {
            if ($encyclopedia->twitter_graph_image) Storage::disk('public')->delete($encyclopedia->twitter_graph_image);
            $twitter_graph_image = $request->file('twitter_graph_file')->store('images/encyclopedia/twitter_graph_images', 'public');
            $encyclopedia->twitter_graph_image = $twitter_graph_image;
        }

        $encyclopedia->save();
        return response()->json(['success' => true]);
    }

    public function delete(Request $request)
    {
        $id = $request->query('id');
        $encyclopedia = Encyclopedia::find($id);

        if (!$encyclopedia)
            return response()->json(['error' => 'Not found the encyclopedia'], 404);

        $encyclopedia->delete();
        return response()->json(['success' => true]);
    }

    public function render(): InertiaResponse
    {
        $content = Content::where('page', 'encyclopedia')->first();
        return Inertia::render('user/encyclopedia', ['content' => $content]);
    }

    private function getEncyclopediaBySlug($slug)
    {
        return Encyclopedia::whereRaw("LOWER(TRIM(BOTH '-' FROM REPLACE(REGEXP_REPLACE(title, '[[:space:][:punct:]]+', '-'), '--', '-'))) = ?", [$slug])
                   ->first();
    }

    public function renderEncyclopedia($slug): InertiaResponse
    {
        $encyclopedia = $this->getEncyclopediaBySlug($slug);

        if (!$encyclopedia) return Inertia::render('NotFound');
        return Inertia::render('user/encyclopedia/Encyclopedia', ['slug' => $slug, 'encyclopedia' => $encyclopedia]);
    }
}
