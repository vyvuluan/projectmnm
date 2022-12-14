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
use  App\Http\Controllers\admin\DiscountController;
use Illuminate\Support\Facades\Redirect;



use App\Models\ConfirmMail;
use Carbon\Carbon;
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
Route::get('test', function () {
    //return Redirect::away('http://localhost:3000/confirm-email?email=');
    $today = Carbon::now();
    $confirms = ConfirmMail::get();
    foreach ($confirms as $confirm) {
        if (strtotime($today) > strtotime($confirm->created_at . ' + 3 minute')) {
            echo $confirm->code;

            echo '</br>';
        }
        echo  strtotime($today);
        echo '</br>';

        echo strtotime($confirm->created_at . ' + 3 minute');
    }
});

Route::put('/confirm-email/{email}', [UserController::class, 'confirm_email']);
Route::post('/gui-lai-code/{email}', [UserController::class, 'gui_lai_code']);

//api search nh?? cung c???p theo t??n m?? s??? ??i???n tho???i
Route::get('/searchNcc', [ManageNccController::class, 'searchNcc']);
//api search nh?? s???n xu???t theo t??n m?? qu???c gia
Route::get('/searchNsx', [ManageNsxController::class, 'searchNsx']);
//api search s???n ph???m theo t??n m??
Route::get('/searchProduct', [ManageProductController::class, 'searchProduct']);
//api search phi???u nh???p
Route::get('/searchPn', [ManagePhieuNhapController::class, 'searchPn']);

Route::get('/searchEmp', [ManageEmployeeController::class, 'searchEmp']);
Route::get('/locTenNvAZ', [ManageEmployeeController::class, 'locTenAZ']);
Route::get('/locTenNvZA', [ManageEmployeeController::class, 'locTenZA']);
//api check discount
Route::get('check-discount', [DiscountController::class, 'check_discount']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/contact', [ContactContrller::class, 'store']);
    //api xem danh s??ch ????n h??ng c???a kh??ch h??ng
    Route::get('/danh-sach-don-hang-khach-hang', [PaymentController::class, 'getDH_maKH']);
});

Route::get('/login/{provider}', [UserController::class, 'redirectToProvider']);
Route::get('/login/{provider}/callback', [UserController::class, 'handleProviderCallback']);
Route::post('reset-password', [PasswordResetController::class, 'sendMail']);
Route::put('reset-password/{token}', [PasswordResetController::class, 'reset']);
//api c???a trang ch??? (s???n ph???m b??n ch???y, s???n ph???m m???i)
Route::get('/home', [HomeController::class, 'home']);
//api th??ng tin t??i kho???n
Route::get('/detailUser', [UserController::class, 'detailUser']);
Route::put('/detailUser', [UserController::class, 'updateUser']);
Route::put('/changePass', [UserController::class, 'changePass']);
//api t??nh tr???ng ????n h??ng
Route::get('/getStatusDH/{id}', [PaymentController::class, 'getStatus']);
//api check b???o h??nh
Route::get('/checkBaoHanh/{id}', [BaoHanhController::class, 'checkBaoHanh']);
//login ??? admin
Route::post('/loginAdmin', [ManageUserController::class, 'login']);
//admin
Route::middleware('auth:sanctum', 'role')->prefix('admin')->group(function () {
    Route::get('noti', function () {
        return 'tui l?? admin';
    });
    //get  user c?? quy???n l?? 2,3,4
    Route::get('manageUser', [ManageUserController::class, 'index']);
    //api th??ng tin t??i kho???n theo user id
    Route::get('manageUser/{user_id}', [ManageUserController::class, 'edit']);
    //api s???a t??i kho???n
    Route::put('manageUser/{user_id}', [ManageUserController::class, 'update']);
    //api x??a t??i kho???n
    Route::delete('manageUser/{user_id}', [ManageUserController::class, 'destroy']);

    //api qu???n l?? nh??n vi??n
    Route::resource('manageEmployee', ManageEmployeeController::class);
    //c???p t??i kho???n cho nh??n vi??n
    Route::post('manageEmployee/createUser/{id}', [ManageEmployeeController::class, 'createUser']);
    //api b??o c??o th???ng k??
    Route::get('baocao', [ManageBaoCaoController::class, 'thongKeDoanhThuThang']);
    //api t??nh s??? contact ch??a ?????c


    Route::put('reset-password/{user_id}', [ManageUserController::class, 'reset_password']);
});



