<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'o_kode',
        'o_quantity',
        'o_total_bayar',
        'o_status',
        'o_date',
        'o_time',
        'customer_id'
    ];

    // relasi one to many
    public function customer()
    {
        return $this->hasMany(Customer::class);
    }

    // relasi many to many
    public function product()
    {
        return $this->belongsToMany(Product::class, 'detail_orders');
    }

}
