<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Nsx;
use Validator;
use App\Http\Resources\NsxResource;

class ManageNsxController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Nsx = Nsx::orderBy('id', 'desc')->paginate(10);
        return response()->json([
            'status' => 200,
            'Nsx' => $Nsx,
        ]);
    }
    public function nsxall()
    {
        $Nsx = Nsx::all();
        return response()->json([
            'status' => 200,
            'Nsx' => $Nsx,
        ]);
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

        $validator = Validator::make($request->all(), [
            'tenNSX' => 'required|max:10',
            'quocGia' => 'required|max:20',
        ], [
            'tenNSX.required' => 'Ô tên sản xuất Không được bỏ trống',
            'quocGia.required' => 'Ô quốc gia không được bỏ trống',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $Nsx = new Nsx();
            $Nsx->tenNSX = $request->tenNSX;
            $Nsx->quocGia = $request->quocGia;
            $Nsx->save();
            return response()->json([
                'status' => 200,
                'message' => 'Thêm Nsx thành công',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Nsx $Nsx)
    {

        return new NsxResource($Nsx);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $Nsx = Nsx::find($id);
        if ($Nsx) {
            return response()->json([
                'status' => 200,
                'loaisp' => $Nsx,
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
            'tenNSX' => 'required|max:10',
            'quocGia' => 'required|max:20',
        ], [
            'tenNSX.required' => 'Ô tên sản xuất Không được bỏ trống',
            'quocGia.required' => 'Ô quốc gia không được bỏ trống',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $Nsx = Nsx::find($id);
            if ($Nsx) {
                $Nsx->tenNSX = $request->tenNSX;
                $Nsx->quocGia = $request->quocGia;
                $Nsx->save();
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
        $Nsx = Nsx::find($id);
        if ($Nsx) {
            $Nsx->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Xoá thành công',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Không tìm thấy nsx cần xoá',
            ]);
        }
    }
    public function searchNsx(Request $request)
    {
        $nsx = Nsx::where('id', 'like', '%' . $request->key . '%')
            ->orWhere('tenNSX', 'like', '%' . $request->key . '%')
            ->orWhere('quocGia', 'like', '%' . $request->key . '%')
            ->get();
        return response()->json([
            'status' => 200,
            'nsx' => $nsx,
        ]);
    }
}
