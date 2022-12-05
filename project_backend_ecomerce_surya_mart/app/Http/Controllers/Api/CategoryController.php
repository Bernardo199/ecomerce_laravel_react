<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $Categorys = Category::with('product')->get();

        return new CategoryResource(true, 'List data Category', $Categorys);
    }

    // get detail data category
    public function show(Category $category) {

        $id = $category->id;

        $category = Category::with('product')->where('id', $id)->get();
        // return response
        return new CategoryResource(true, 'Detail data Categorys', $category);
  }
}
