<?php

use App\Http\Controllers\admin\ManageEmloyeeController;
use App\Http\Controllers\BaoHanhController;
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
use  App\Http\Controllers\HomeController;
use  App\Http\Controllers\admin\ManageUserController;
use App\Http\Controllers\admin\ManagePhieuXuatController;
use App\Http\Controllers\admin\ManageProductController;
use App\Http\Controllers\admin\ManageNccController;
use App\Http\Controllers\admin\ManageNsxController;
use  App\Http\Controllers\admin\ManageEmployeeController;
use  App\Http\Controllers\admin\ManageLoaispController;
use  App\Http\Controllers\admin\ManageCustomerController;
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
//api của trang chủ
Route::get('/home', [HomeController::class,'home']);
//api thông tin tài khoản
Route::get('/detailUser', [UserController::class,'detailUser']);
Route::put('/detailUser', [UserController::class,'updateUser']);
Route::put('/changePass', [UserController::class,'changePass']);
//api tình trạng đơn hàng
Route::get('/getStatusDH/{id}', [PaymentController::class,'getStatus']);
//api check bảo hành
Route::get('/checkBaoHanh/{id}', [BaoHanhController::class,'checkBaoHanh']);
//login ở admin
Route::post('/loginAdmin', [ManageUserController::class,'login']);
//admin
Route::middleware('auth:sanctum','role')->prefix('admin')->group(function () {
    Route::get('noti', function () {
        return 'tui là admin';
    });
    //get all user
    Route::get('manageUser',[ ManageUserController::class,'index']);

    Route::resource('manageEmployee', ManageEmployeeController::class);
    //cấp tài khoản cho nhân viên
    Route::post('manageEmployee/createUser/{id}', [ManageCustomerController::class,'createUser']);

});



//thủ kho
Route::middleware('auth:sanctum','role_thukho')->prefix('kho')->group(function () {
            //Api Quản lý  Phiếu Xuất
            Route::resource('px', ManagePhieuXuatController::class);
            Route::get('editpx/{id}', [ManagePhieuXuatController::class,'editpx']);
            Route::get('ctpx/{id_px}', [ManagePhieuXuatController::class,'xemctpx']);
            Route::get('editctpx/{id_px}/{id_product}', [ManagePhieuXuatController::class,'editctpx']);

            // Api quản lý ncc , nsx
            Route::resource('ncc',ManageNccController::class);
            Route::resource('nsx',ManageNsxController::class);

            //Api Quản lý sản phẩm
            Route::resource('products',ManageProductController::class);
            Route::get('products-search', [ManageProductController::class,'search']);
            //Api quản lý loại sản phẩm
            Route::resource('loaisp', ManageLoaispController::class);
            // Chi tiết sản phẩm
            Route::get('products/chitiet/{id}', [ManageProductController::class,'ctsp']);

});

//nhân viên
Route::middleware('auth:sanctum','role_nhanvien')->prefix('nhanvien')->group(function () {

              //Api Quản lý  Phiếu Xuất
              Route::resource('px', ManagePhieuXuatController::class);
              Route::get('px/ctpx/{id_px}', [ManagePhieuXuatController::class,'xemctpx']);

              //Api Quản lý khách hàng
              Route::resource('customer', ManageCustomerController::class);

});


                            // API Long
                            // API Khách hàng
//Api sản phẩm
Route::resource('products/view', ProductController::class)->only('index');
Route::get('products-search', [ProductController::class,'search']);
//Api loại sản phẩm
Route::resource('loaisp/view', LoaispController::class)->only('index');
        // Chi tiết sản phẩm
        Route::get('products/chitiet/{id}', [ProductController::class,'ctsp']);

//Api giỏ hàng
Route::post('addtocart', [CartController::class,'addtocart']);
Route::get('cart', [CartController::class,'viewcart']);
Route::put('cart-updatequantity/{id_cart}/{scope}',[CartController::class,'updatequantity']);
Route::delete('deletecart/{id_cart}',[CartController::class,'deletecart']);

//Api Thanh Toán
Route::post('dathang', [PaymentController::class,'dathang']);
Route::post('pay', [PaymentController::class,'vnpay']);
Route::post('momo', [PaymentController::class,'momopay']);
Route::get('saveorder',[PaymentController::class,'saveorder']); // api này front end không dùng










// Route::resource('products/add', ProductController::class)->only('store');
// Route::delete('products/delete/{id}', [ProductController::class,'destroy']);
// Route::get('products/edit/{id}', [ProductController::class,'edit']);
// Route::put('products/update/{id}', [ProductController::class,'update']);
