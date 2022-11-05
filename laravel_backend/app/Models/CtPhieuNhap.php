<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CtPhieuNhap extends Model
{
    use HasFactory;
    protected $fillable = [
        'pn_id',
        'product_id',
        'soluong',
        'gia',
    ];
    protected $with = ['product'];
    public function pn()
    {
        return $this->belongsTo(PhieuNhap::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
