<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ManageUserController extends Controller
{
    public function index()
    {
        $users = User::where('role_id', 2)
            ->orWhere('role_id', 3)
            ->orWhere('role_id', 4)
            ->orderBy('id', 'asc')
            ->paginate(10);
        return response()->json([
            'users' => $users,
        ]);
    }

    public function index2()
    {
        $users = User::where('role_id', 1)
            ->paginate(10);
        return response()->json([
            'users' => $users,
        ]);
    }


    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:255|email',
            'password' => 'required|max:255',
        ], [
            //'email.required' => 'Ô email Không được bỏ trống',
            'email.max' => 'Ô email tối đa 255 ký tự',
            'email.email' => 'Ô email không đúng định dạng',
            'required' => 'ô :attribute không được bỏ trống',
            //'password.required' => 'Ô password không được bỏ trống',
            'password.max' => 'Ô password tối đa 255 ký tự',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }

        $user = User::where('email', $request->email)->first();
        if (empty($user)) {
            return response()->json([
                'status' => 401,
                'error' => 'không tồn tại tài khoản',
            ]);
        } else {
            if (!$user || !Hash::check($request->password, $user->password)) {


                return response()->json([
                    'status' => 401,
                    'message' => 'Tài khoản hoặc mật khẩu không chính xác',
                ]);
            } else {
                if ($user->status == 1) {
                    if ($user->role_id == 2) //admin
                    {
                        $token = $user->createToken($user->email . '_AdminToken', ['server:admin'])->plainTextToken;
                        return response()->json([
                            'status' => 200,
                            'username' => $user->username,
                            'token' => $token,
                            'role_id' => $user->role_id,
                            'message' => 'Đăng nhập thành công',
                        ]);
                    } else if ($user->role_id == 3) //thủ kho
                    {
                        $token = $user->createToken($user->email . '_AdminToken', ['server:thukho'])->plainTextToken;
                        return response()->json([
                            'status' => 200,
                            'username' => $user->username,
                            'token' => $token,
                            'role_id' => $user->role_id,
                            'message' => 'Đăng nhập thành công',
                        ]);
                    } else if ($user->role_id == 4) //nhân viên bán hàng
                    {
                        $token = $user->createToken($user->email . '_AdminToken', ['server:nhanvien'])->plainTextToken;
                        return response()->json([
                            'status' => 200,
                            'username' => $user->username,
                            'token' => $token,
                            'role_id' => $user->role_id,
                            'message' => 'Đăng nhập thành công',
                        ]);
                    } else {
                        return response()->json([

                            'error' => 'Bạn không có quyền đăng nhập vào chức năng này',
                            'status' => 404,
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 402,
                        'message' => 'Tài khoản đã bị khóa',
                    ]);
                }

                // $token= $user->createToken($user->email.'_Token')->plainTextToken;
            }
        }
    }
    public function edit($user_id)
    {
        $user = User::find($user_id);
        if (empty($user)) {
            return response()->json([
                'status' => 404,
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'user' => $user,
            ]);
        }
    }
    public function update(Request $request, $user_id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'username' => 'required|max:255',
            'role_id' => 'required|max:4|numeric|min:2',
            'status' => 'required',
        ], [
            'email.required' => 'Ô email Không được bỏ trống',
            'email.email' => 'Địa chỉ email không hợp lệ',


            'username.required' => 'Ô username không được bỏ trống',
            'username.max' => 'Ô username tối đa 255 ký tự',

            'role_id.required' => 'Ô role_id không được bỏ trống',
            'role_id.max' => 'Ô role_id có giá trị từ 2 đến 4',

            'role_id.numeric' => 'Ô role_id phải là số',
            'role_id.min' => 'Ô role_id có giá trị từ 2 đến 4',

            'status.required' => 'Ô status không được bỏ trống',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }
        $user = User::find($user_id);

        // $check_email = User::where('email',$request->email)->where('id',$user_id)->count();
        // $check_username = User::where('username',$request->username)->where('id',$user_id)->count();

        if ($user->email == $request->email && $user->username = $request->username) {
            $user = $user->update($request->all());
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'sửa thành công',
            ]);
        }
        $check_email = User::where('email', $request->email)->count();
        $check_username = User::where('username', $request->username)->count();
        // if($check_email != 0 && $check_username != 0)
        // {
        //     $user = $user->update($request->all());
        //     return response()->json([
        //         'status' => 200,
        //         'user' => $user,
        //         'message' => 'sửa thành công',
        //     ]);
        // }
        // else if($check_email == 0 && $check_username != 0)
        // {
        //     $user->username = $request->username ;
        //     $user->role_id = $request->role_id ;
        //     $user->status = $request->status ;
        //     $user->save() ;
        //     return response()->json([
        //         'status' => 200,
        //         'user' => $user,
        //         'message' => 'sửa thành công',
        //     ]);
        // }
        // else if($check_email != 0 && $check_username == 0)
        // {
        //     $user->email = $request->email ;
        //     $user->role_id = $request->role_id ;
        //     $user->status = $request->status ;
        //     $user->save() ;
        //     return response()->json([
        //         'status' => 200,
        //         'user' => $user,
        //         'message' => 'sửa thành công',
        //     ]);
        // }
        // else
        // {

        // }

        // if ($request->email != $user->email && $request->username != $user->username)
        // {
        //     $check = User::where('email',$request->email)->count();
        // }
        // if($request->email != $user->email)
        // {

        // }
        // else if($request->username != $user->username)
        // {

        // }
        // else
        // {

        // }

        if ($check_email != 0 || $check_username != 0) {

            return response()->json([
                'status' => 400,
                'message' => 'Username hoặc email đã tồn tại',
            ]);
        } else {
            $user = $user->update($request->all());
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'sửa thành công',
            ]);
        }
    }
    public function destroy($user_id)
    {

        $emloyee = User::find($user_id)->employee;
        $emloyee->user_id = null;
        $emloyee->save();
        $user = User::where('id', $user_id)->delete();
        // $user = User::where('id', $emloyee->user_id)->delete();
        return response()->json([
            'status' => 200,
            'message' => 'xóa thành công',
        ]);
    }

    public function update_tk_kh(Request $request, $user_id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'username' => 'required|max:255|unique:users',
            'status' => 'required',
        ], [
            'email.required' => 'Ô email Không được bỏ trống',
            'email.email' => 'Địa chỉ email không hợp lệ',
            'email.unique' => 'Địa chỉ email đã tồn tại',

            'username.required' => 'Ô username không được bỏ trống',
            'username.max' => 'Ô username tối đa 255 ký tự',
            'username.unique' => 'username đã tồn tại',

            'status.required' => 'Ô status không được bỏ trống',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }
        $user = User::find($user_id);
        $user = $user->update($request->all());
        return response()->json([
            'status' => 200,
            'user' => $user,
            'message' => 'sửa thành công',
        ]);
    }

    public function destroy_user_customer($user_id)
    {

        $user = User::where('id', $user_id)->delete();
        // $user = User::where('id', $emloyee->user_id)->delete();
        return response()->json([
            'status' => 200,
            'message' => 'xóa thành công',
        ]);
    }
}
