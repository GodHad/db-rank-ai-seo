<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuggestedQuestion extends Model
{
    protected $table = 'suggested_questions';
    protected $fillable = [
        'question'
    ];
}
