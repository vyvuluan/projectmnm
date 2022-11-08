<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'ten',
        'ngaySinh',
        'diaChi',
        'sdt',
        'gioiTinh',
        'user_id',
    ];
    protected $with = ['user'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pxs()
    {
        return $this->hasMany(PhieuXuat::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'customer_id', 'id');
    }
}
