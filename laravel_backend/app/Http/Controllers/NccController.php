<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ncc;
use Validator;
use App\Http\Resources\NccResource;

class NccController extends Controller
{
    // Backup không còn xài nữa
    public function index()
    {
        $Ncc = Ncc::paginate();
        return response()->json([
            'status'=>200,
            'Ncc'=>$Ncc,
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
        $validator = Validator::make($request->all(),[
            'tenNCC' =>'required|max:20',
            'diaChi'=>'required|max:100',
            'sdt'=>'required|numeric|digits:10',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $Ncc = new Ncc();
            $Ncc->tenNCC = $request->tenNCC;
            $Ncc->diaChi = $request->diaChi;
            $Ncc->sdt = $request->sdt;
            $Ncc->save();
            return response()->json([
                'status'=>200,
                'message'=>'Thêm Ncc thành công',
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Ncc $Ncc)
    {

        return new NccResource($Ncc);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $Ncc = Ncc::find($id);
        if($Ncc)
        {
            return response()->json([
                'status'=>200,
                'loaisp'=>$Ncc,
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
    public function update(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            'tenNCC' =>'required|max:20',
            'diaChi'=>'required|max:100',
            'sdt'=>'required|numeric|digits:10',
        ],[
            'tenNCC.required' => 'Ô tên nhà cung cấp Không được bỏ trống',
            'diaChi.required' => 'Ô địa chỉ không được bỏ trống',
            'sdt.numeric' => 'Ô số điện thoại phải có định dạng là số ',
            'sdt.digits' => 'Ô số điện thoại phải là 10 số',
            'sdt.required' => 'Ô số điện thoại không được bỏ trống',

        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $Ncc = Ncc::find($id);
            if($Ncc)
            {
                $Ncc->tenNCC = $request->tenNCC;
                $Ncc->diaChi = $request->diaChi;
                $Ncc->sdt = $request->sdt;
                $Ncc->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cập nhật thành công ',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Không tìm Ncc cần tìm',
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

        $Ncc = Ncc::find($id);
        if($Ncc)
        {
            $Ncc->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Xoá thành công',
                ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Không tìm thấy ncc cần xoá',
                ]);

        }
    }
}
