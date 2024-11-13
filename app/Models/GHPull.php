<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GHPull extends Model
{
    protected $table = 'gh_pulls';
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
