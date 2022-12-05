<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CartResource;
use App\Http\Resources\CategoryResource;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        
        $carts = Cart::with('product')->get();
    
        return new CartResource(true, 'list data carts', $carts);
      
    }

    public function store(Request $request)
    {
        $carts = Cart::create([
            'product_id' => $request->product_id,
            'user_id'    => $request->user_id,
            'c_qty'      => $request->c_qty
        ]);
    
        return new CategoryResource(true, 'insert data products', $carts);

    }

    // method destroy item from cart
    public function destroy(Cart $cart)
    {
        // eleqount delete from modal cart
        $cart->delete();

        return new CategoryResource(true, 'delete data product', null);
    }
}
