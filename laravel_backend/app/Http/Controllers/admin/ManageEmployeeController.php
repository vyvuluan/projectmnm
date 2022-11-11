<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class ManageEmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $emp = Employee::orderBy('id', 'desc')->paginate(5);
        return response()->json([
            'status' => 200,
            'emloyee' =>  $emp,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
            'ten' => 'required|max:20',
            'ngaySinh' => 'required',
            'sdt' => 'required|numeric|digits:10',
            'diaChi' => 'required|max:100',
            'gioiTinh' => 'required',
            'cv_id' => 'required',
        ], [
            'ten.required' => 'Ô họ tên Không được bỏ trống',
            'ngaySinh.required' => 'Ô ngày sinh Không được bỏ trống',
            'diaChi.required' => 'Ô địa chỉ Không được bỏ trống',
            'gioiTinh.required' => 'Ô giới tính Không được bỏ trống',
            'sdt.required' => 'Ô số điện thoại Không được bỏ trống',
            'sdt.numeric' => 'Ô số điện thoại không đúng định dạng số',
            'sdt.digits' => 'Ô số điện thoại phải là 10 số',
            'cv_id.required' => 'Ô cv_id Không được bỏ trống',
            'ngaySinh.max' => 'Ô ngày sinh tối đa 100 ký tự',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'mesage' => $validator->messages(),
            ]);
        }
        $emloyee = Employee::create($request->all());

        return response()->json([
            'status' => 200,
            'emloyee' =>  $emloyee,
            'message' => 'Tạo nhân viên thành công',
        ]);
    }
    public function createUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'username' => 'required|min:8|unique:users',
            'password' => 'required|min:8',
            're_password' => 'required|min:8',
        ], [
            'email.required' => 'Ô email Không được bỏ trống',
            'email.email' => 'Địa chỉ email không hợp lệ',
            'email.unique' => 'Địa chỉ email đã tồn tại',

            'username.required' => 'Ô username không được bỏ trống',
            'username.min' => 'Ô username tối thiểu 8 ký tự',
            'username.unique' => 'username đã tồn tại',

            'password.required' => 'Ô password không được bỏ trống',
            'password.min' => 'Ô password tối thiểu 8 ký tự',

            're_password.required' => 'Ô re_password không được bỏ trống',
            're_password.min' => 'Ô re_password tối thiểu 8 ký tự',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }
        if ($request->re_password != $request->password) {
            return response()->json([
                'status' => 401,

                'error' => 'Password và nhập lại password không trùng khớp',
            ]);
        } else {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
            ]);

            $emloyee = Employee::find($id);
            $emloyee->user_id = $user->id;
            $emloyee->save();

            return response()->json([
                'status' => 200,
                'username' => $user->username,
                'message' => 'Đăng ký thành công',
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
        $emloyee = Employee::find($id);
        return response()->json([
            'emloyee' => $emloyee,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $emloyee = Employee::find($id);
        return response()->json([
            'emloyee' => $emloyee,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $manageEmloyee)
    {
        $emloyee = Employee::find($manageEmloyee);
        $emloyee = $emloyee->update($request->all());
        return response()->json([
            'status' => 200,
            'emloyee' => $emloyee,
            'message' => 'sửa thành công',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($manageEmloyee)
    {
        $emloyee = Employee::find($manageEmloyee);
        $user = User::where('id', $emloyee->user_id)->first();
        if (empty($user)) {
            $emloyee->delete();
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'xóa thành công',
            ]);
        } else {
            $user->delete();
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'xóa thành công',
            ]);
        }
    }


    public function locTenAZ()
    {
        $emp = Employee::orderBy('ten', 'asc')->paginate(10);
        return response()->json([
            'status' => 200,
            'emp' => $emp,
        ]);
    }
    public function locTenZA()
    {
        $emp = Employee::orderBy('ten', 'desc')->paginate(10);
        return response()->json([
            'status' => 200,
            'emp' => $emp,
        ]);
    }

    public function searchEmp(Request $request)
    {
        $emp = Employee::where('id', 'like', '%' . $request->key . '%')
            ->orWhere('ten', 'like', '%' . $request->key . '%')
            ->orWhere('sdt', 'like', '%' . $request->key . '%')
            ->orWhere('diaChi', 'like', '%' . $request->key . '%')
            ->get();
        return response()->json([
            'status' => 200,
            'emp' => $emp,
        ]);
    }
}
