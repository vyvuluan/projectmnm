<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use  App\Models\Product;

class HomeController extends Controller
{
    public function home()
    {
        $product_new = Product::orderBy('id','desc')->paginate(2);
        return response()->json([
            'product_new'=>$product_new,
            
        ]);
    }
}
