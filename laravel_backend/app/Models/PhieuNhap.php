<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PhieuNhap extends Model
{
    use HasFactory;
    protected $fillable = [
        'employee_id',
        'ncc_id',
        'status',
        'tongTien'


    ];
    protected $with = ['pnct','ncc'];

    public function pnct()
    {
        return $this->hasMany(CtPhieuNhap::class, 'pn_id', 'id');
    }
    public function ncc()
    {
        return $this->belongsTo(Ncc::class);
    }
    public function emloyee()
    {
        return $this->belongsTo(Employee::class);
    }
}
