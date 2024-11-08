<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    protected $table = 'contents';
    protected $fillable = [
        'content',
        'page',
        'meta_title',
        'meta_description',
        'og_graph_image',
        'twitter_graph_image'
    ];
}
