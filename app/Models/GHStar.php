<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GHStar extends Model
{
    protected $table = 'gh_stars';
    protected $fillable = [
        'vendor_id',
        'date',
        'count'
    ];

    public function vendor()
    {
        return $this->belongsTo(Vendor::class, 'vendor_id');
    }
}
