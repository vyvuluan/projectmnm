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
}
