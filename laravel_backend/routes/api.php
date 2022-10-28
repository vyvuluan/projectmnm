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
use  App\Http\Controllers\admin\ManagePhieuNhapController;
use  App\Http\Controllers\admin\ManageBaoCaoController;

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

Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'register']);
//api search nhà cung cấp theo tên mã số điện thoại
Route::get('/searchNcc', [ManageNccController::class, 'searchNcc']);
//api search sản phẩm theo tên mã
Route::get('/searchProduct', [ManageProductController::class, 'searchProduct']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/contact', [ContactContrller::class, 'store']);
});

Route::get('/login/{provider}', [UserController::class, 'redirectToProvider']);
Route::get('/login/{provider}/callback', [UserController::class, 'handleProviderCallback']);
Route::post('reset-password', [PasswordResetController::class, 'sendMail']);
Route::put('reset-password/{token}', [PasswordResetController::class, 'reset']);
//api của trang chủ (sản phẩm bán chạy, sản phẩm mới)
Route::get('/home', [HomeController::class, 'home']);
//api thông tin tài khoản
Route::get('/detailUser', [UserController::class, 'detailUser']);
Route::put('/detailUser', [UserController::class, 'updateUser']);
Route::put('/changePass', [UserController::class, 'changePass']);
//api tình trạng đơn hàng
Route::get('/getStatusDH/{id}', [PaymentController::class, 'getStatus']);
//api check bảo hành
Route::get('/checkBaoHanh/{id}', [BaoHanhController::class, 'checkBaoHanh']);
//login ở admin
Route::post('/loginAdmin', [ManageUserController::class, 'login']);
//admin
Route::middleware('auth:sanctum', 'role')->prefix('admin')->group(function () {
    Route::get('noti', function () {
        return 'tui là admin';
    });
    //get all user
    Route::get('manageUser', [ManageUserController::class, 'index']);

    Route::resource('manageEmployee', ManageEmployeeController::class);
    //cấp tài khoản cho nhân viên
    Route::post('manageEmployee/createUser/{id}', [ManageEmployeeController::class, 'createUser']);

    //api báo cáo thống kê
    Route::get('baocao', [ManageBaoCaoController::class, 'thongKeDoanhThuThang']);
});



//thủ kho
Route::middleware('auth:sanctum', 'role_thukho')->prefix('kho')->group(function () {
    //api thêm phiếu nhập
    Route::post('addPN', [ManagePhieuNhapController::class, 'addPN']);
    //api cập nhật phiếu nhập
    Route::put('updatePN/{pn_id}', [ManagePhieuNhapController::class, 'updatePN']);
    //api xóa chi tiết phiếu nhập
    Route::delete('deletePN/{pn_id}', [ManagePhieuNhapController::class, 'deletePN']);
    //api thêm chi tiết phiếu nhập
    Route::post('addCtPN/{id}', [ManagePhieuNhapController::class, 'addCtPN']);
    //api xóa chi tiết phiếu nhập
    Route::delete('deleteCtPN/{pn_id}/{product_id}', [ManagePhieuNhapController::class, 'deleteCtPN']);
    //api cập nhật chi tiết phiếu nhập
    Route::put('updateCtPN/{pn_id}/{product_id}', [ManagePhieuNhapController::class, 'updateCtPN']);
    //api cập nhật tổng tiền trong phiếu nhập
    Route::put('updateTotal/{pn_id}', [ManagePhieuNhapController::class, 'setTongTien']);
    //api hiển thị all phiếu nhập
    Route::get('getAllPN', [ManagePhieuNhapController::class, 'getAllPN']);
    //api hiển thị chi tiết phiếu nhập và phiếu nhập
    Route::get('PN/{pn_id}', [ManagePhieuNhapController::class, 'editPN']);
    //api sản phẩm sắp hết hàng < 10 số lượng
    Route::get('spGanHet', [ManageBaoCaoController::class, 'spGanHet']);

    //api lịch sử nhập hàng theo thời gian
    Route::get('lichSuNhapHang', [ManageBaoCaoController::class, 'lichSuNhapHang']);
    //api lịch sử xuất hàng theo thời gian
    Route::get('lichSuXuatHang', [ManageBaoCaoController::class, 'lichSuXuatHang']);

    //api thống kê doanh thu và số lượng
    Route::get('thongKeChiTieuSoLuong', [ManageBaoCaoController::class, 'thongKeChiTieuSoLuong']);


    //Api Quản lý  Phiếu Xuất
    Route::resource('px', ManagePhieuXuatController::class);
    Route::get('editpx/{px_id}', [ManagePhieuXuatController::class, 'editpx']);
    //Api Quản lý chi tiết phiếu xuất
    Route::get('ctpx/{px_id}', [ManagePhieuXuatController::class, 'xemctpx']);
    Route::get('editctpx/{px_id}/{product_id}', [ManagePhieuXuatController::class, 'editctpx']);
    Route::put('updatectpx/{px_id}/{product_id}', [ManagePhieuXuatController::class, 'updatectpx']);  // update ct phiếu xuất
    Route::post('addctpx', [ManagePhieuXuatController::class, 'addctpx']);          // Thêm ct phiếu xuất
    Route::delete('deletectpx/{px_id}/{product_id}', [ManagePhieuXuatController::class, 'deletectpx']);  // Xoá ct phiếu xuất

    // Api quản lý ncc , nsx
    Route::resource('ncc', ManageNccController::class);
    Route::resource('nsx', ManageNsxController::class);
    Route::get('nsxall', [ManageNsxController::class, 'nsxall']);
    Route::get('nccall', [ManageNccController::class, 'nccall']);


    //Api Quản lý sản phẩm
    Route::resource('products', ManageProductController::class);
    Route::get('products-search', [ManageProductController::class, 'search']); // Tìm Kiếm sản phẩm
    //Api quản lý loại sản phẩm
    Route::resource('loaisp', ManageLoaispController::class);
    // Chi tiết sản phẩm
    Route::get('products/chitiet/{id}', [ManageProductController::class, 'ctsp']);
});

