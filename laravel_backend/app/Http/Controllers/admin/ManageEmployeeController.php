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
        $emloyee = Employee::create($request->all());

        return response()->json([
            'status' => 200,
            'username' =>  $emloyee,
            'message' => 'Tạo nhân viên thành công',
        ]);
    }
    public function createUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'username' => 'required|max:255|unique:users',
            'password' => 'required|max:255',
            're_password' => 'required|max:255',
        ], [
            'email.required' => 'Ô email Không được bỏ trống',
            'email.email' => 'Địa chỉ email không hợp lệ',
            'email.unique' => 'Địa chỉ email đã tồn tại',

            'username.required' => 'Ô username không được bỏ trống',
            'username.max' => 'Ô username tối đa 255 ký tự',
            'username.unique' => 'username đã tồn tại',

            'password.required' => 'Ô password không được bỏ trống',
            'password.max' => 'Ô password tối đa 255 ký tự',

            're_password.required' => 'Ô re_password không được bỏ trống',
            're_password.max' => 'Ô re_password tối đa 255 ký tự',
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
        $user = User::where('id', $emloyee->user_id)->delete();
        return response()->json([
            'status' => 200,
            'user' => $user,
            'message' => 'xóa thành công',
        ]);
    }
}
