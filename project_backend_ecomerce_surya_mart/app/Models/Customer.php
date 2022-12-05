<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'c_fullname',
        'c_email',
        'c_notelp',
        'c_kecamatan',
        'c_desa',
        'c_dusun',
        'c_kodepos',
        'c_detail_alamat'
    ];
    
    // relasi one to many revres
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
