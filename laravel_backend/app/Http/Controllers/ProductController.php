<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Comment;
use Validator;
use App\Models\loaisp;
//use App\Http\Resources\ProductResource;
use App\Models\Product as ModelsProduct;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

// use File;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $prd = Product::orderBy('id', 'desc')->paginate(8);
        return $prd;
    }
    public function ctsp($product)
    {
        $SP = Product::find($product);
        $tenLoai = $SP->loaisp->tenLoai;
        $product = Product::find($product);
        return response()->json([
            'status' => 200,
            'sanPham' => $product,
            'tenLoai' => $tenLoai,
        ]);
    }
    public function allcomment($product_id)
    {
        // $comment = Product::find($product_id)->comments;
        $comment = DB::select("CALL get_allcomment($product_id)");
        return response()->json([
            'status' => 200,
            'comment' => $comment,
        ]);
    }
    public function addcomment(Request $request)
    {

        if (auth('sanctum')->check()) {


            $maKH = auth('sanctum')->user()->customer->id;
            $spcheck = Product::find($request->product_id);
            if ($spcheck) {
                DB::select("CALL add_comment($request->product_id,$maKH,'$request->comment')");
                // $comment = new Comment();
                // $comment->product_id =  $request->product_id;
                // $comment->customer_id = $maKH;
                // $comment->comment =  $request->comment;
                // $comment->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Đăng commnent thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 401,
                    'message' => 'Sản phẩm không tồn tại',
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Đăng nhập để đăng bình luận',
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($product)
    {
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
            'tenSP' => 'required',
            'soLuongSP' => 'required|numeric',
            'maNSX' => 'required|max:10',
            'maNCC' => 'required|max:10',
            'gia' => 'required|numeric',
            'baoHanh' => 'required|numeric',
            'moTa' => 'required',
            'ctSanPham' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $product = new Product();
            //$product->maSP = $request->maSP;
            $product->tenSP = $request->tenSP;
            $product->soLuongSP = $request->soLuongSP;
            $product->maLoai = $request->maLoai;
            $product->maNSX = $request->maNSX;
            $product->maNCC = $request->maNCC;
            $product->gia = $request->gia;
            $product->baoHanh = $request->baoHanh;
            $product->moTa = $request->moTa;
            $product->ctSanPham = $request->ctSanPham;
            if ($request->hasFile('hinh')) {
                $hinh = $request->file('hinh');
                $ext = $hinh->getClientOriginalExtension();
                $name = time() . '_' . $hinh->getClientOriginalName();
                Storage::disk('public')->put($name, File::get($hinh));
                $product->hinh = $name;
            } else {
                $product->hinh = 'default.jpg';
            }
            $product->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm sản phẩm thành công ',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {

        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $product = Product::find($id);
        return response()->json([
            'status' => 200,
            'product' => $product,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $product)
    {
        $validator = Validator::make($request->all(), [
            'tenSP' => 'required',
            'soLuongSP' => 'required|numeric',
            'maNSX' => 'required|max:10',
            'maNCC' => 'required|max:10',
            'gia' => 'required|numeric',
            'baoHanh' => 'required|numeric',
            'moTa' => 'required',
            'ctSanPham' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $product =  Product::find($product);
            if ($product) {
                $product->tenSP = $request->tenSP;
                $product->soLuongSP = $request->soLuongSP;
                $product->maLoai = $request->maLoai;
                $product->maNSX = $request->maNSX;
                $product->maNCC = $request->maNCC;
                $product->gia = $request->gia;
                $product->baoHanh = $request->baoHanh;
                $product->moTa = $request->moTa;
                $product->ctSanPham = $request->ctSanPham;
                if ($request->hasFile('hinh')) {
                    $hinh = $request->file('hinh');
                    $ext = $hinh->getClientOriginalExtension();
                    $name = time() . '_' . $hinh->getClientOriginalName();
                    Storage::disk('../public')->put($name, File::get($hinh));
                    $product->hinh = $name;
                }
                $product->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'Không tìm thấy sản phẩm',
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
    public function destroy($product)
    {
        $product = Product::find($product);
        if ($product) {
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xoá thành công',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy sản phẩm cần xoá',
            ]);
        }
    }
    // Search tất cả sản phẩm
    public function search(Request $request)
    {
        $key = $request->key;
        $product_query =  Product::with('loaisp');
        $product_query
            ->where('tenSP', 'LIKE', '%' . $key . '%')
            ->orwhere('moTa', 'LIKE', '%' . $key . '%')
            ->orwhere('ctSanPham', 'LIKE', '%' . $key . '%')
            ->orwhereHas('loaisp', function ($query) use ($key) {
                $query->where('tenLoai', 'LIKE', '%' . $key . '%');
            });
        $product = $product_query->paginate(10);

        return response()->json([
            'data' => $product,
            'message' => 'kết quả',
        ]);
    }


    public function sortProduct(Request $request)
    {
        switch ($request->key) {
            case 1: { //tên A - Z

                    $product = Product::orderBy('tenSP',    'asc')->paginate(10);
                    return response()->json([
                        'status' => 200,
                        'product' => $product,
                    ]);
                }
                // $this->locTenSpAZ();
                break;
            case 2: { // tên Z - A
                    $product = Product::orderBy('tenSP', 'desc')->paginate(10);
                    return response()->json([
                        'status' => 200,
                        'product' => $product,
                    ]);
                }
                break;
            case 3: { //giá cao thấp
                    $product = Product::orderBy('gia', 'desc')->paginate(10);
                    return response()->json([
                        'status' => 200,
                        'product' => $product,

                    ]);
                }
                break;
            case 4: { //giá thấp cao
                    $product = Product::orderBy('gia', 'asc')->paginate(10);
                    return response()->json([
                        'status' => 200,
                        'product' => $product,

                    ]);
                }
                break;
            default:
                return response()->json([
                    'status' => 400,
                    'message' => 'không tồn tại',
                ]);
        }
    }

    public function sort_chitiet(Request $request)
    {
        $product =  Product::whereIn('maNsx', $request->nsx_id)
            ->where('gia', '<=', $request->gia)->paginate(8);
        return response()->json([
            'data' => $product,
            'message' => 'kết quả',
        ]);
    }
    public function sort_chitiet_minmax(Request $request)
    {
        $array_nsx = array_map('intval', explode(',', $request->nsx_id));

        $product =  Product::whereIn('maNsx', $array_nsx)
            ->where('gia', '>=', $request->giaMin)
            ->where('gia', '<=', $request->giaMax)
            ->paginate(8);
        return response()->json([
            'data' => $product,
            'message' => 'kết quả',
        ]);
    }
    public function product_max()
    {
        $product =  Product::selectRaw('max(gia) as gia')
            ->first();
        return response()->json([
            'data' => $product,
            'message' => 'kết quả',
        ]);
    }
}
