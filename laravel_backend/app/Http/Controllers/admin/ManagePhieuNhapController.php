<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\CtPhieuNhap;
use Illuminate\Http\Request;
use App\Models\PhieuNhap;
use App\Models\Product;

class ManagePhieuNhapController extends Controller
{
    public function addPN (Request $request)
    {
        if(auth('sanctum')->check())
        {
            $pn = new PhieuNhap();
            $pn->employee_id = auth('sanctum')->user()->employee->id;
            $pn->status = $request->status;
            $pn->ncc_id = $request->ncc_id;
            $pn->save();
            return response()->json([
                'satus' => 200,
                'message' => 'Thêm phiếu nhập thành công',
                'pn' => $pn,
            ]);
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function addCtPN (Request $request,$id)
    {
        if(auth('sanctum')->check())
        {
            $ctpn = new CtPhieuNhap();
            $ctpn->product_id = $request->product_id;
            $ctpn->pn_id = $id;
            $ctpn->soluong = $request->soluong;
            $ctpn->gia = $request->gia;
            
            $product = Product::find( $ctpn->product_id);
            $product->soLuongSP = $product->soLuongSP +  $ctpn->soluong;
            $ctpn->save();
            $product->save();
            return response()->json([
                'satus' => 200,
                'message' => 'Thêm chi tiết phiếu nhập thành công',
                'pn' => $ctpn,
            ]);
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
}
