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
            ->orderBy('id', 'desc')
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
                'status' => 400,
                'error' => 'không tồn tại tài khoản',
            ]);
        } else {
            if (!$user || !Hash::check($request->password, $user->password)) {


                return response()->json([
                    'status' => 400,
                    'error' => 'Tài khoản hoặc mật khẩu không chính xác',
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
                            'status' => 401,
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 401,
                        'error' => 'Tài khoản đã bị khóa',
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
            'role_id' => 'required|max:4|numeric|min:2',
            'status' => 'required',
        ], [
            'email.required' => 'Ô email Không được bỏ trống',
            'email.email' => 'Địa chỉ email không hợp lệ',

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

        if ($user->email == $request->email) {
            $user = $user->update($request->all());
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'sửa thành công',
            ]);
        } else {
            $check_email = User::where('email', $request->email)->count();
            if ($check_email != 0) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Email đã tồn tại',
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
            'email' => 'required|email',
            'status' => 'required',
        ], [
            'email.required' => 'Ô email Không được bỏ trống',
            'email.email' => 'Địa chỉ email không hợp lệ',

            'status.required' => 'Ô status không được bỏ trống',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'error' => $validator->messages(),
            ]);
        }
        $user = User::find($user_id);

        if ($user->email == $request->email) {
            $user = $user->update($request->all());
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'sửa thành công',
            ]);
        } else {
            $check_email = User::where('email', $request->email)->count();
            if ($check_email != 0) {
                return response()->json([
                    'status' => 400,
                    'message' => 'Email đã tồn tại',
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
