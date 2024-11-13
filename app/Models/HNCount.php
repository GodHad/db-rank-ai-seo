<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HNCount extends Model
{
    protected $table = 'hn_counts';
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
