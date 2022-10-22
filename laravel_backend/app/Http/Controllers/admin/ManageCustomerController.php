<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Request;
use App\Models\Customer;
use Validator;

class ManageCustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Customer = Customer::all();
        return response()->json([
            'status' => 200,
            'Loaisp' => $Customer,
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
        // $validator = Validator::make($request->all(),[
        //     'ten' =>'required|max:10',
        //     'ngaySinh' =>'required|max:20',
        //     'sdt'=>'required|numeric|digits:10',
        //     'user_id' =>'required|max:10',
        // ]);
        // if($validator->fails())
        // {
        //     return response()->json([
        //         'status'=>400,
        //         'error'=>$validator->messages(),
        //     ]);
        // }
        // else
        // {
        //     $Customer = new Customer();
        //     $Customer->ten = $request->ten;
        //     $Customer->ngaySinh = $request->ngaySinh;
        //     $Customer->sdt = $request->sdt;
        //     $Customer->user_id = $request->user_id;
        //     $Customer->save();
        //     return response()->json([
        //         'status'=>200,
        //         'message'=>'Thêm loại khách hàng thành công',
        //     ]);
        // }
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
        $Customer = Customer::find($id);
        if ($Customer) {
            return response()->json([
                'status' => 200,
                'data' => $Customer,
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
            'ten' => 'required|max:20',
            'ngaySinh' => 'required|max:30',
            'sdt' => 'required|numeric|digits:10',
            'diaChi' => 'required|max:60',
            'gioiTinh' => 'required|numeric',
            // 'user_id' =>'required|max:10',
        ], [
            'ten.required' => 'Ô họ tên Không được bỏ trống',
            'ngaySinh.required' => 'Ô ngày sinh Không được bỏ trống',
            'diaChi.required' => 'Ô địa chỉ Không được bỏ trống',
            'gioiTinh.required' => 'Ô giới tính Không được bỏ trống',
            'sdt.required' => 'Ô số điện thoại Không được bỏ trống',
            'sdt.numeric' => 'Ô số điện thoại không đúng định dạng số',
            'sdt.digits' => 'Ô số điện thoại phải là 10 số',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        } else {
            $Customer = Customer::where('user_id', $id)->first();
            if ($Customer) {
                $Customer->ten = $request->ten;
                $Customer->ngaySinh = $request->ngaySinh;
                $Customer->sdt = $request->sdt;
                $Customer->diaChi = $request->diaChi;
                $Customer->gioiTinh = $request->gioiTinh;
                //$Customer->user_id = $request->user_id;
                $Customer->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật thông tin khách hàng thành công',
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy thông tin khách hàng',
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
        $Customer = Customer::find($id);
        $user = User::where('id', $Customer->user_id)->delete();
        return response()->json([
            'status' => 200,
            'user' => $user,
            'message' => 'xóa thành công',
        ]);
    }
}
