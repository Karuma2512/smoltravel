<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StaffMember extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'email', 'position', 'department',
        'phone', 'hire_date', 'status', 'profile_picture'
    ];
    protected $appends =[
        'profile_picture_url'
    ];
    public function getProfilePictureUrlAttribute()
    {
        return url("storage/".$this->profile_picture);
    }

}

