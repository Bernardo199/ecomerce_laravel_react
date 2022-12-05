<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // get data product
        $products = Product::with('category')->get();

        // return response
        return new ProductResource(true, 'List Data Products', $products);
    }
}
