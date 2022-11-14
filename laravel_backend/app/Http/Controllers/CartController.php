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
        if (auth('sanctum')->check()) {
            $maKH = auth('sanctum')->user()->customer->id;
            $cartItem = Cart::where('maKH', $maKH)->get();
            $count = $cartItem->count();

            return response()->json([
                'status' => 200,
                'count' => $count,
                'cart' => $cartItem
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để xem giỏ',

            ]);
        }
    }
    public function addtocart(Request $request)
    {
        //Bản chính Thức

        if (auth('sanctum')->check()) {
            if (auth('sanctum')->user()->role_id == 1) {
                $maKH = auth('sanctum')->user()->customer->id;
                $maSP = $request->product_id;
                $soLuongSP = $request->product_qty;
                $spCheck = Product::where('id', $maSP)->first();
                if ($spCheck) {
                    $cartItem = Cart::where('maSP', $maSP)->where('maKH', $maKH)->first();
                    //$cartItem = Cart::where('id', $id_cart)->where('maKH', $maKH)->first();
                    if ($cartItem) {

                        $cartItem->soLuongSP += $soLuongSP;
                        if ($cartItem->soLuongSP > $spCheck->soLuongSP) {
                            return response()->json([
                                'status' => 400,
                                'message' => 'Kho chỉ còn : ' . $spCheck->soLuongSP . ' sản phẩm',
                            ]);
                        }
                        $cartItem->save();
                        $count = $cartItem->count();
                        return response()->json([
                            'status' => 201,
                            'message' => 'Đã thêm vào giỏ hàng',
                            'count' => $count,
                        ]);
                        // return response()->json([
                        //     'status'=>409 ,
                        //     'message'=>$spCheck->tenSP.'Sản phẩm đã có ở trong giỏ hàng',
                        //     ]);
                    } else {
                        $cartItem = new Cart;
                        $cartItem->maKH = $maKH;
                        $cartItem->maSP = $maSP;
                        $cartItem->soLuongSP = $soLuongSP;
                        if ($cartItem->soLuongSP > $spCheck->soLuongSP) {
                            return response()->json([
                                'status' => 400,
                                'message' => 'Kho chỉ còn : ' . $spCheck->soLuongSP . ' sản phẩm',
                            ]);
                        }
                        $cartItem->save();
                        $count = $cartItem->count();
                        return response()->json([
                            'status' => 201,
                            'message' => 'Đã thêm vào giỏ hàng',
                            'count' => $count,
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'Không tìm thấy sản phẩm',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Tài khoản của bạn là admin không thể đặt hàng',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thêm vào giỏ hàng',
            ]);
        }
    }
    public function updatequantity($id_cart, $scope)
    {

        // Bản chính thức
        if (auth('sanctum')->check()) {
            $maKH = auth('sanctum')->user()->customer->id;
            $cartItem = Cart::where('id', $id_cart)->where('maKH', $maKH)->first();
            $spCheck = Product::find($cartItem->maSP);
            if ($scope == "inc") {
                $cartItem->soLuongSP += 1;
                if ($cartItem->soLuongSP > $spCheck->soLuongSP) {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Kho chỉ còn : ' . $spCheck->soLuongSP . ' sản phẩm',
                    ]);
                }
            } else if ($scope == "dec") {
                $cartItem->soLuongSP -= 1;
            }
            $cartItem->update();
            return response()->json([
                'status' => 200,
                'message' => 'Cập nhật giở hàng thành công',
            ]);
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thêm vào giỏ hàng',
            ]);
        }
    }
    use RefreshDatabase;
    public function deletecart($id_cart)
    {

        //Bản chính thức
        if (auth('sanctum')->check()) {
            $maKH = auth('sanctum')->user()->customer->id;
            $cartItem = Cart::where('id', $id_cart)->where('maKH', $maKH)->first();
            if ($cartItem) {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Xoá thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy giỏ hàng cần xoá',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để thêm vào giỏ hàng',
            ]);
        }
    }
}
