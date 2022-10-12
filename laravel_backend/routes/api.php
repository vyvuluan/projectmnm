<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\PasswordResetController;
use  App\Http\Controllers\UserController;
use  App\Http\Controllers\ContactContrller;
use  App\Http\Controllers\ProductController;
use  App\Http\Controllers\NccController;
use  App\Http\Controllers\NsxController;
use  App\Http\Controllers\PaymentController;
use  App\Http\Controllers\CartController;
use  App\Http\Controllers\LoaispController;
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

Route::post('/login', [UserController::class,'login']);
Route::post('/register', [UserController::class,'register']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class,'logout']);
    Route::post('/contact', [ContactContrller::class,'store']);
});

Route::get('/login/{provider}', [UserController::class,'redirectToProvider']);
Route::get('/login/{provider}/callback', [UserController::class,'handleProviderCallback']);
Route::post('reset-password', [PasswordResetController::class,'sendMail']);
Route::put('reset-password/{token}',[PasswordResetController::class,'reset']);

Route::middleware('auth:sanctum','role')->prefix('admin')->group(function () {
    Route::get('noti', function () {
        return 'tui là admin';
    });
    // Route::post('/login', [UserController::class,'login']);
});


                            // API Long
//Api sản phẩm
Route::resource('products', ProductController::class);
//Api loại sản phẩm
Route::resource('loaisp', LoaispController::class);
        // Chi tiết sản phẩm
        Route::get('products/chitiet/{id}', [ProductController::class,'ctsp']);

//Api giỏ hàng
Route::post('addtocart', [CartController::class,'addtocart']);
Route::get('cart', [CartController::class,'viewcart']);

// Api ncc , nsx
Route::resource('ncc', NccController::class);
Route::resource('nsx', NsxController::class);

//Api Thanh Toán
Route::post('pay', [PaymentController::class,'vnpay']);
Route::post('momo', [PaymentController::class,'momopay']);
Route::get('saveorder',[PaymentController::class,'saveorder']);



// Route::resource('products/add', ProductController::class)->only('store');
// Route::delete('products/delete/{id}', [ProductController::class,'destroy']);
// Route::get('products/edit/{id}', [ProductController::class,'edit']);
// Route::put('products/update/{id}', [ProductController::class,'update']);
