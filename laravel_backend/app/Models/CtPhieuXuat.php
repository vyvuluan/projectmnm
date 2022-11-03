<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CtPhieuXuat extends Model
{
    use HasFactory;
    protected $fillable = [
        'px_id',
        'product_id',
        'soluong',
        'gia',
    ];
    public function px()
    {
        return $this->belongsTo(PhieuXuat::class);
    }
    protected $with = ['product'];
    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
