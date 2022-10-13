<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nsx extends Model
{
    use HasFactory;
    protected $fillable = ['tenNSX','quocGia'];
}
