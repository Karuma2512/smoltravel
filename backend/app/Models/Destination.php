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
    protected $appends =[
        'image_url'
    ];
    public function getImageUrlAttribute()
    {
        return url("storage/" . $this->attributes['image_url']);
    }
    protected $dates = ['deleted_at']; // 🟢 Khai báo cột deleted_at để Laravel hiểu đây là Soft Delete
}

