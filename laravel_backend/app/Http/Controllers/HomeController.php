<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Product;
use  App\Models\CtPhieuXuat;

class HomeController extends Controller
{
    public function home()
    {
        $product_new = Product::orderBy('id','desc')->limit(4)->get();


        $ctpxs = CtPhieuXuat::selectRaw('sum(soluong) as soluong,  product_id')
        ->groupBy('product_id')
        ->orderBy('soluong','desc')->limit(4)->get();
        $product = array();
        $dem=0;
        foreach($ctpxs as $ctpx)
        {
            $product[$dem++] = Product::find($ctpx->product_id);
        }

        return response()->json([
            'product_new'=>$product_new,
            'product_bestseller' => $product,
        ]);
    }
}