//th??? kho
Route::middleware('auth:sanctum', 'role_thukho')->prefix('kho')->group(function () {
    //api th??m phi???u nh???p
    Route::post('addPN', [ManagePhieuNhapController::class, 'addPN']);
    //api c???p nh???t phi???u nh???p
    Route::put('updatePN/{pn_id}', [ManagePhieuNhapController::class, 'updatePN']);
    //api x??a chi ti???t phi???u nh???p
    Route::delete('deletePN/{pn_id}', [ManagePhieuNhapController::class, 'deletePN']);
    //api th??m chi ti???t phi???u nh???p
    Route::post('addCtPN/{id}', [ManagePhieuNhapController::class, 'addCtPN']);
    //api x??a chi ti???t phi???u nh???p
    Route::delete('deleteCtPN/{pn_id}/{product_id}', [ManagePhieuNhapController::class, 'deleteCtPN']);
    //api c???p nh???t chi ti???t phi???u nh???p
    Route::put('updateCtPN/{pn_id}/{product_id}', [ManagePhieuNhapController::class, 'updateCtPN']);
    //api c???p nh???t t???ng ti???n trong phi???u nh???p
    Route::put('updateTotal/{pn_id}', [ManagePhieuNhapController::class, 'setTongTien']);
    //api hi???n th??? all phi???u nh???p
    Route::get('getAllPN', [ManagePhieuNhapController::class, 'getAllPN']);
    //api hi???n th??? all phi???u nh???p theo th??? t??? m???i nh???t ?????n c?? nh???t
    Route::get('getAllPN-new', [ManagePhieuNhapController::class, 'getAllPN_new']);
    //api hi???n th??? chi ti???t phi???u nh???p v?? phi???u nh???p theo id phi???u nh???p
    Route::get('PN/{pn_id}', [ManagePhieuNhapController::class, 'editPN']);

    //api set t??nh tr???ng phi???u nh???p
    Route::put('setStatusPn/{pn_id}', [ManagePhieuNhapController::class, 'setStatusPN']);

    //api s???n ph???m s???p h???t h??ng < 10 s??? l?????ng
    Route::get('spGanHet', [ManageBaoCaoController::class, 'spGanHet']);
    //l???c phi???u nh???p theo gi??
    Route::get('loc-pn-cao-thap', [ManagePhieuNhapController::class, 'locGiaCaoThap']);
    Route::get('loc-pn-thap-cao', [ManagePhieuNhapController::class, 'locGiaThapCao']);

    //api l???ch s??? nh???p h??ng theo th???i gian
    Route::get('lichSuNhapHang', [ManageBaoCaoController::class, 'lichSuNhapHang']);
    //api l???ch s??? xu???t h??ng theo th???i gian
    Route::get('lichSuXuatHang', [ManageBaoCaoController::class, 'lichSuXuatHang']);

    //api th???ng k?? doanh thu v?? s??? l?????ng
    Route::get('thongKeChiTieuSoLuong', [ManageBaoCaoController::class, 'thongKeChiTieuSoLuong']);
    //Api Th???ng k?? c???a phi???u xu???t
    Route::get('thongKeDoanhThuSoLuong', [ManageBaoCaoController::class, 'thongKeDoanhThuSoLuong']);
    Route::put('setstatusDH/{id}', [ManagePhieuXuatController::class, 'setstatusDH']);

    //Api set status phi???u xu???t
    Route::put('setstatusPX/{id}', [ManagePhieuXuatController::class, 'setstatusPX']);
    //Api Qu???n l??  Phi???u Xu???t
    Route::get('dspx', [ManagePhieuXuatController::class, 'dspx_kho']); // Danh s??ch c??c phi???u xu???t ???? x??c nh???n d??ng ??? qu???n l?? kho
    Route::get('search_kho', [ManagePhieuXuatController::class, 'search_kho']); // T??m Ki???m Phi???u Xu???t d??ng ??? kho
    Route::resource('px', ManagePhieuXuatController::class);
    Route::get('px/ctpx/{id_px}', [ManagePhieuXuatController::class, 'xemctpx']);
    Route::get('locpx_kho', [ManagePhieuXuatController::class, 'locPx_kho']); // L???c Phi???u xu???t key v?? value
    //Api qu???n l?? ct phi???u xu???t
    Route::get('ctpx/{px_id}', [ManagePhieuXuatController::class, 'xemctpx']);
    Route::get('editctpx/{px_id}/{product_id}', [ManagePhieuXuatController::class, 'editctpx']);
    Route::put('updatectpx/{px_id}/{product_id}', [ManagePhieuXuatController::class, 'updatectpx']);  // update ct phi???u xu???t
    Route::post('addctpx', [ManagePhieuXuatController::class, 'addctpx']);          // Th??m ct phi???u xu???t
    Route::delete('deletectpx/{px_id}/{product_id}', [ManagePhieuXuatController::class, 'deletectpx']);  // Xo?? ct phi???u xu???t

    // Api qu???n l?? ncc , nsx
    Route::resource('ncc', ManageNccController::class);
    Route::resource('nsx', ManageNsxController::class);
    Route::get('nsxall', [ManageNsxController::class, 'nsxall']);
    Route::get('nccall', [ManageNccController::class, 'nccall']);


    //Api Qu???n l?? s???n ph???m
    Route::resource('products', ManageProductController::class);
    Route::get('products-search', [ManageProductController::class, 'search']); // T??m Ki???m s???n ph???m
    //Api qu???n l?? lo???i s???n ph???m
    Route::resource('loaisp', ManageLoaispController::class);
    // Chi ti???t s???n ph???m
    Route::get('products/chitiet/{id}', [ManageProductController::class, 'ctsp']);
    // C???p nh???t s???n ph???m
    Route::post('products/update/{id}', [ManageProductController::class, 'update']);
});

