<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'message',
        'status',
    ];
    protected $with = ['customer'];
    public function customer()
    {
        return $this->hasOne(Customer::class, 'id', 'customer_id');
    }
}
