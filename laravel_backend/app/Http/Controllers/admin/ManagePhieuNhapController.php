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
                'status' => 200,
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
                'status' => 200,
                'message' => 'Thêm chi tiết phiếu nhập thành công',
                'ctpn' => $ctpn,
            ]);
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function deleteCtPN ($pn_id, $product_id)
    {
        if(auth('sanctum')->check())
        {
            
            $ctpn = CtPhieuNhap::where('pn_id',$pn_id)
                            ->Where('pn_id',$product_id)->first();
           
            if(empty($ctpn))
            {
                return response()->json([
                    'status' => 404,
                ]);
            }
            else
            {
                if($ctpn->pn->status != 1) //chưa thanh toán
                {
                    $product = Product::find($product_id);
                    $product->soLuongSP = $product->soLuongSP - $ctpn->soluong;
                    $product->save();
                    $ctpn= CtPhieuNhap::where('pn_id',$pn_id)
                    ->Where('product_id',$product_id)->delete();
                    
                    
                    return response()->json([
                        'status' => 200,
                        'message' => 'Xóa chi tiết phiếu nhập thành công',
                    ]);
                }
                else //đã thanh toán
                {
                    return response()->json([

                        'message' => 'Phiếu nhập đã thanh toán không thể xóa',
                    ]);
                }
            }
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }

    public function updateCtPN (Request $request,$pn_id, $product_id)
    {
        if(auth('sanctum')->check())
        {
            
            $pn = PhieuNhap::find($pn_id);
           
            if(empty($pn))
            {
                return response()->json([
                    'status' => 404,
                ]);
            }
            else
            {
                if($pn->status != 1) //chưa thanh toán
                {
                    
                    $soluong = $request->soluong;
                    $ctpn = CtPhieuNhap::where('pn_id',$pn_id)
                    ->Where('product_id',$product_id)->first();
                    $soluongcu = $ctpn->soluong;
                    if($product_id == $request->product_id) //sản phẩm giống
                    {
                        
                        $soluongmoi = -$soluongcu + $soluong;

                        $product = Product::find($product_id);
                        $product->soLuongSP = $product->soLuongSP + $soluongmoi;
                        $product->save();

                        
                    }
                    else //sản phẩm khác
                    {
                        $product_old = Product::find($product_id);
                        $product_old->soLuongSP = $product_old->soLuongSP - $soluongcu;
                        
                        $product_new = Product::find($request->product_id);
                        $product_new->soLuongSP = $product_new->soLuongSP + $request->soluong;
                        $product_new->save();
                        $product_old->save();

                    }
                    
                    $ctpn = CtPhieuNhap::where('pn_id',$pn_id)
                        ->Where('product_id',$product_id)
                        ->update(['product_id' => $request->product_id,'soluong' => $request->soluong,'gia' =>  $request->gia]);
                   
                    
                        
                    return response()->json([
                        'status' => 200,
                        'message' => 'Cập nhật chi tiết phiếu nhập thành công',
                    ]);
                }
                else //đã thanh toán
                {
                    return response()->json([

                        'message' => 'Phiếu nhập đã thanh toán không thể chỉnh sửa',
                    ]);
                }
            }
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
}
