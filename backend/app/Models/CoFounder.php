<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CoFounder extends Model
{
    use HasFactory;

    protected $table = 'co_founders';

    protected $fillable = [
        'name',
        'email',
        'position',
        'bio',
        'linkedin',
        'twitter',
        'join_date',
        'profile_picture',
    ];
    protected $appends =[
        'profile_picture_url'
    ];
    public function getProfilePictureUrlAttribute()
    {
        return url("storage/".$this->profile_picture);
    }

}
