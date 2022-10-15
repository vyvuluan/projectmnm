<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class ChucVu extends Model
{
    use HasFactory;
    protected $fillable = [
        'ten',
        
    ];
    public function emloyees()
    {
        return $this->hasMany(Employee::class,'cv_id','id');
    }
}
