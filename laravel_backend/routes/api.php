<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RoleMiddleware;
use App\Http\Controllers\PasswordResetController;
use  App\Http\Controllers\UserController;
use  App\Http\Controllers\ContactContrller;
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

