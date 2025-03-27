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
        'featured' 
    ];

    protected $casts = [
        'featured' => 'boolean',
    ];

    protected $appends = [
        'image_url' 
    ];

    public function getImageFullUrlAttribute()
    {
        return url("storage/" . $this->attributes['image_url']);
    }

    protected $dates = ['deleted_at'];
}
