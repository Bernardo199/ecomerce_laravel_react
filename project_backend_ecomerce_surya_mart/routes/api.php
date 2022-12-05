<?php

use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\LogoutController;
use App\Http\Controllers\Api\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// route regsiter & login
Route::post('/register', RegisterController::class)->name('register');
Route::post('/login', LoginController::class)->name('login');
Route::post('/logout', LogoutController::class)->name('logout');

Route::middleware('auth:api')->get('/users', function (Request $request) {
    return $request->user();
});


// route product
Route::apiResource('/product', App\Http\Controllers\Api\ProductController::class);
// route category
Route::apiResource('/category', App\Http\Controllers\Api\CategoryController::class);
// route cart
Route::apiResource('/cart', App\Http\Controllers\Api\CartController::class);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
