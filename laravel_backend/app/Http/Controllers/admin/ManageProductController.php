<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ManageProductController extends Controller
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
            'sanPham' => $product,
            'tenLoai' => $tenLoai,
        ]);
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
            //'soLuongSP' => 'required|numeric',
            'maNSX' => 'required|max:10',
            'maNCC' => 'required|max:10',
            'gia' => 'required|numeric',
            'baoHanh' => 'required|numeric',
            'moTa' => 'required',
            'ctSanPham' => 'required',
            'maLoai' => 'required'
        ], [

            'tenSP.required' => 'Ô tên sản phẩm không được bỏ trống',
            //'soLuongSP.numeric' => 'Ô số lượng phải là số',
            //'soLuongSP.required' => 'Ô số lượng phải không được bỏ trống',
            'maNSX.required' => 'Ô maNSX không được bỏ trống',
            'maNCC.required' => 'Ô maNCC không được bỏ trống',
            'gia.numeric' => 'Ô giá phải là số',
            'gia.required' => 'Ô giá không được bỏ trống',
            'baoHanh.numeric' => 'Ô bảo hành phải là số',
            'baoHanh.required' => 'Ô bảo hành không được bỏ trống',
            'moTa.required' => 'Ô mô tả không được bỏ trống',
            'ctSanPham.required' => 'Ô ctSanPham không được bỏ trống',
            'maLoai.required' => 'Ô mã loại không được bỏ trống',
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
            //$product->soLuongSP = $request->soLuongSP;
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
            //'soLuongSP' => 'required|numeric',
            'maNSX' => 'required|max:10',
            'maNCC' => 'required|max:10',
            'gia' => 'required|numeric',
            'baoHanh' => 'required|numeric',
            'moTa' => 'required',
            'ctSanPham' => 'required',
            'maLoai' => 'required'
        ], [

            'tenSP.required' => 'Ô tên sản phẩm không được bỏ trống',
            //'soLuongSP.numeric' => 'Ô số lượng phải là số',
            //'soLuongSP.required' => 'Ô số lượng phải không được bỏ trống',
            'maNSX.required' => 'Ô maNSX không được bỏ trống',
            'maNCC.required' => 'Ô maNCC không được bỏ trống',
            'gia.numeric' => 'Ô giá phải là số',
            'gia.required' => 'Ô giá không được bỏ trống',
            'baoHanh.numeric' => 'Ô bảo hành phải là số',
            'baoHanh.required' => 'Ô bảo hành không được bỏ trống',
            'moTa.required' => 'Ô mô tả không được bỏ trống',
            'ctSanPham.required' => 'Ô ctSanPham không được bỏ trống',
            'maLoai.required' => 'Ô mã loại không được bỏ trống',
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
                //$product->soLuongSP = $request->soLuongSP;
                $product->maLoai = $request->maLoai;
                $product->maNSX = $request->maNSX;
                $product->maNCC = $request->maNCC;
                $product->gia = $request->gia;
                $product->baoHanh = $request->baoHanh;
                $product->moTa = $request->moTa;
                $product->ctSanPham = $request->ctSanPham;
                if ($request->hasFile('hinh')) {
                    //unlink('public/uploadhinh/' . $product->hinh);
                    $hinh = $request->file('hinh');
                    $ext = $hinh->getClientOriginalExtension();
                    $name = time() . '_' . $hinh->getClientOriginalName();
                    Storage::disk('public')->put($name, File::get($hinh));
                    $product->hinh = $name;
                }
                $product->update();
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
    //search tất cả
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
        $product = $product_query->paginate(8);

        return response()->json([
            'data' => $product,
            'message' => 'kết quả',
        ]);
    }
    //search theo tên và mã
    public function searchProduct(Request $request)
    {
        $product = Product::where('id', 'like', '%' . $request->key . '%')
            ->orWhere('tenSP', 'like', '%' . $request->key . '%')
            ->get();
        return response()->json([
            'status' => 200,
            'product' => $product,
        ]);
    }
}