Route::get('nsx', [ManageNsxController::class, 'nsxall']);

//nh??n vi??n
Route::middleware('auth:sanctum', 'role_nhanvien')->prefix('nhanvien')->group(function () {

    //Api Qu???n l?? kh??ch h??ng
    Route::resource('customer', ManageCustomerController::class);

    //get  user c?? quy???n l?? 1
    Route::get('manageUser', [ManageUserController::class, 'index2']);
    //api th??ng tin t??i kho???n theo user id
    Route::get('manageUser/{user_id}', [ManageUserController::class, 'edit']);
    //api s???a t??i kho???n
    Route::put('manageUser/{user_id}', [ManageUserController::class, 'update_tk_kh']);
    //api x??a t??i kho???n
    Route::delete('manageUser/{user_id}', [ManageUserController::class, 'destroy_user_customer']);

    //api th???ng k?? doanh thu v?? s??? l?????ng c???a nh??n vi??n
    Route::get('doanhThuNhanVien', [ManageBaoCaoController::class, 'doanhThuNhanVien']);
    //api hi???n th??? danh s??ch c??c contact
    Route::get('/contact', [ContactContrller::class, 'index']);
    Route::put('/contact/{customer_id}', [ContactContrller::class, 'sendMail']);
    //discount
    Route::resource('discount', DiscountController::class);

    //Api set status ????n h??ng
    Route::put('setstatusDH/{id}', [ManagePhieuXuatController::class, 'setstatusDH']);
    //Api Qu???n l??  ????n H??ng (Phi???u xu???t)
    Route::get('locpx', [ManagePhieuXuatController::class, 'locPx']); // L???c Phi???u xu???t key v?? value
    Route::get('px-search', [ManagePhieuXuatController::class, 'search']); // T??m Ki???m Phi???u Xu???t
    Route::resource('px', ManagePhieuXuatController::class)->only('index');
    Route::get('editpx/{px_id}', [ManagePhieuXuatController::class, 'editpx']);

    //Api Qu???n l?? chi ti???t phi???u xu???t
    Route::get('lichSuXuatHang', [ManageBaoCaoController::class, 'lichSuXuatHang']);
    //Api Qu???n l?? s???n ph???m
    Route::resource('products', ManageProductController::class)->only('update');
});


// API Long
// API Kh??ch h??ng
Route::put('huyDH/{id}', [ManagePhieuXuatController::class, 'huyDH']); // Hu??? ????n h??ng
//Api s???n ph???m
Route::resource('products/view', ProductController::class)->only('index');
Route::get('products-search', [ManageProductController::class, 'search']); // D??ng cho trang ch??? th??i
Route::get('allcomment/{product_id}', [ProductController::class, 'allcomment']);
Route::post('addcomment', [ProductController::class, 'addcomment']);

//Api lo???i s???n ph???m
Route::resource('loaisp/view', LoaispController::class)->only('index');
Route::get('cate/product/{id}', [LoaispController::class, 'spcate']); // L???y s???n ph???m category
// Chi ti???t s???n ph???m
Route::get('products/chitiet/{id}', [ProductController::class, 'ctsp']);

//Api gi??? h??ng
Route::post('addtocart', [CartController::class, 'addtocart']);
Route::get('cart', [CartController::class, 'viewcart']);
Route::put('cart-updatequantity/{id_cart}/{scope}', [CartController::class, 'updatequantity']);
Route::delete('deletecart/{id_cart}', [CartController::class, 'deletecart']);

//Api Thanh To??n
Route::post('validate-order', [PaymentController::class, 'validateOrder']);
Route::post('dathang', [PaymentController::class, 'dathang']);
Route::post('pay', [PaymentController::class, 'vnpay']);
Route::post('momo', [PaymentController::class, 'momopay']);
Route::get('saveorder', [PaymentController::class, 'saveorder']); // api n??y front end kh??ng d??ng


//l???c s???n ph???m
Route::get('/sortProduct', [ProductController::class, 'sortProduct']);

Route::get('/giaMax', [ProductController::class, 'product_max']);

Route::get('/sort-chitiet', [ProductController::class, 'sort_chitiet']);


Route::get('/sort-chitiet-minmax', [ProductController::class, 'sort_chitiet_minmax']);

Route::get('/ds_discount_tontai', [DiscountController::class, 'ds_discount_tontai']);

// Route::resource('products/add', ProductController::class)->only('store');
// Route::delete('products/delete/{id}', [ProductController::class,'destroy']);
// Route::get('products/edit/{id}', [ProductController::class,'edit']);
// Route::put('products/update/{id}', [ProductController::class,'update']);
