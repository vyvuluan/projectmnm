<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Customer;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|max:255',
            'password' => 'required|max:255',
        ],[
            'email.required' => 'Ô email Không được bỏ trống',
            'email.max' => 'Ô email tối đa 255 ký tự',
            
            'password.required' => 'Ô password không được bỏ trống',
            'password.max' => 'Ô password tối đa 255 ký tự',

            
            
        ]);
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password) ) {


            return response()->json([
                'status' => 401,
                'error' => 'Không đúng tài khoản hoặc mật khẩu',
            ]);
        }
        else
        {
            if($user->role_id == 1)
            {
                $token= $user->createToken($user->email.'_Token',[''])->plainTextToken;
            }
            return response()->json([
                'status' => 200,
                'username' => $user->username,
                'token' => $token,
                'message' => 'Đăng nhập thành công',
            ]);
        }
    }
    public function index()
    {
        return response()->json([
            'data' => User::all(),
        ]);
    }
    public function register(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:users',
            'username' => 'required|max:255|unique:users',
            'password' => 'required|max:255',
            're_password' => 'required|max:255',
        ],[
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
        if($request->re_password != $request->password)
        {
            return response()->json([
                'status' => 401,
                'error' => 'Password và nhập lại password không trùng khớp',
            ]);
        }
        else
        {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            
    
                $token= $user->createToken($user->email.'_Token',[''])->plainTextToken;
                $customer = new Customer();
                $customer->user_id = $user->id;
                $customer->save();
                return response()->json([
                    'status' => 200,
                    'username' => $user->username,
                    'token' => $token,
                    'message' => 'Đăng ký thành công',
                ]);
        }
    }
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'logout successfully',
        ]);
    }



    public function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }

        return Socialite::driver($provider)->stateless()->redirect();
    }

    /**
     * Obtain the user information from Provider.
     *
     * @param $provider
     * @return JsonResponse
     */
    public function handleProviderCallback($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        try {
            $user = Socialite::driver($provider)->stateless()->user();
        } catch (ClientException $exception) {
            return response()->json(['error' => 'Invalid credentials provided.'], 422);
        }

        $userCreated = User::firstOrCreate(
            [
                'email' => $user->getEmail()
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->getName(),
                'status' => true,
            ]
        );
        $userCreated->providers()->updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $user->getId(),
            ],
            [
                'avatar' => $user->getAvatar()
            ]
        );
        $token = $userCreated->createToken($user->getEmail() .'_Token')->plainTextToken;

        return response()->json([
        'status' => 200,
        'message' => 'logout successfully',
        'userCreated' =>$userCreated ,
        'Access-Token' => $token]);
    }

    /**
     * @param $provider
     * @return JsonResponse
     */
    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['facebook', 'github', 'google'])) {
            return response()->json(['error' => 'Please login using facebook, github or google'], 422);
        }
    }
    public function detailUser()
    {
        if(auth('sanctum')->check())
        {
            return response()->json([
                'data_user' => auth('sanctum')->user(),
                'data_customer' => auth('sanctum')->user()->customer,
            ]);
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function updateUser(Request $request)
    {
        $request->validate([
            'ten' => 'required|max:255',
            'ngaySinh' => 'required',
            'diaChi' => 'required|max:255',
            'sdt' => 'required|max:1000000000|numeric',
            'gioiTinh' => 'required|max:1|numeric',

        ],[
            'ten.required' => 'Ô Tên Không được bỏ trống',
            'ten.max' => 'Ô Tên tối đa 255 ký tự',
            'ngaySinh.required' => 'Ô ngày sinh không được bỏ trống',
            //'ngaySinh.strtotime' => 'Ô ngày sinh không đúng định dạng',
            'diaChi.required' => 'Ô địa chỉ không được bỏ trống',
            'diaChi.max' => 'Ô địa chỉ tối đa 255 ký tự',

            'sdt.required' => 'Ô số điện thoại không được bỏ trống',
            'sdt.max' => 'Ô số điện thoại tối đa 11 ký tự',
            'sdt.numeric' => 'Ô số điện thoại phải là số',

            'gioiTinh.required' => 'Ô giới tính không được bỏ trống',
            'gioiTinh.max' => 'Ô giới tính tối đa 1 ký tự',
            'gioiTinh.numeric' => 'Ô giới tính phải là số',
            
        ]);
        if(auth('sanctum')->check())
        {
            $customer = Customer::find(auth('sanctum')->user()->id);
            
            $customer->ten = $request->ten;
            $customer->ngaySinh = date('Y-m-d', strtotime($request->ngaySinh));

            $customer->diaChi = $request->diaChi;

            $customer->sdt = $request->sdt;
            $customer->gioiTinh = $request->gioiTinh;
            $customer->save();
            return response()->json([
                'message' => 'update thành công',
            ]);
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function changePass(Request $request)
    {
        $request->validate([
            'password' => 'required|max:255',
            're_password' => 'required|max:255',
        ],[
            'password.required' => 'Ô password Không được bỏ trống',
            'password.max' => 'Ô password tối đa 255 ký tự',
            
            're_password.required' => 'Ô re-password không được bỏ trống',
            're_password.max' => 'Ô re-password tối đa 255 ký tự',

            
            
        ]);
        if(auth('sanctum')->check())
        {
            $password = $request->password;
            $re_password = $request->re_password;
            if($password != $re_password)
            {
                return response()->json([
                    'message' => 'password và nhập lại password không trùng khớp',
                ]);
            }
            else
            {
                $user = User::find(auth('sanctum')->user()->id);
            
                $user->password = Hash::make($password);
                $user->save();
                return response()->json([
                    'message' => 'update thành công',
                ]);
            }
           
        }
        else
        {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }

}
