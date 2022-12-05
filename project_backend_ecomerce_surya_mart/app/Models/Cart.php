<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'user_id',
        'c_qty'
    ];

    // relasi one to many revres
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // relasi one to many revres
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
