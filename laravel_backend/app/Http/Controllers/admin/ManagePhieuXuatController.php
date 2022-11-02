<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PhieuXuat;
use App\Models\Product;
use Validator;
use Illuminate\Support\Facades\DB;

class ManagePhieuXuatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $px = PhieuXuat::orderBy('id', 'asc')->paginate(10);
        return response()->json([
            'data' => $px,
        ]);
    }
    public function xemctpx($id)
    {
        $ctpx = PhieuXuat::find($id)->pxct;
        return response()->json([
            'status' => 200,
            'data' => $ctpx,
        ]);
    }
    public function editpx($id)
    {
        $px = PhieuXuat::find($id);
        if ($px) {
            return response()->json([
                'status' => 200,
                'loaisp' => $px,
            ]);
        }
    }
    public function editctpx($mapx, $masp)
    {
        $pxct = PhieuXuat::find($mapx)->pxct;
        $data =  $pxct->where('product_id', $masp);
        if ($data) {
            return response()->json([
                'status' => 200,
                'loaisp' => $data,
            ]);
        }
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
        $validator = Validator::make($request->all(), [
            'employee_id' => 'numeric',
            'status' => 'numeric|max:10',
            'pt_ThanhToan' => 'required',
            'diaChi' => 'required',
            'tenKH' => 'required',
            'sdt' => 'required|numeric|digits:10',
        ], [
            'tenKH.required' => 'Ô tên khách hàng Không được bỏ trống',
            'sdt.required' => 'Ô số điện thoại không được bỏ trống',
            'sdt.numeric' => 'Ô số điện thoại phải có định dạng là số ',
            'sdt.digits' => 'Ô số điện thoại phải là 10 số',
            'diaChi.required' => 'Ô Địa chỉ không được bỏ trống',
            'pt_ThanhToan.required' => 'Ô Pt Thanh toán không được bỏ trống',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $px = new PhieuXuat();
            $px->employee_id = $request->tenLoai;
            $px->status = 0;
            $px->pt_ThanhToan = $request->pt_ThanhToan;
            $px->diaChi = $request->diaChi;
            $px->tenKH = $request->tenKH;
            $px->sdt = $request->sdt;
            $px->save();
            return response()->json([
                'status' => 200,
                'message' => 'Tạo phiếu xuất thành công',
                'px_id' => $px->id,
            ]);
        }
    }
    public function addctpx(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'px_id' => 'required|numeric',
            'product_id' => 'required|numeric',
            'soluong' => 'required|numeric',
        ], [
            'product_id.required' => 'Bạn chưa chọn sản phẩm',
            'soluong.required' => 'Ô số lượng không được bỏ trống',
            'product_id.numeric' => 'Mã sản phẩm nhận được không đúng',
            'soluong.numeric' => 'Ô số lượng phải có định dạng là số ',
            'px_id.numeric' => 'Mã phiếu xuất nhận được không đúng',
            'px_id.required' => 'Chưa chọn phiếu xuất',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $checkpx = PhieuXuat::find($request->px_id);
            if ($checkpx) {
                $checksp = Product::find($request->product_id);
                if ($checksp) {
                    if ($request->soluong > $checksp->soLuongSP) {
                        return response()->json([
                            'status' => 402,
                            'message' => 'Kho không đủ hàng !',
                        ]);
                    }
                    $pxcts = PhieuXuat::find($request->px_id)->pxct;
                    foreach ($pxcts as $pxct) {
                        if ($pxct->product_id == $request->product_id) {
                            return response()->json([
                                'status' => 403,
                                'message' => 'Sản phẩm đã tồn tại trong phiếu xuất',
                            ]);
                        }
                    }
                    $checksp->soLuongSP -= $request->soluong;
                    $checksp->save();
                    $checkpx->tongTien += ($checksp->gia) * $request->soluong;
                    $checkpx->save();
                    DB::insert('insert into ct_phieu_xuats (px_id ,product_id,soluong,gia)
                                values (' . $request->px_id . ',' . $request->product_id . ',' . $request->soluong . ',' . $checksp->gia . ')');



                    return response()->json([
                        'status' => 200,
                        'message' => 'thêm chi tiết thành công',
                    ]);
                } else {
                    return response()->json([
                        'status' => 402,
                        'message' => 'không tìm thấy sản phẩm',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Không tìm thấy phiếu xuất',
                ]);
            }
        }
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
        $validator = Validator::make($request->all(), [
            'employee_id' => 'numeric',
            'customer_id' => 'numeric',
            'status' => 'numeric',
            'pt_ThanhToan' => 'required',
            'diaChi' => 'required',
            'tenKH' => 'required',
            'sdt' => 'required|numeric|digits:10',
            'tongTien' => 'required|numeric'
        ], [
            'tenKH.required' => 'Ô tên khách hàng Không được bỏ trống',
            'sdt.required' => 'Ô số điện thoại không được bỏ trống',
            'sdt.numeric' => 'Ô số điện thoại phải có định dạng là số ',
            'sdt.digits' => 'Ô số điện thoại phải là 10 số',
            'diaChi.required' => 'Ô Địa chỉ không được bỏ trống',
            'pt_ThanhToan.required' => 'Ô Pt Thanh toán không được bỏ trống',
            'status.numeric' => 'Ô status phải có định dạng là số ',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $px = PhieuXuat::find($id);
            if ($px) {
                $px->employee_id = $request->employee_id;
                $px->customer_id = $request->customer_id;
                $px->status = $request->status;
                $px->pt_ThanhToan = $request->pt_ThanhToan;
                $px->diaChi = $request->diaChi;
                $px->tenKH = $request->tenKH;
                $px->sdt = $request->sdt;
                $px->tongTien = $request->tongTien;
                $px->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật phiếu thành công ',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy phiếu xuất',
                ]);
            }
        }
    }
    public function checksl($slgio, $slupdate, $slkho)
    {
        $temp = $slgio - $slupdate;
        if ($temp + $slkho > 0) {
            return true;
        } else {
            return false;
        }
    }
    public function updatectpx(Request $request, $mapx, $maspct)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|numeric',
            'soluong' => 'required|numeric',
        ], [
            'product_id.required' => 'Bạn chưa chọn sản phẩm',
            'soluong.required' => 'Ô số lượng không được bỏ trống',
            'product_id.numeric' => 'Mã sản phẩm nhận được không đúng',
            'soluong.numeric' => 'Ô số lượng phải có định dạng là số ',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $px = PhieuXuat::find($mapx);
            $pxcts = $px->pxct;
            $data =  $pxcts->where('product_id', $maspct)->first();
            if ($data) {
                $checksp = Product::find($request->product_id);
                if ($checksp) {
                    if ($checksp->id == $maspct) {

                        $slgio = $data->soluong;
                        $slupdate = $request->soluong;
                        $slkho = $checksp->soLuongSP;
                        if ($this->checksl($slgio, $slupdate, $slkho)) {
                            //$data->px_id=$mapx;
                            $data->product_id = $checksp->id;
                            $data->soluong = $slupdate;
                            $data->gia = $checksp->gia;
                            $px->tongTien += ($slupdate * $checksp->gia) - ($slgio * $checksp->gia);
                            $px->save();
                            $checksp->soLuongSP = ($slgio - $slupdate) + $slkho;
                            $checksp->save();
                            DB::table('ct_phieu_xuats')->where('px_id', $mapx)->where('product_id', $maspct)
                                ->update(['product_id' => $checksp->id, 'soluong' => $slupdate, 'gia' =>  $checksp->gia]);
                            return response()->json([
                                'status' => 200,
                                'message' => 'Cập nhật Chi tiết phiếu Xuất thành công ',
                            ]);
                        } else {
                            return response()->json([
                                'status' => 402,
                                'message' => 'Kho không còn đủ hàng',
                            ]);
                        }
                    } else {
                        foreach ($pxcts as $pxct) {
                            if ($pxct->product_id == $request->product_id) {
                                return response()->json([
                                    'status' => 403,
                                    'message' => 'Sản phẩm đã tồn tại trong giỏ hàng',
                                ]);
                            }
                        }
                        $slgio = $data->soluong;
                        $slupdate = $request->soluong;
                        $slkho = $checksp->soLuongSP;
                        if ($slkho > $slupdate) {
                            // $data->product_id = $checksp->product_id;
                            $spgio = Product::find($maspct);
                            $spgio->soLuongSP += $slgio;
                            $spgio->save();
                            $checksp->soLuongSP -= $slupdate;
                            $checksp->save();
                            $px->tongTien += ($slupdate * $checksp->gia) - ($slgio * $checksp->gia);
                            $px->save();
                            DB::table('ct_phieu_xuats')->where('px_id', $mapx)->where('product_id', $maspct)
                                ->update(['product_id' => $checksp->id, 'soluong' => $slupdate, 'gia' =>  $checksp->gia]);
                            return response()->json([
                                'status' => 200,
                                'message' => 'Cập nhật Chi tiết phiếu Xuất thành công ',
                            ]);
                        } else {
                            return response()->json([
                                'status' => 402,
                                'message' => 'Kho không còn đủ hàng',
                            ]);
                        }
                    }
                } else {
                    return response()->json([
                        'status' => 401,
                        'message' => ' Sản phẩm muốn cập nhật không tồn tại',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy Chi tiết phiếu xuất',
                ]);
            }
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $px = PhieuXuat::find($id);
        if ($px->status == 1) {
            return response()->json([
                'status' => 400,
                'message' => 'Đơn hàng đã được thanh toán nên không thể xoá',
            ]);
        } else {
            $pxcts = PhieuXuat::find($id)->pxct;
            if ($pxcts) {
                foreach ($pxcts as $pxct) {
                    $sp = Product::find($pxct->product_id);
                    if ($sp) {
                        $sp->soLuongSP += $pxct->soluong;
                        $sp->save();
                    }
                }
                $px->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Xoá thành công',
                ]);
            }
        }
    }
    public function deletectpx($px_id, $product_id)
    {
        $mapx = $px_id;
        $maspct = $product_id;
        $px = PhieuXuat::find($mapx);
        $pxcts = $px->pxct;
        $data =  $pxcts->where('product_id', $maspct)->first();
        $spkho = Product::find($maspct);
        $spkho->soLuongSP += $data->soluong;
        $px->tongTien -= $data->soluong * $spkho->gia;
        $px->save();
        $spkho->save();
        DB::table('ct_phieu_xuats')->where('px_id', $mapx)->where('product_id', $maspct)
            ->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Xoá chi tiết px thành công',
        ]);
    }
}
