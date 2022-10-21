<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loaisp extends Model
{
    protected $fillable = ['tenLoai'];
    use HasFactory;
    public function products()
    {
        return $this->hasMany(Product::class,'maLoai','id');
    }
}
