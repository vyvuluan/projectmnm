<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class ManageUserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id','asc')->paginate(10);
        return response()->json([
            'users'=>$users,
        ]);
    }
    
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if(empty($user))
        {
            return response()->json([
                'status' => 401,
                'error' => 'không tồn tại tài khoản',
            ]);
        }
        else
        {
            if (! $user || ! Hash::check($request->password, $user->password) ) {


                return response()->json([
                    'status' => 401,
                    'message' => 'error',
                ]);
            }
            else
            {
                if($user->role_id == 2) //admin
                {
                    $token= $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
                }
                else if($user->role_id == 3) //thủ kho
                {
                    $token= $user->createToken($user->email.'_AdminToken',['server:thukho'])->plainTextToken;
                }
                else if($user->role_id == 4) //nhân viên bán hàng
                {
                    $token= $user->createToken($user->email.'_AdminToken',['server:nhanvien'])->plainTextToken;
                }
                // $token= $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                    'message' => 'login successfully',
                ]);
            }
        }
        
    }
}
