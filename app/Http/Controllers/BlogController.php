<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BCategory;
use App\Models\Tag;
use App\Models\FeaturedImage;
use App\Models\Content;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class BlogController extends Controller
{
    public function getBlogs(Request $request)
    {
        $countPerPage = $request->query('countPerPage', 10);
        $page = $request->query('page', 1);

        $categories = $request->query('categories') ? explode(',', $request->query('categories')) : null;
        $tags = $request->query('tags') ? explode(',', $request->query('tags')) : null;
        
        $query = Blog::with(['user', 'categories', 'tags', 'featured_images'])
        ->orderBy('created_at', 'desc');

        if ($categories) {
            $query->whereHas('categories', function($q) use ($categories) {
                $q->whereIn('b_categories.id', $categories);
            });
        }
    
        if ($tags) {
            $query->whereHas('tags', function($q) use ($tags) {
                $q->whereIn('tags.id', $tags);
            });
        }
    
        $blogs = $query->paginate($countPerPage, ['*'], 'page', $page);

        return response()->json(['success' => true, 'blogs' => $blogs]);
    }

    protected function generateSlug($title)
    {
        return strtolower(trim(preg_replace('/[\s\W-]+/', '-', $title), '-'));
    }

    public function getBlog(Request $request)
    {
        $id = $request->query('id');
        $slug = $request->query('slug');

        if (isset($id)) $blog = Blog::with(['user', 'categories', 'tags', 'featured_images'])->find($id);
        if (isset($slug)) $blog = Blog::with(['user', 'categories', 'tags', 'featured_images'])->whereRaw("LOWER(TRIM(BOTH '-' FROM REPLACE(REGEXP_REPLACE(title, '[[:space:][:punct:]]+', '-'), '--', '-'))) = ?", [$slug])->first();

        if (!$blog) {
            return response()->json(['success' => false, 'message' => 'Blog not found'], 404);
        }

        return response()->json(['success' => true, 'blog' => $blog]);
    }

    public function createBlog(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'tags' => ['required', 'string'],
            'categories' => ['required', 'string'],
            'featured_files' => ['required', 'array'],
            'featured_files.*' => ['file', 'mimes:jpeg,png,jpg,gif,webp,webp'],
            'meta_title' => ['required', 'string'],
            'meta_description' => ['required', 'string'],
            'og_graph_file' => ['required', 'file', 'mimes:jpeg,png,jpg,gif,webp'],
            'twitter_graph_file' => ['required', 'file', 'mimes:jpeg,png,jpg,gif,webp']
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $og_graph_image = $request->file('og_graph_file')->store('images/blogs/og_graph_images', 'public');
        $twitter_graph_image = $request->file('twitter_graph_file')->store('images/blogs/twitter_graph_images', 'public');

        $blog = Blog::create([
            'title' => $data['title'],
            'content' => $data['content'],
            'user_id' => Auth::guard('web')->user()->id,
            'meta_title' => $data['meta_title'],
            'meta_description' => $data['meta_description'],
            'og_graph_image' => $og_graph_image,
            'twitter_graph_image' => $twitter_graph_image
        ]);

        $tags = explode(',', $data['tags']);

        if ($tags) {
            foreach ($tags as $tag) {
                $blog->tags()->attach($tag);
            }
        }

        $categories = explode(',', $data['categories']);

        if ($categories) {
            foreach ($categories as $category) {
                $blog->categories()->attach($category);
            }
        }

        if ($request->hasFile('featured_files')) {
            foreach ($request->file('featured_files') as $file) {
                $filePath = $file->store('images/blogs/featured_images', 'public');

                FeaturedImage::create([
                    'blog_id' => $blog->id,
                    'url' => $filePath,
                ]);
            }
        }

        return response()->json(['success' => true]);
    }

    public function updateBlog(Request $request)
    {
        $data = $request->all();
        $id = $request->query('id');

        $validator = Validator::make($data, [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'tags' => ['required', 'string'],
            'categories' => ['required', 'string'],
            'featured_images' => ['nullable', 'array'],
            'featured_images.*' => ['string'],
            'featured_files' => ['nullable', 'array'],
            'featured_files.*' => ['file', 'mimes:jpeg,png,jpg,gif,webp,webp'],
            'meta_title' => ['required', 'string'],
            'meta_description' => ['required', 'string'],
            'og_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp'],
            'twitter_graph_file' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif,webp']
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);
        if ((!isset($data['featured_files']) || !is_array($data['featured_files']) && count($data['featured_files']) === 0) && (!isset($data['featured_images']) || count($data['featured_images']) === 0)) {
            return response()->json(['errors' => 'Featured Images are required'], 422);
        }

        if (!isset($data['og_graph_file']) && !isset($data['og_graph_image'])) {
            return response()->json(['errors' => 'Og Graph Image are required'], 422);
        }

        if (!isset($data['twitter_graph_file']) && !isset($data['twitter_graph_image'])) {
            return response()->json(['errors' => 'Twitter Graph Image are required'], 422);
        }

        $blog = Blog::find($id);
        
        if (!$blog) return response()->json(['error' => 'Blog is not found.'], 404);
        if ($blog->user_id !== Auth::guard('web')->user()->id && Auth::guard('web')->user()->admin === false) return response()->json(['error' => 'You can\'t edit this blog!'], 401);

        $blog->title = $data['title'];
        $blog->content = $data['content'];
        $blog->meta_title = $data['meta_title'];
        $blog->meta_description = $data['meta_description'];

        if ($request->hasFile('og_graph_file')) {
            Storage::disk('public')->delete($blog->og_graph_image);
            $og_graph_image = $request->file('og_graph_file')->store('images/blogs/og_graph_images', 'public');
            $blog->og_graph_image = $og_graph_image;
        }

        if ($request->hasFile('twitter_graph_file')) {
            Storage::disk('public')->delete($blog->twitter_graph_image);
            $twitter_graph_image = $request->file('twitter_graph_file')->store('images/blogs/twitter_graph_images', 'public');
            $blog->twitter_graph_image = $twitter_graph_image;
        }
        $blog->save();

        if ($request->hasFile('featured_files')) {
            foreach ($request->file('featured_files') as $file) {
                $filePath = $file->store('images/blogs/featured_images', 'public');

                FeaturedImage::create([
                    'blog_id' => $blog->id,
                    'url' => $filePath,
                ]);
            }
        }

        if (isset($data['removed_images'])) {
            $removed_images = $data['removed_images'];
    
            foreach ($removed_images as $key => $imageId) {
                $featuredImage = FeaturedImage::find($imageId);
        
                if ($featuredImage) {
                    // Delete the file from storage
                    Storage::disk('public')->delete($featuredImage->url);
                    
                    // Delete the record from the database
                    $featuredImage->delete();
                }
            }
        }


        $tagIds = explode(',', $data['tags']);
        $blog->tags()->sync($tagIds);

        $categoryIds = explode(',', $data['categories']);
        $blog->categories()->sync($categoryIds);

        return response()->json(['success' => true]);
    }

    public function deleteBlog(Request $request)
    {
        $id = $request->query('id');
        $blog = Blog::find($id);

        if (!$blog)
            return response()->json(['success' => false, 'errors' => [ 'Blog is not found']], 422);
        
        Storage::disk('public')->delete($blog->twitter_graph_image);
        Storage::disk('public')->delete($blog->og_graph_image);
        
        $urls = FeaturedImage::where('blog_id', $id)->pluck('url')->toArray();
        Storage::disk('public')->delete($urls);

        $blog->delete();
        return response()->json(['success' => true]);
    }

    public function getCategories()
    {
        $categories = BCategory::all();
        return response()->json(['success' => 'true', 'categories' => $categories]);
    }

    public function createCategory(Request $request)
    {
        $name = $request->input('name');
        $validator = Validator(['name' => $name], [
            'name' => ['required', 'string', 'max:255']
        ]);

        if ($validator->fails()) return response()->json(['error' => $validator->errors()], 422);

        $name = $validator->validated()['name'];
        BCategory::create([
            'name' => $name
        ]);
        return response()->json(['success' => true]);
    }

    public function updateCategory(Request $request)
    {
        $name = $request->input('name');
        $id = $request->query('id');
        $validator = Validator(['name' => $name], [
            'name' => ['required', 'string', 'max:255']
        ]);

        if ($validator->fails()) return response()->json(['error' => $validator->errors()], 422);

        $category = BCategory::find($id);
        if (!$category) return response()->json(['error' => 'Category not found'], 404);

        $name = $validator->validated()['name'];

        $category->name = $name;
        $category->save();

        return response()->json(['success' => true]);
    }

    public function deleteCategory(Request $request)
    {
        $id = $request->query('id');
        $category = BCategory::find($id);
        if (!$category) return response()->json(['error' => 'Category not found'], 404);
        $category->delete();

        return response()->json(['success' => true]);
    }

    public function getTags()
    {
        $tags = Tag::all();
        return response()->json(['success' => 'true', 'tags' => $tags]);
    }

    public function createTag(Request $request)
    {
        $name = $request->input('name');
        $validator = Validator(['name' => $name], [
            'name' => ['required', 'string', 'max:255']
        ]);

        if ($validator->fails()) return response()->json(['error' => $validator->errors()], 422);

        $name = $validator->validated()['name'];
        Tag::create([
            'name' => $name
        ]);
        return response()->json(['success' => true]);
    }

    public function updateTag(Request $request)
    {
        $name = $request->input('name');
        $id = $request->query('id');
        $validator = Validator(['name' => $name], [
            'name' => ['required', 'string', 'max:255']
        ]);

        if ($validator->fails()) return response()->json(['error' => $validator->errors()], 422);

        $tag = Tag::find($id);
        if (!$tag) return response()->json(['error' => 'Tag not found'], 404);

        $name = $validator->validated()['name'];

        $tag->name = $name;
        $tag->save();

        return response()->json(['success' => true]);
    }

    public function deleteTag(Request $request)
    {
        $id = $request->query('id');
        $tag = Tag::find($id);
        
        if (!$tag) return response()->json(['error' => 'Tag not found'], 404);
        $tag->delete();

        return response()->json(['success' => true]);
    }

    public function uploadImage(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'image' => ['required', 'file', 'mimes:jpeg,png,jpg,gif,webp']
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()]);

        $imageUrl = $request->file('image')->store('images/blogs', 'public');

        return response()->json(['imageUrl' => $imageUrl]);
    }

    public function render(): InertiaResponse
    {
        $content = Content::where('page', 'blog')->first();
        return Inertia::render('user/blog', ['content' => $content]);
    }

    private function getBlogBySlug($slug)
    {
        return Blog::with(['user', 'categories', 'tags', 'featured_images'])
                   ->whereRaw("LOWER(TRIM(BOTH '-' FROM REPLACE(REGEXP_REPLACE(title, '[[:space:][:punct:]]+', '-'), '--', '-'))) = ?", [$slug])
                   ->first();
    }

    public function renderBlog($slug): InertiaResponse
    {
        $blog = $this->getBlogBySlug($slug);

        if (!$blog) return Inertia::render('NotFound');

        return Inertia::render('user/blog/Blog', [
            'blog' => $blog,
            'route' => 'blog-show',
        ]);
    }

    public function renderCreateBlog(): InertiaResponse
    {
        return Inertia::render('user/blog/CreateBlog');
    }

    public function renderEditBlog($slug): InertiaResponse
    {
        $blog = $this->getBlogBySlug($slug);

        if (!$blog) return Inertia::render('NotFound');

        return Inertia::render('user/blog/Blog', [
            'blog' => $blog,
            'route' => 'blog-edit',
        ]);
    }
}
