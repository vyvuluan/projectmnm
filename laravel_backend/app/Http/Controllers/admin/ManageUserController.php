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
        $users = User::orderBy('id', 'asc')->paginate(10);
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
                // $token= $user->createToken($user->email.'_Token')->plainTextToken;
            }
        }
    }
}
