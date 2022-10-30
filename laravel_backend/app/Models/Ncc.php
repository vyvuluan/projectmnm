<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ncc extends Model
{
    use HasFactory;
    protected $fillable = ['tenNCC', 'diaChi', 'sdt'];
    public function ncc()
    {
        return $this->hasMany(PhieuNhap::class,'ncc_id','id');
    }
}
