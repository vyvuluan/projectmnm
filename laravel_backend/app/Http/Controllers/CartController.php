<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Http\Request;
use LDAP\Result;
use Illuminate\Foundation\Testing\RefreshDatabase;


class CartController extends Controller
{
    public function viewcart()
    {


            // $maKH= 1;
            // $cartItem = Cart::where('maKH',$maKH)->get();
            // return response()->json([
            //     'status'=>200 ,
            //     'cart'=>$cartItem,
            //     ]);

               // Bản chính thức
          if(auth('sanctum')->check())
        {
            $maKH= auth('sanctum')->user()->customer->id;
            $cartItem = Cart::where('maKH',$maKH)->get();
            return response()->json([
                'status'=>200 ,
                'cart'=>$cartItem,
                ]);


        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Đăng nhập để xem giở',
                ]);
        }

    }
    public function addtocart(Request $request)
    {
        // $product = Product::find($request->id);
        // $data['id']=$product->id;
        // $data['qty']=$request->soLuongSP;
        // $data['name']=$product->tenSP;
        // $data['price']=$product->gia;
        // $data['weight']='123';
        // $data['options']['image']=$product->hinh;
        //  Cart::add($data);
        //  $cart = Cart::content();
        //  return $cart;
        // Đây chỉ là bản test vì chưa có login
            // $maKH= $request->maKH;
            // $maSP = $request->maSP;
            // $soLuongSP = $request->soLuongSP;
            // $spCheck = Product::where('id',$maSP)->first();
            // if($spCheck)
            // {
            //         if(Cart::where('maSP',$maSP)->where('maKH',$maKH)->exists())
            //         {
            //             return response()->json([
            //                 'status'=>409 ,
            //                 'message'=>$spCheck->tenSP.' đã có ở trong giỏ hàng',
            //                 ]);
            //         }
            //         else
            //         {
            //             $cartItem = new Cart;
            //             $cartItem->maKH = $maKH;
            //             $cartItem->maSP = $maSP;
            //             $cartItem->soLuongSP=$soLuongSP;
            //             $cartItem->save();
            //             return response()->json([
            //                 'status'=>201 ,
            //                 'message'=>'Đã thêm vào giở hàng',
            //                 ]);
            //         }
            // }
            // else
            // {
            //     return response()->json([
            //         'status'=>404 ,
            //         'message'=>'Không tìm thấy sản phẩm',
            //         ]);
            // }


            //Bản chính Thức

        if(auth('sanctum')->check())
        {
            $maKH= auth('sanctum')->user()->customer->id;
            $maSP = $request->product_id;
            $soLuongSP = $request->product_qty;
            $spCheck = Product::where('id',$maSP)->first();
            if($spCheck)
            {
                    if(Cart::where('maSP',$maSP)->where('maKH',$maKH)->exists())
                    {
                        return response()->json([
                            'status'=>409 ,
                            'message'=>' Sản phẩm đã có ở trong giỏ hàng',
                            ]);
                    }
                    else
                    {
                        $cartItem = new Cart;
                        $cartItem->maKH = $maKH;
                        $cartItem->maSP = $maSP;
                        $cartItem->soLuongSP=$soLuongSP;
                        $cartItem->save();
                        return response()->json([
                            'status'=>201 ,
                            'message'=>'Đã thêm vào giỏ hàng',
                            ]);
                    }
            }
            else
            {
                return response()->json([
                    'status'=>404 ,
                    'message'=>'Không tìm thấy sản phẩm',
                    ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Đăng nhập để thêm vào giỏ hàng',
                ]);
        }
    }
    public function updatequantity($id_cart,$scope)
    {
                    //Test chưa login
            // $maKH= 1;
            // $cartItem = Cart::where('id',$id_cart)->where('maKH',$maKH)->first();
            // if($scope=="inc")
            // {
            //     $cartItem->soLuongSP +=1;
            // }
            // else if($scope=="dec")
            // {
            //     $cartItem->soLuongSP -=1;
            // }
            // $cartItem->update();
            // return response()->json([
            //     'status'=>200,
            //     'message'=>'Cập nhật giỏ hàng thành công',
            //     ]);





                    // Bản chính thức
          if(auth('sanctum')->check())
        {
            $maKH= auth('sanctum')->user()->customer->id;
            $cartItem = Cart::where('id',$id_cart)->where('maKH',$maKH)->first();
            if($scope=="inc")
            {
                $cartItem->soLuongSP +=1;
            }
            else if($scope=="dec")
            {
                $cartItem->soLuongSP -=1;
            }
            $cartItem->update();
            return response()->json([
                'status'=>200,
                'message'=>'Cập nhật giở hàng thành công',
                ]);

        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Đăng nhập để thêm vào giỏ hàng',
                ]);
        }

    }
    use RefreshDatabase;
    public function deletecart($id_cart)
    {
                //Test chưa có login
        // $maKH= 1;
        // $cartItem = Cart::where('id',$id_cart)->where('maKH',$maKH)->first();

        //     if($cartItem)
        //     {
        //         $cartItem->delete();
        //         return response()->json([
        //             'status'=>200,
        //             'message'=>'Xoá thành công',
        //             ]);
        //     }
        //     else
        //     {
        //         return response()->json([
        //             'status'=>404,
        //             'message'=>'Không tìm thấy giở hàng cần xoá',
        //             ]);
        //     }
                    //Bản chính thức
        if(auth('sanctum')->check())
        {
            $maKH= auth('sanctum')->user()->customer->id;
            $cartItem = Cart::where('id',$id_cart)->where('maKH',$maKH)->first();
            if($cartItem)
            {
                $cartItem->delete();
                return response()->json([
                    'status'=>200,
                    'message'=>'Xoá thành công',
                    ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Không tìm thấy giỏ hàng cần xoá',
                    ]);
            }
        }
        else
        {
            return response()->json([
                'status'=>401,
                'message'=>'Đăng nhập để thêm vào giỏ hàng',
                ]);
        }
    }
}
