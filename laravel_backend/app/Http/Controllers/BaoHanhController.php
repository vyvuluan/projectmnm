<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\PhieuXuat;
use App\Models\CtPhieuXuat;
use Carbon\Carbon;

class BaoHanhController extends Controller
{
    public function checkBaoHanh($id)
    {

        if (auth('sanctum')->check()) {
            $idkh = auth('sanctum')->user()->customer->id;
            $pxs  = PhieuXuat::where('customer_id', $idkh)->get();
            $dem = 0;
            $kq = array();
            foreach ($pxs as $px) {
                $ctpxs = PhieuXuat::find($px->id)->pxct;
                foreach ($ctpxs as $ctpx) {
                    $tmp = $ctpx->product_id;
                    if ($tmp == $id) {
                        $dem++;
                        $product  = Product::find($tmp);
                        $timeBH = $product->baoHanh;
                        $start_BH = date_format($px->created_at, "d-m-Y");
                        $date_start = date_create($start_BH);
                        date_modify($date_start, $timeBH . " months"); // thay đổi ngày bằng phép cộng
                        $date =  date_format($date_start, "d-m-Y");
                        $today = date("Y-m-d");
                        $end_date = Carbon::createFromFormat('d-m-Y', $date)->format('Y-m-d');
                        if (strtotime($today) > strtotime($end_date)) {
                            $kq[] = [
                                'tenSP' => $product->tenSP,
                                'timeBH' => $timeBH,
                                'ngayMua' => $start_BH,
                                'ngayEnd' =>$date,
                                'status' => 'Hết bảo hành',
                            ];
                        } else {
                            $kq[] = [
                                'tenSP' => $product->tenSP,
                                'timeBH' => $timeBH,
                                'ngayMua' => $start_BH,
                                'ngayEnd' =>$date,
                                'status' => 'Còn bảo hành',
                            ];
                        }
                    }
                }
            }


            if ($dem == 0) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không có mã sản phẩm bạn vừa nhập',
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'kq' => $kq,
                ]);
            }
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
}
