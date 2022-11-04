<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhieuXuat extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'customer_id',
        'status',
        'pt_ThanhToan',
        'tenKH',
        'sdt',
        'diaChi',
        'tongTien',
        'payment_id'


    ];
    protected $with = ['pxct'];
    public function pxct()
    {
        return $this->hasMany(CtPhieuXuat::class, 'px_id', 'id');
    }
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
