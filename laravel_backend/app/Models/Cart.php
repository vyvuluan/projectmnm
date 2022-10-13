<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $fillable = ['maKH','maSP','soLuongSP'];

    protected $with =['Product'];
    public function product()
    {
        return $this->belongsto(Product::class,'maSP','id');
    }
}
