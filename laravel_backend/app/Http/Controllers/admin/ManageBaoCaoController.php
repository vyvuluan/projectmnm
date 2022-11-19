<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\CtPhieuNhap;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\PhieuXuat;
use App\Models\CtPhieuXuat;
use App\Models\Loaisp;
use App\Models\Product;
use App\Models\PhieuNhap;
use App\Models\Contact;

class ManageBaoCaoController extends Controller
{
    public function thongKeDoanhThuThang()
    {
        $timeNow = Carbon::now();
        $arrayTime = array();
        $total_px = array();
        $total_pn = array();
        for ($i = 1; $i <= 12; $i++) {
            if ($i == 1) {
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_px[$stringMY] =  PhieuXuat::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 4)
                    ->first();

                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 1)
                    ->first();
            } else {
                $timeNow = $timeNow->subMonth();
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_px[$stringMY] =  PhieuXuat::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 4)
                    ->first();
                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 1)
                    ->first();
            }
        }


        $ctpxs = CtPhieuXuat::selectRaw('sum(soluong) as soluong,  maLoai')
            ->join('products', 'ct_phieu_xuats.product_id', '=', 'products.id')
            ->join('phieu_xuats', 'ct_phieu_xuats.px_id', '=', 'phieu_xuats.id')
            ->where('phieu_xuats.status', 4)
            ->groupBy('maLoai')
            ->get();
        $tongPhanTram = 0;
        foreach ($ctpxs as $ctpx) {
            $tongPhanTram += $ctpx->soluong;
        }
        $phanTramLoai = array();

        foreach ($ctpxs as $ctpx) {
            $phanTramLoai[Loaisp::find($ctpx->maLoai)->tenLoai] = ($ctpx->soluong * 100) / $tongPhanTram;
        }

        $doanhthu = PhieuXuat::selectRaw('sum(tongTien) as tongTien')->where('status', 4)
            ->first();

        $chitieu = PhieuNhap::selectRaw('sum(tongTien) as tongTien')->where('status', 1)
            ->first();


        $contact_count = Contact::where('status', 0)->count();

        $soluongban = PhieuXuat::selectRaw('count(id) as soluongban')->first();
        return response()->json([
            'status' => 200,
            'total_px' => $total_px,
            'total_pn' => $total_pn,
            'loai' => $phanTramLoai,
            'doanhthu' => $doanhthu,
            'chitieu' => $chitieu,
            'contact_count' => $contact_count,
            'soluongban' => $soluongban
        ]);
    }
    public function spGanHet()
    {
        $product = Product::where('soLuongSP', '<', 10)->paginate(10);
        return response()->json([
            'status' => 200,
            'product' => $product,
        ]);
    }
    public function lichSuNhapHang(Request $request)
    {
        $from = Carbon::createFromFormat('Y-m-d', $request->dateFrom)->format('Y-m-d');
        $to = Carbon::createFromFormat('Y-m-d', $request->dateTo)->format('Y-m-d');
        $pn =  PhieuNhap::whereBetween('created_at', [$from, $to])->where('status', 1)
            ->paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }
    public function lichSuXuatHang(Request $request)
    {
        $from = Carbon::createFromFormat('Y-m-d', $request->dateFrom)->format('Y-m-d');
        $to = Carbon::createFromFormat('Y-m-d', $request->dateTo)->format('Y-m-d');
        $px =  PhieuXuat::whereBetween('created_at', [$from, $to])->where('status', 4)
            ->paginate(10);
        return response()->json([
            'status' => 200,
            'px' => $px,
        ]);
    }
    public function thongKeChiTieuSoLuong()
    {
        $timeNow = Carbon::now();
        $arrayTime = array();
        $total_sl = array();
        $total_pn = array();
        for ($i = 1; $i <= 12; $i++) {
            if ($i == 1) {
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_sl[$stringMY] =  CtPhieuNhap::selectRaw('sum(soluong) as soluong')
                    ->join('phieu_nhaps', 'ct_phieu_nhaps.pn_id', '=', 'phieu_nhaps.id')
                    ->whereBetween('phieu_nhaps.created_at', [$from, $to])
                    ->where('status', 1)
                    ->first();

                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 1)
                    ->first();
            } else {
                $timeNow = $timeNow->subMonth();
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_sl[$stringMY] =  CtPhieuNhap::selectRaw('sum(soluong) as soluong')
                    ->join('phieu_nhaps', 'ct_phieu_nhaps.pn_id', '=', 'phieu_nhaps.id')
                    ->whereBetween('phieu_nhaps.created_at', [$from, $to])
                    ->where('status', 1)
                    ->first();
                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 1)
                    ->first();
            }
        }
        return response()->json([
            'status' => 200,
            'total_sl' => $total_sl,
            'total_pn' => $total_pn,
        ]);
    }

    public function thongKeDoanhThuSoLuong()
    {
        $timeNow = Carbon::now();
        $arrayTime = array();
        $total_sl = array();
        $total_px = array();
        for ($i = 1; $i <= 12; $i++) {
            if ($i == 1) {
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_sl[$stringMY] =  CtPhieuXuat::selectRaw('sum(soluong) as soluong')
                    ->join('phieu_xuats', 'ct_phieu_xuats.px_id', '=', 'phieu_xuats.id')
                    ->whereBetween('phieu_xuats.created_at', [$from, $to])
                    ->where('status', 4)
                    ->first();

                $total_px[$stringMY] =  PhieuXuat::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 4)
                    ->first();
            } else {
                $timeNow = $timeNow->subMonth();
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_sl[$stringMY] =  CtPhieuXuat::selectRaw('sum(soluong) as soluong')
                    ->join('phieu_xuats', 'ct_phieu_xuats.px_id', '=', 'phieu_xuats.id')
                    ->whereBetween('phieu_xuats.created_at', [$from, $to])
                    ->where('status', 4)
                    ->first();
                $total_px[$stringMY] =  PhieuXuat::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('status', 4)
                    ->first();
            }
        }
        return response()->json([
            'status' => 200,
            'total_sl' => $total_sl,
            'total_px' => $total_px,
        ]);
    }



    public function doanhThuNhanVien()
    {
        $timeNow = Carbon::now();
        $arrayTime = array();
        $total_sl = array();
        $total_px = array();
        for ($i = 1; $i <= 12; $i++) {
            if ($i == 1) {
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_sl[$stringMY] =  CtPhieuXuat::selectRaw('sum(soluong) as soluong')
                    ->join('phieu_xuats', 'ct_phieu_xuats.px_id', '=', 'phieu_xuats.id')
                    ->whereBetween('phieu_xuats.created_at', [$from, $to])
                    ->where('employee_id', auth()->user()->employee->id)
                    ->where('status', 4)
                    ->first();

                $total_px[$stringMY] =  PhieuXuat::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('employee_id', auth()->user()->employee->id)
                    ->where('status', 4)
                    ->first();
            } else {
                $timeNow = $timeNow->subMonth();
                $arrayTime[$i] = $timeNow->toDateString();

                $monthYear = explode('-', $arrayTime[$i]);
                $stringMY = $monthYear[1] . '-' . $monthYear[0];
                $from = date($monthYear[0] . '-' . $monthYear[1] . '-01');
                $dayInMonth = Carbon::parse($from)->daysInMonth;
                $to = date($monthYear[0] . '-' . $monthYear[1] . '-' . $dayInMonth);

                $total_sl[$stringMY] =  CtPhieuXuat::selectRaw('sum(soluong) as soluong')
                    ->join('phieu_xuats', 'ct_phieu_xuats.px_id', '=', 'phieu_xuats.id')
                    ->whereBetween('phieu_xuats.created_at', [$from, $to])
                    ->where('employee_id', auth()->user()->employee->id)
                    ->where('status', 4)
                    ->first();
                $total_px[$stringMY] =  PhieuXuat::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->where('employee_id', auth()->user()->employee->id)
                    ->where('status', 4)
                    ->first();
            }
        }
        $contact_count = Contact::where('status', 0)->count();
        $chuaxuly = PhieuXuat::selectRaw('count(id) as chuaxuly')
            ->where('status', 0)
            ->first();
        $daxuly = PhieuXuat::selectRaw('count(id) as daxuly')
            ->where('status', '>=', 1)
            ->first();
        $soluongban = PhieuXuat::selectRaw('count(id) as soluongban')
            ->where('employee_id', auth()->user()->employee->id)
            ->where('status', 4)->first();
        $tongTien = PhieuXuat::selectRaw('sum(tongTien) as tongTien')
            ->where('employee_id', auth()->user()->employee->id)
            ->where('status', 4)->first();
        $tongsoluong = PhieuXuat::selectRaw('count(id) as soluongban')
            ->where('status', 4)->first();
        return response()->json([
            'status' => 200,
            'total_sl' => $total_sl,
            'total_px' => $total_px,
            'contact_count' => $contact_count,
            'soluongban' => $soluongban,
            'tongTien' => $tongTien,
            'chuaxuly' => $chuaxuly,
            'daxuly' => $daxuly,
            'tongsoluong' => $tongsoluong,
        ]);
    }
}
