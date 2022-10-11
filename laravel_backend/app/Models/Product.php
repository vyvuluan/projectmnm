<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'TenSP',
        'soLuongSP',
        'hinh',
        'maLoai',
        'maNSX',
        'maNCC',
        'gia',
        'baohanh',
        'ctSanPham',
        'moTa'];
        public function loaisp()
        {
            return $this->belongsTo(loaisp::class,'maLoai','id');
        }

}

