<?php

namespace App\Http\Controllers;

use  App\Models\Loaisp;
use  App\Models\Product;
use Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LoaispController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $loaisp = Loaisp::all();
        return response()->json([
            'status' => 200,
            'Loaisp' => $loaisp,
        ]);
    }
    public function spcate($id)
    {
        $loaisp = Loaisp::where('id', $id)->first();
        //$products = Loaisp::find($id)->products->paginate(8);
        if ($loaisp) {
            $products = Product::where('maLoai', $loaisp->id)->paginate(10);
            return response()->json([
                'status' => 200,
                'Loaisp' => $products,
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
        // $this->validate($request, [
        //     'tenLoai' =>'required|max:10'
        // ]);
        $validator = Validator::make($request->all(), [
            'tenLoai' => 'required|max:10'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $Loaisp = new Loaisp;
            $Loaisp->tenLoai = $request->tenLoai;
            $Loaisp->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm loại sản phẩm thành công',
            ]);
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
        $Loaisp = Loaisp::find($id);
        if ($Loaisp) {
            return response()->json([
                'status' => 200,
                'loaisp' => $Loaisp,
            ]);
        }
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
            'tenLoai' => 'required|max:10'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $Loaisp = Loaisp::find($id);
            if ($Loaisp) {
                $Loaisp->tenLoai = $request->tenLoai;
                $Loaisp->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật thành công ',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy loại sản phẩm',
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
        $Loaisp = Loaisp::find($id);
        if ($Loaisp) {
            $Loaisp->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xoá thành công',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy Loại sản phẩm cần xoá',
            ]);
        }
    }
}
