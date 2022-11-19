<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'tenSP',
        'soLuongSP',
        'hinh',
        'maLoai',
        'maNSX',
        'maNCC',
        'gia',
        'baohanh',
        'ctSanPham',
        'moTa'
    ];
    protected $with = ['comments', 'loaisp'];

    public function loaisp()
    {
        return $this->belongsTo(Loaisp::class, 'maLoai', 'id');
    }
    public function pnct()
    {
        return $this->hasOne(CtPhieuNhap::class, 'product_id', 'id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'product_id', 'id');
    }
}
