<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'destination',
        'duration',
        'price',
        'description',
        'status',
        'featured',
        'image_url'  
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    protected $dates = ['deleted_at'];

    public function getImageUrlAttribute()
    {
        return isset($this->attributes['image_url']) && $this->attributes['image_url']
            ? asset('storage/' . $this->attributes['image_url'])
            : null;
    }


    public function getStatusLabelAttribute()
    {
        return $this->attributes['status'] == 'active' ? 'Active' : 'Inactive';
    }
}
