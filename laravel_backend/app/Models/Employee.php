<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'ten',
        'sdt',
        'diaChi',
        'gioiTinh',
        'user_id',
        'cv_id',
    ];
    public function cv()
    {
        return $this->belongsTo(ChucVu::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function pns()
    {
        return $this->hasMany(PhieuNhap::class,'empoyee_id','id');
    }
}
