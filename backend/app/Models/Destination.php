<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; 
class Destination extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'name',
        'country',
        'description',
        'image_url',
        'status',
        'featured'
    ];
    protected $casts = [
        'featured' => 'boolean', 
    ];
    protected $appends = ['image_url'];

    protected $dates = ['deleted_at'];

   
    public function getImageUrlAttribute()
    {
        return $this->attributes['image_url']
            ? asset('storage/' . $this->attributes['image_url'])
            : null;
    }
    public function getStatusLabelAttribute()
    {
        return $this->attributes['status'] == 1 ? 'active' : 'inactive';
    }
}