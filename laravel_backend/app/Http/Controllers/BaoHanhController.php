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
                        $kq['px'.$px->id]['tenSP'] = $product->tenSP;
                        $kq['px'.$px->id]['time'] = $timeBH;
                        $kq['px'.$px->id]['ngayMua'] = $start_BH;
                        $kq['px'.$px->id]['ngayEnd'] = $date;
                    }
                    
                    
                }
                
                
            }
            return response()->json(

                $kq
            );
           
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }

    }
}