//nhân viên
Route::middleware('auth:sanctum', 'role_nhanvien')->prefix('nhanvien')->group(function () {

    //Api Quản lý  Phiếu Xuất
    Route::resource('px', ManagePhieuXuatController::class);
    Route::get('px/ctpx/{id_px}', [ManagePhieuXuatController::class, 'xemctpx']);

    //Api Quản lý khách hàng
    Route::resource('customer', ManageCustomerController::class);

    //api thống kê doanh thu và số lượng của nhân viên
    Route::get('doanhThuNhanVien', [ManageBaoCaoController::class, 'doanhThuNhanVien']);
});


// API Long
// API Khách hàng
//Api sản phẩm
Route::resource('products/view', ProductController::class)->only('index');
Route::get('products-search', [ProductController::class, 'search']);
Route::get('allcomment/{product_id}', [ProductController::class, 'allcomment']);
Route::post('addcomment', [ProductController::class, 'addcomment']);

//Api loại sản phẩm
Route::resource('loaisp/view', LoaispController::class)->only('index');
Route::get('cate/product/{id}', [LoaispController::class, 'spcate']); // Lấy sản phẩm category
// Chi tiết sản phẩm
Route::get('products/chitiet/{id}', [ProductController::class, 'ctsp']);

//Api giỏ hàng
Route::post('addtocart', [CartController::class, 'addtocart']);
Route::get('cart', [CartController::class, 'viewcart']);
Route::put('cart-updatequantity/{id_cart}/{scope}', [CartController::class, 'updatequantity']);
Route::delete('deletecart/{id_cart}', [CartController::class, 'deletecart']);

//Api Thanh Toán
Route::post('validate-order', [PaymentController::class, 'validateOrder']);
Route::post('dathang', [PaymentController::class, 'dathang']);
Route::post('pay', [PaymentController::class, 'vnpay']);
Route::post('momo', [PaymentController::class, 'momopay']);
Route::get('saveorder', [PaymentController::class, 'saveorder']); // api này front end không dùng










// Route::resource('products/add', ProductController::class)->only('store');
// Route::delete('products/delete/{id}', [ProductController::class,'destroy']);
// Route::get('products/edit/{id}', [ProductController::class,'edit']);
// Route::put('products/update/{id}', [ProductController::class,'update']);
