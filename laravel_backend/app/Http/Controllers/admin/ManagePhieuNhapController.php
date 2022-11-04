<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\CtPhieuNhap;
use Illuminate\Http\Request;
use App\Models\PhieuNhap;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;

class ManagePhieuNhapController extends Controller
{
    public function addPN(Request $request)
    {
        if (auth('sanctum')->check()) {
            $pn = new PhieuNhap();
            $pn->employee_id = auth('sanctum')->user()->employee->id;
            $pn->ncc_id = $request->ncc_id;
            $pn->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm phiếu nhập thành công',
                'pn' => $pn,
            ]);
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function addCtPN(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'soluong' => 'required|numeric',
            'gia' => 'required|numeric',
        ], [

            'soluong.required' => 'Ô số lượng không được bỏ trống',
            'soluong.numeric' => 'Ô số lượng phải là số',

            'gia.required' => 'Ô giá không được bỏ trống',
            'gia.numeric' => 'Ô giá phải là số',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
            ]);
        }

        if (auth('sanctum')->check()) {
            $ctpn_check = CtPhieuNhap::where('product_id', $request->product_id)
                ->where('pn_id', $id)
                ->first();
            if (!empty($ctpn_check)) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Đã có product_id bạn đã vừa nhập trong phiếu nhập vui lòng kiểm tra lại',
                ]);
            }
            $ctpn = new CtPhieuNhap();
            $ctpn->product_id = $request->product_id;
            $ctpn->pn_id = $id;
            $ctpn->soluong = $request->soluong;
            $ctpn->gia = $request->gia;



            $pn = PhieuNhap::find($ctpn->pn_id);
            $pn->tongTien += ($request->gia * $request->soluong);


            $product = Product::find($ctpn->product_id);
            $product->soLuongSP = $product->soLuongSP +  $ctpn->soluong;


            $pn->save();
            $ctpn->save();
            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm chi tiết phiếu nhập thành công',
                'ctpn' => $ctpn,
            ]);
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function deleteCtPN($pn_id, $product_id)
    {
        if (auth('sanctum')->check()) {

            $ctpn = CtPhieuNhap::where('pn_id', $pn_id)
                ->Where('product_id', $product_id)->first();

            if (empty($ctpn)) {
                return response()->json([
                    'status' => 404,
                ]);
            } else {
                $soluongcu = $ctpn->soluong;
                $giacu = $ctpn->gia;
                if ($ctpn->pn->status != 1) //chưa thanh toán
                {
                    $product = Product::find($product_id);
                    $product->soLuongSP = $product->soLuongSP - $ctpn->soluong;

                    $pn = PhieuNhap::find($ctpn->pn_id);
                    $pn->tongTien = $pn->tongTien - ($soluongcu * $giacu);
                    $pn->save();

                    $product->save();
                    $ctpn = CtPhieuNhap::where('pn_id', $pn_id)
                        ->Where('product_id', $product_id)->delete();


                    return response()->json([
                        'status' => 200,
                        'message' => 'Xóa chi tiết phiếu nhập thành công',
                    ]);
                } else //đã thanh toán
                {
                    return response()->json([

                        'message' => 'Phiếu nhập đã thanh toán không thể xóa',
                    ]);
                }
            }
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }

    public function updateCtPN(Request $request, $pn_id, $product_id)
    {
        $validator = Validator::make($request->all(), [
            'soluong' => 'required|numeric',
            'gia' => 'required|numeric',
        ], [

            'soluong.required' => 'Ô số lượng không được bỏ trống',
            'soluong.numeric' => 'Ô số lượng phải là số',

            'gia.required' => 'Ô giá không được bỏ trống',
            'gia.numeric' => 'Ô giá phải là số',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
            ]);
        }
        if (auth('sanctum')->check()) {

            $pn = PhieuNhap::find($pn_id);

            if (empty($pn)) {
                return response()->json([
                    'status' => 404,
                ]);
            } else {
                if ($pn->status != 1) //chưa thanh toán
                {

                    $soluong = $request->soluong;
                    $ctpn = CtPhieuNhap::where('pn_id', $pn_id)
                        ->Where('product_id', $product_id)->first();
                    $soluongcu = $ctpn->soluong;
                    $giacu = $ctpn->gia;
                    if ($product_id == $request->product_id) //sản phẩm giống
                    {

                        $soluongmoi = -$soluongcu + $soluong;

                        $product = Product::find($product_id);
                        $product->soLuongSP = $product->soLuongSP + $soluongmoi;
                        $pn->tongTien = $pn->tongTien - ($soluongcu * $giacu) + ($soluong * $request->gia);
                        $pn->save();
                        $product->save();
                    } else //sản phẩm khác
                    {
                        $product_old = Product::find($product_id);
                        $product_old->soLuongSP = $product_old->soLuongSP - $soluongcu;

                        $product_new = Product::find($request->product_id);
                        $product_new->soLuongSP = $product_new->soLuongSP + $request->soluong;

                        $pn->tongTien = $pn->tongTien - ($soluongcu * $giacu) + ($soluong * $request->gia);
                        $pn->save();

                        $product_new->save();
                        $product_old->save();
                    }

                    $ctpn = CtPhieuNhap::where('pn_id', $pn_id)
                        ->Where('product_id', $product_id)
                        ->update(['product_id' => $request->product_id, 'soluong' => $request->soluong, 'gia' =>  $request->gia]);



                    return response()->json([
                        'status' => 200,
                        'message' => 'Cập nhật chi tiết phiếu nhập thành công',
                    ]);
                } else //đã thanh toán
                {
                    return response()->json([

                        'message' => 'Phiếu nhập đã thanh toán không thể chỉnh sửa',
                    ]);
                }
            }
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }

    public function setTongTien($pn_id)
    {
        if (auth('sanctum')->check()) {

            $pncts = PhieuNhap::find($pn_id)->pnct;

            if (empty($pncts)) {
                return response()->json([
                    'status' => 404,
                ]);
            } else {
                $total = 0;
                foreach ($pncts as $pnct) {
                    $total += ($pnct->gia * $pnct->soluong);
                }
                $pn = PhieuNhap::find($pn_id);
                $pn->tongTien = $total;
                $pn->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'cập nhật tổng tiền thành công',
                    'total' => $total
                ]);
            }
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }

    public function updatePN(Request $request, $pn_id)
    {
        if (auth('sanctum')->check()) {

            $pn = PhieuNhap::find($pn_id);

            if (empty($pn)) {
                return response()->json([
                    'status' => 404,
                ]);
            } else {
                if ($pn->status == 1) {
                    return response()->json([
                        'message' => 'Phiếu nhập đã thanh toán không thể chỉnh sửa',
                    ]);
                } else {
                    $pn->ncc_id = $request->ncc_id;
                    $pn->status = $request->status;
                    $pn->employee_id = auth('sanctum')->user()->employee->id;
                    $pn->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'cập nhật phiếu nhập thành công',
                    ]);
                }
            }
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }

    public function deletePN(Request $request, $pn_id)
    {
        if (auth('sanctum')->check()) {

            $pn = PhieuNhap::find($pn_id);

            if (empty($pn)) {
                return response()->json([
                    'status' => 404,
                ]);
            } else {
                if ($pn->status == 1) {
                    return response()->json([
                        'message' => 'Phiếu nhập đã thanh toán không thể chỉnh sửa',
                    ]);
                } else {
                    $pncts = $pn->pnct;
                    foreach ($pncts as $pnct) {
                        $product = Product::find($pnct->product_id);
                        $product->soLuongSP = $product->soLuongSP - $pnct->soluong;
                        $product->save();
                        $ctpn_tmp = CtPhieuNhap::where('pn_id', $pn_id)
                            ->Where('product_id', $pnct->product_id)->delete();
                    }
                    $pn->delete();
                    return response()->json([
                        'status' => 200,
                        'message' => 'xóa phiếu nhập thành công',
                    ]);
                }
            }
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function editPN($pn_id)
    {
        $pn = PhieuNhap::find($pn_id);
        if (empty($pn)) {
            return response()->json([
                'status' => 404,
            ]);
        } else {
            $cptns = $pn->pnct;
            foreach($cptns as $ctpn)
            {
                $products= $ctpn->product;
            }
            return response()->json([
                'status' => 200,
                'pn' => $pn,
                'cptns' => $cptns,
                'products' => $products,
            ]);
        }
    }
    public function getAllPN()
    {
        $pn = PhieuNhap::paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }
    public function getAllPN_new()
    {
        $pn = PhieuNhap::orderBy('id', 'desc')->paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }
    public function locGiaCaoThap()
    {
        $pn = PhieuNhap::orderBy('tongTien', 'desc')->paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }
    public function locGiaThapCao()
    {
        $pn = PhieuNhap::orderBy('tongTien', 'asc')->paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }

    public function searchPn(Request $request)
    {
        $pn = PhieuNhap::where('id', 'like', '%' . $request->key . '%')
            ->orWhere('employee_id', 'like', '%' . $request->key . '%')
            ->orWhere('ncc_id', 'like', '%' . $request->key . '%')
            ->get();
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }
}
