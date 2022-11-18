<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Faker\Provider\ar_EG\Payment;
use Illuminate\Http\Request;
use App\Models\PhieuXuat;
use App\Models\Discount;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Validator;
use Carbon\Carbon;
use PHPUnit\Framework\Constraint\Count;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function dathang(Request $request)
    {
        if (auth('sanctum')->check()) {
            $maKH = auth('sanctum')->user()->customer->id;
            if ($request->payment_id != null) {
                $stus = 1;
            } else {
                $stus = 0;
            }
            // $maKH=$request->maKH;
            $payment = new PhieuXuat;
            $payment->customer_id = $maKH;
            $payment->status = $stus;
            $payment->pt_ThanhToan = $request->payment_mode;
            $payment->tenKH = $request->tenKH;
            $payment->sdt = $request->sdt;
            $payment->diaChi = $request->diaChi;
            $payment->payment_id = $request->payment_id;
            $tongTien = 0;

            $cart = Cart::where('maKH', $maKH)->get();
            $pxChiTiet = [];
            foreach ($cart as $item) {
                $pxChiTiet[] = [

                    'product_id' => $item->maSP,
                    'soluong' => $item->soLuongSP,
                    'gia' => $item->product->gia,
                ];
                $item->product->update([
                    'soLuongSP' => $item->product->soLuongSP - $item->soLuongSP
                ]);
                $tongTien += ($item->soLuongSP) * ($item->product->gia);
            }
            $payment->tongTien = $tongTien;
            if (isset($request->discount)) {
                $date = Carbon::today();
                $discount = Discount::where('discount_id', $request->discount)
                    ->where('start', '<', $date)
                    ->where('end', '>', $date)
                    ->first();
                if (!empty($discount)) {
                    if ($discount->dieukien <= $tongTien) {
                        $payment->discount = $discount->phantram;
                        $payment->tongTien = $payment->tongTien * (100 * 1.0 - $discount->phantram) / 100;
                    } else {
                        return response()->json([
                            'status' => 400,
                            'message' => 'Đơn hàng cần tối thiểu ' . $discount->dieukien . ' để áp dụng',
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Không có mã giảm giá bạn vừa nhập',
                    ]);
                }
            }


            $payment->save();
            $payment->pxct()->createMany($pxChiTiet);
            Cart::destroy($cart);
            return response()->json([
                'status' => 200,
                'message' => 'Đặt hàng thành công',
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thanh toán',
            ]);
        }
    }
    public function validateOrder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'tenKH' => 'required|max:191',
                'sdt' => 'required|numeric|digits:10',
                'diaChi' => 'required|max:191',

            ], [
                'tenKH.required' => 'Ô email Không được bỏ trống',
                'sdt.required' => 'Ô số điện thoại không được bỏ trống',
                'sdt.numeric' => 'Ô số điện thoại phải có định dạng là số ',
                'sdt.digits' => 'Ô số điện thoại phải là 10 số',
                'diaChi.required' => 'Ô Địa chỉ không được bỏ trống',

            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'errors' => $validator->messages(),
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Form Validated Successfully',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue',
            ]);
        }
    }













    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }
    public function momopay(Request $request)
    {
        //return $_POST;
        $orderId = time() . "";
        if (auth('sanctum')->check()) {
            $maKH = auth('sanctum')->user()->customer->id;
            // $maKH=$request->maKH;
            $payment = new PhieuXuat;
            $payment->customer_id = $maKH;
            $payment->status = 0;
            $payment->pt_ThanhToan = $request->payment_mode;
            $payment->tenKH = $request->tenKH;
            $payment->sdt = $request->sdt;
            $payment->diaChi = $request->diaChi;
            $payment->payment_id = $orderId;
            $tongTien = 0;

            $cart = Cart::where('maKH', $maKH)->get();
            $pxChiTiet = [];
            foreach ($cart as $item) {
                $pxChiTiet[] = [

                    'product_id' => $item->maSP,
                    'soluong' => $item->soLuongSP,
                    'gia' => $item->product->gia,
                ];
                $item->product->update([
                    'soLuongSP' => $item->product->soLuongSP - $item->soLuongSP
                ]);
                $tongTien += ($item->soLuongSP) * ($item->product->gia);
            }
            $payment->tongTien = $tongTien;


            $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";
            $partnerCode = 'MOMOBKUN20180529';
            $accessKey = 'klm05TvNBzhg7h7j';
            $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
            $orderInfo = "Thanh toán qua MoMo";
            $amount = $tongTien;
            //$amount = 100000;

            $redirectUrl = "http://localhost:3000/paymentreturn";
            $ipnUrl = "http://localhost:8000/api/dathang";
            $extraData = "";
            // $extraData = $_POST["extraData"];
            $requestId = time() . "";
            $requestType = "payWithATM";
            // $extraData = ($_POST["extraData"] ? $_POST["extraData"] : "");
            //before sign HMAC SHA256 signature
            $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
            $signature = hash_hmac("sha256", $rawHash, $secretKey);
            $data = array(
                'partnerCode' => $partnerCode,
                'partnerName' => "Test",
                "storeId" => "MomoTestStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $redirectUrl,
                'ipnUrl' => $ipnUrl,
                'lang' => 'vi',
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature
            );

            $result = $this->execPostRequest($endpoint, json_encode($data));
            $jsonResult = json_decode($result, true);  // decode json // xác nhận thành công
            // Lưu vào database
            $payment->save();
            $payment->pxct()->createMany($pxChiTiet);
            Cart::destroy($cart);
            return redirect()->to($jsonResult['payUrl']);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thanh toán',
            ]);
        }

        //Just a example, please check more in there

        // header('Location: ' . $jsonResult['payUrl']);

    }
    public function vnpay(Request $request)
    {
        $code = rand(00, 9999);
        if (auth('sanctum')->check()) {
            $maKH = auth('sanctum')->user()->customer->id;
            // $maKH=$request->maKH;
            $payment = new PhieuXuat;
            $payment->customer_id = $maKH;
            $payment->status = 0;
            $payment->pt_ThanhToan = $request->payment_mode;
            $payment->tenKH = $request->tenKH;
            $payment->sdt = $request->sdt;
            $payment->diaChi = $request->diaChi;
            $payment->payment_id = $code;
            $tongTien = 0;

            $cart = Cart::where('maKH', $maKH)->get();
            $pxChiTiet = [];
            foreach ($cart as $item) {
                $pxChiTiet[] = [

                    'product_id' => $item->maSP,
                    'soluong' => $item->soLuongSP,
                    'gia' => $item->product->gia,
                ];
                $item->product->update([
                    'soLuongSP' => $item->product->soLuongSP - $item->soLuongSP
                ]);
                $tongTien += ($item->soLuongSP) * ($item->product->gia);
            }
            $payment->tongTien = $tongTien;
            $payment->save();
            $payment->pxct()->createMany($pxChiTiet);
            Cart::destroy($cart);



            date_default_timezone_set('Asia/Ho_Chi_Minh');
            /*
         * To change this license header, choose License Headers in Project Properties.
         * To change this template file, choose Tools | Templates
         * and open the template in the editor.
         */

            $vnp_TmnCode = "NKRQ52E0"; //Website ID in VNPAY System
            $vnp_HashSecret = "VATQXAPFIHFDXEHICPTLXBTTUHCSNUIL"; //Secret key
            $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            // $vnp_Returnurl = "http://localhost/vnpay_php/vnpay_return.php";
            $vnp_Returnurl = "http://localhost:8000/api/saveorder";
            $vnp_apiUrl = "http://sandbox.vnpayment.vn/merchant_webapi/merchant.html";
            //Config input format
            //Expire
            $startTime = date("YmdHis");
            $expire = date('YmdHis', strtotime('+15 minutes', strtotime($startTime)));



            $vnp_TxnRef = $code; //Mã đơn hàng. Trong thực tế Merchant cần insert đơn hàng vào DB và gửi mã này sang VNPAY
            $vnp_OrderInfo = 'Noi dung thanh toan';
            $vnp_OrderType = 'other';
            $vnp_Amount = $tongTien * 100;
            $vnp_Locale = 'vn';
            $vnp_BankCode = 'NCB';
            $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

            $inputData = array(
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => $vnp_TmnCode,
                "vnp_Amount" => $vnp_Amount,
                "vnp_Command" => "pay",
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CurrCode" => "VND",
                "vnp_IpAddr" => $vnp_IpAddr,
                "vnp_Locale" => $vnp_Locale,
                "vnp_OrderInfo" => $vnp_OrderInfo,
                "vnp_OrderType" => $vnp_OrderType,
                "vnp_ReturnUrl" => $vnp_Returnurl,
                "vnp_TxnRef" => $vnp_TxnRef,
            );

            if (isset($vnp_BankCode) && $vnp_BankCode != "") {
                $inputData['vnp_BankCode'] = $vnp_BankCode;
            }
            if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
                $inputData['vnp_Bill_State'] = $vnp_Bill_State;
            }

            //var_dump($inputData);
            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }
            $returnData = array(
                'code' => '00', 'message' => 'success', 'data' => $vnp_Url
            );
            if (isset($_POST['redirect'])) {
                header('Location: ' . $vnp_Url);
                die();
            } else {
                echo json_encode($returnData);
            }
            // vui lòng tham khảo thêm tại code demo
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thanh toán',
            ]);
        }
    }
    public function saveorder(Request $request)
    {

        $vnp_HashSecret = "VATQXAPFIHFDXEHICPTLXBTTUHCSNUIL";
        $data = $request->all();
        foreach ($data as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }
        //dd($inputData);


        $vnp_SecureHash = $inputData['vnp_SecureHash'];
        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);
        $vnpTranId = $inputData['vnp_TransactionNo']; //Mã giao dịch tại VNPAY
        $vnp_BankCode = $inputData['vnp_BankCode']; //Ngân hàng thanh toán
        $vnp_Amount = $inputData['vnp_Amount']; // Số tiền thanh toán VNPAY phản hồi

        $Status = 0; // Là trạng thái thanh toán của giao dịch chưa có IPN lưu tại hệ thống của merchant chiều khởi tạo URL thanh toán.
        $orderId = $inputData['vnp_TxnRef'];
        $Status =  $inputData['vnp_ResponseCode'];


        if ($Status = '00' && $secureHash == $vnp_SecureHash) {
            $px =  DB::table('phieu_xuats')->where('payment_id', $orderId)->update(['status' => '1']);
            return Redirect::to('http://localhost:3000/paymentreturn?status=200&orderId=' . $orderId . '&Amount=' . $vnp_Amount . '&pt=VnPay')->with('data', 'test');
        }
        // }
        // else
        // {
        //     return response()->json([
        //         'status'=>401,
        //         'message'=>'Đăng nhập để thanh toán',
        //         ]);
        // }




        //return redirect('localhost:3000')->with('message', $datapay);
        //return response($get);

        // if(empty($get))
        // {
        //     $ngayMua=getdate();
        //     $datapay = [
        //         'status' => 'Hoàn Thành',
        //         'customer_id' => '113',
        //         'employee_id' => '',

        //     ];
        //     PhieuXuat::insert($datapay);
        // }
        // else
        // {
        //             foreach( $get as $key => $value )
        //             {

        //                 $arr[]= get_object_vars($value);
        //                 $return = $arr[$key];
        //                 $id = $return['OrderId'];
        //                 if( $id == $orderId)
        //                 {
        //                     $orderId++;

        //                 }
        //             }

        //                 $datapay = [
        //                     'id'=> $orderId,
        //                     'status' => 'Hoàn Thành',
        //                     'customer_id' => '113',
        //                     'employee_id' => '',
        //                 ];
        //                 PhieuXuat::insert($datapay);
        //                 //return response($orderId);



        // }

    }

    public function getStatus($id)
    {
        $px = PhieuXuat::find($id);
        // $ctpx = PhieuXuat::find($id)->pxct;
        return response()->json([
            'id' => $px->id,
            'tinhTrang' => $px->status,
            'donHang' => $px,
            // 'ctpx' => $ctpx,
        ]);
    }
    public function getDH_maKH()
    {

        $px = PhieuXuat::where('customer_id', auth('sanctum')->user()->customer->id)->orderBy('id', 'desc')->paginate(5);
        // $ctpx = PhieuXuat::find($id)->pxct;
        return response()->json([
            'donHang' => $px,
            // 'ctpx' => $ctpx,
        ]);
    }




    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
