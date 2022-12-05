<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'p_image',
        'p_kode',
        'p_name',
        'p_price',
        'p_stock',
        'p_unit',
        'category_id',
    ];

    // relasi one to many revres
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // relasi one to many
    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    // relasi many to many
    public function order()
    {
        return $this->belongsToMany(Order::class, 'detail_orders');
    }

}
