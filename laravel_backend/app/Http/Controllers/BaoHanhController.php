<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\PhieuXuat;
use App\Models\CtPhieuXuat;

class BaoHanhController extends Controller
{
    public function checkBaoHanh($id)
    {
    
        if(auth('sanctum')->check())
        {
            $idkh = auth('sanctum')->user()->customer->id;
            $pxs  = PhieuXuat::where('customer_id',$idkh)->get();
            if(!empty($pxs))
            {
                $kq = array();
                foreach($pxs as $px)
                {
                    $ctpxs = PhieuXuat::find($px->id)->pxct;
                
                    foreach($ctpxs as $ctpx)
                    {
                        $tmp = $ctpx->product_id;
                        if($tmp == $id)
                        {
                            $product  = Product::find($tmp);
                            $timeBH = $product->baoHanh;
                            $start_BH = date_format($px->created_at,"d-m-Y") ;
                            $date_start=date_create($start_BH);
                            date_modify($date_start, $timeBH. " months"); // thay đổi ngày bằng phép cộng
                            $date =  date_format($date_start,"d-m-Y");
                            $today = date("Y-m-d");
                            $kq['px']['tenSP'] = $product->tenSP;
                            $kq['px']['time'] = $timeBH;
                            $kq['px']['ngayMua'] = $start_BH;
                            $kq['px']['ngayEnd'] = $date;
                           // $end_date = strtotime(date('Y-m-d',$date));
                            if (strtotime($today) >strtotime($date_start) ) {
                                $kq['px']['status'] = 'Hết bảo hành';
                                } else {
                                    $kq['px']['status'] = "Còn bảo hành";
                                }
                        }
                        
                        
                    }
                    
                    
                }
                return response()->json([
                    'status' => 200,
                    'kq' => $kq,
                ]);
            }
            else
            {
                return response()->json([
                    'status' => 404,
                    'message' =>'Không có mã hóa đơn bạn vừa nhập',
                ]);
            }
            
           
        }
        else
        {
            return response()->json([
                'status' => 400,
                'message' => 'Chưa đăng nhập',
            ]);
        }

    }
}
