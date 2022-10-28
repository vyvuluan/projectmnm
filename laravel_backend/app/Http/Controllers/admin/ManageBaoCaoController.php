<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\CtPhieuNhap;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\PhieuXuat;
use App\Models\CtPhieuXuat;
use App\Models\Product;
use App\Models\PhieuNhap;

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
                    ->first();

                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
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
                    ->first();
                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->first();
            }
        }


        $ctpxs = CtPhieuXuat::selectRaw('sum(soluong) as soluong,  maLoai')
            ->join('products', 'ct_phieu_xuats.product_id', '=', 'products.id')
            ->groupBy('maLoai')
            ->get();
        $tongPhanTram = 0;
        foreach ($ctpxs as $ctpx) {
            $tongPhanTram += $ctpx->soluong;
        }
        $phanTramLoai = array();

        foreach ($ctpxs as $ctpx) {
            $phanTramLoai[$ctpx->maLoai] = ($ctpx->soluong * 100) / $tongPhanTram;
        }

        $doanhthu = PhieuXuat::selectRaw('sum(tongTien) as tongTien')
            ->first();

        $chitieu = PhieuNhap::selectRaw('sum(tongTien) as tongTien')
            ->first();
        return response()->json([
            'status' => 200,
            'total_px' => $total_px,
            'total_pn' => $total_pn,
            'loai' => $phanTramLoai,
            'doanhthu' => $doanhthu,
            'chitieu' => $chitieu,
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
        $from = Carbon::createFromFormat('d/m/Y', $request->dateFrom)->format('Y-m-d');
        $to = Carbon::createFromFormat('d/m/Y', $request->dateTo)->format('Y-m-d');
        $pn =  PhieuNhap::whereBetween('created_at', [$from, $to])
            ->paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $pn,
        ]);
    }
    public function lichSuXuatHang(Request $request)
    {
        $from = Carbon::createFromFormat('d/m/Y', $request->dateFrom)->format('Y-m-d');
        $to = Carbon::createFromFormat('d/m/Y', $request->dateTo)->format('Y-m-d');
        $px =  PhieuXuat::whereBetween('created_at', [$from, $to])
            ->paginate(10);
        return response()->json([
            'status' => 200,
            'pn' => $px,
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
                    ->first();

                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
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

                    ->first();
                $total_pn[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
                    ->whereBetween('created_at', [$from, $to])
                    ->first();
            }
        }
        return response()->json([
            'status' => 200,
            'total_sl' => $total_pn,
            'total_pn' => $total_sl,
        ]);
    }
}
