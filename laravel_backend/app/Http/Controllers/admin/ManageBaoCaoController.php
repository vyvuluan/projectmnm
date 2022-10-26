<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
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

                $total_px[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
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
                $total_px[$stringMY] =  PhieuNhap::selectRaw('sum(tongTien) as tongTien')
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
        $product = Product::where('soLuongSP','<',10)->paginate(10);
        return response()->json([
            'status' => 200,
            'product' => $product,
        ]);
    }
}
