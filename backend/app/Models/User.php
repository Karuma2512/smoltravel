<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes, HasApiTokens; // Chỉ cần khai báo một lần

    protected $fillable = [
        'name', 'email', 'password', 'age', 'country', 'role', 'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password' => 'hashed',
        'deleted_at' => 'datetime', // Laravel tự động hiểu soft delete
    ];
    
public function getAvatarUrlAttribute()
{
    return $this->avatar ? asset($this->avatar) : null;
}
// app/Models/User.php

public function packages()
{
    return $this->hasMany(Package::class); // Giả sử là model Package
}

}
