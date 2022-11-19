<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Customer;
use App\Models\Employee;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Carbon\Carbon;

class UserController extends Controller
{
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

        // $request->validate([
        //     'email' => 'required|max:255',
        //     'password' => 'required|max:255',
        // ],[
        //     'email.required' => 'Ô email Không được bỏ trống',
        //     'email.max' => 'Ô email tối đa 255 ký tự',

        //     'password.required' => 'Ô password không được bỏ trống',
        //     'password.max' => 'Ô password tối đa 255 ký tự',



        // ]);
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {


            return response()->json([
                'status' => 401,
                'error' => 'Không đúng tài khoản hoặc mật khẩu',
            ]);
        } else {
            if ($user->status == 1) {
                if ($user->role_id == 1) {
                    $cus = Customer::where('user_id', $user->id)->first();
                    $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
                    return response()->json([
                        'status' => 200,
                        'username' => $user->username,
                        'fullname' => $cus->ten,
                        'token' => $token,

                        'message' => 'Đăng nhập thành công',
                    ]);
                } else {
                    return response()->json([
                        'status' => 402,
                        'message' => 'Tài khoản bạn đang có quyền quản lý ko có quyền đăng nhập ở trang khách hàng',
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 402,
                    'message' => 'Tài khoản đã bị khóa',
                ]);
            }
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
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'fullname' => 'required|min:8',
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

            'fullname.required' => 'Ô fullname không được bỏ trống',
            'fullname.min' => 'Ô fullname tối thiểu 8 ký tự',

            'password.required' => 'Ô password không được bỏ trống',
            'password.min' => 'Ô password tối thiểu 8 ký tự',

            're_password.required' => 'Ô re_password không được bỏ trống',
            're_password.min' => 'Ô re_password thiểu đa 8 ký tự',
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
            ]);


            $token = $user->createToken($user->email . '_Token', [''])->plainTextToken;
            $customer = new Customer();
            $customer->user_id = $user->id;
            $customer->ten = $request->fullname;
            $customer->save();
            return response()->json([
                'status' => 200,
                'username' => $user->username,
                'fullname' => $request->fullname,
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
            'message' => 'Đăng xuất thành công',
        ]);
    }



    public function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }

        return response()->json([
            'url' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl(),
        ]);
        //return Socialite::driver($provider)->stateless()->redirect();
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
        $token = $userCreated->createToken($user->getEmail() . '_Token')->plainTextToken;
        $check = Customer::where('user_id', $userCreated->id)->first();
        if (empty($check)) {
            $customer = new Customer();
            $customer->user_id = $userCreated->id;
            $customer->ten = $user->getName();
            $customer->save();
        }


        return Redirect::to('http://localhost:3000?token=' . $token . '&email=' . $user->email . '&fullname=' . $user->getName());
        // return response()->json([
        // 'status' => 200,
        // 'message' => 'Đăng nhập thành công',
        // 'userCreated' =>$userCreated ,
        // 'Access-Token' => $token]);
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
        if (auth('sanctum')->check()) {
            return response()->json([
                'status' => 200,
                'data_user' => auth('sanctum')->user(),
                'data_customer' => auth('sanctum')->user()->customer,
            ]);
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function updateUser(Request $request)
    {
        // $request->validate([
        //     'ten' => 'required|max:255',
        //     'ngaySinh' => 'required',
        //     'diaChi' => 'required|max:255',
        //     'sdt' => 'required|max:1000000000|numeric',
        //     'gioiTinh' => 'required|max:1|numeric',

        // ],[
        //     'ten.required' => 'Ô Tên Không được bỏ trống',
        //     'ten.max' => 'Ô Tên tối đa 255 ký tự',
        //     'ngaySinh.required' => 'Ô ngày sinh không được bỏ trống',
        //     //'ngaySinh.strtotime' => 'Ô ngày sinh không đúng định dạng',
        //     'diaChi.required' => 'Ô địa chỉ không được bỏ trống',
        //     'diaChi.max' => 'Ô địa chỉ tối đa 255 ký tự',

        //     'sdt.required' => 'Ô số điện thoại không được bỏ trống',
        //     'sdt.max' => 'Ô số điện thoại tối đa 11 ký tự',
        //     'sdt.numeric' => 'Ô số điện thoại phải là số',

        //     'gioiTinh.required' => 'Ô giới tính không được bỏ trống',
        //     'gioiTinh.max' => 'Ô giới tính tối đa 1 ký tự',
        //     'gioiTinh.numeric' => 'Ô giới tính phải là số',

        // ]);

        $validator = Validator::make($request->all(), [
            'ten' => 'required|max:255',
            'ngaySinh' => 'required',
            'diaChi' => 'required|max:255',
            'sdt' => 'required|max:1000000000|numeric',
            'gioiTinh' => 'required|max:1|numeric',
        ], [
            'ten.required' => 'Ô Tên Không được bỏ trống',
            'ten.max' => 'Ô Tên tối đa 255 ký tự',
            'ngaySinh.required' => 'Ô ngày sinh không được bỏ trống',
            //'ngaySinh.strtotime' => 'Ô ngày sinh không đúng định dạng',
            'diaChi.required' => 'Ô địa chỉ không được bỏ trống',
            'diaChi.max' => 'Ô địa chỉ tối đa 255 ký tự',

            'sdt.required' => 'Ô số điện thoại không được bỏ trống',
            'sdt.max' => 'Ô số điện thoại tối đa 10 số',
            'sdt.numeric' => 'Ô số điện thoại phải là số',

            'gioiTinh.required' => 'Ô giới tính không được bỏ trống',
            'gioiTinh.max' => 'Ô giới tính tối đa 1 ký tự',
            'gioiTinh.numeric' => 'Ô giới tính phải là số',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
            ]);
        }

        if (auth('sanctum')->check()) {

            $customer = Customer::find(auth('sanctum')->user()->customer->id);

            $customer->ten = $request->ten;
            $customer->ngaySinh = Carbon::createFromFormat('Y-m-d', $request->ngaySinh)->format('Y-m-d');
            // date('Y-m-d', strtotime($request->ngaySinh));


            $customer->diaChi = $request->diaChi;

            $customer->sdt = $request->sdt;
            $customer->gioiTinh = $request->gioiTinh;
            $customer->save();
            return response()->json([
                'status' => 200,
                'message' => 'update thành công',
            ]);
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
    public function changePass(Request $request)
    {
        // $request->validate([
        //     'password' => 'required|max:255',
        //     're_password' => 'required|max:255',
        // ],[
        //     'password.required' => 'Ô password Không được bỏ trống',
        //     'password.max' => 'Ô password tối đa 255 ký tự',

        //     're_password.required' => 'Ô re-password không được bỏ trống',
        //     're_password.max' => 'Ô re-password tối đa 255 ký tự',



        // ]);
        $validator = Validator::make($request->all(), [
            'password_old' => 'max:255',
            'password' => 'required|max:255',
            're_password' => 'required|max:255',
        ], [
            // 'password_old.required' => 'Ô password Không được bỏ trống',
            'password_old.max' => 'Ô password tối đa 255 ký tự',

            'password.required' => 'Ô password Không được bỏ trống',
            'password.max' => 'Ô password tối đa 255 ký tự',

            're_password.required' => 'Ô re_password không được bỏ trống',
            're_password.max' => 'Ô re_password tối đa 255 ký tự',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
            ]);
        }

        if (auth('sanctum')->check()) {
            $password = $request->password;
            $re_password = $request->re_password;
            $password_old = $request->password_old;
            $user = User::find(auth('sanctum')->user()->id);
            if ($password_old == null) {
                if ($password != $re_password) {
                    return response()->json([
                        'status' => 401,
                        'message' => 'password và nhập lại password không trùng khớp',
                    ]);
                } else {
                    $user = User::find(auth('sanctum')->user()->id);

                    $user->password = Hash::make($password);
                    $user->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'update thành công',
                    ]);
                }
            } else {
                if (!Hash::check($request->password_old, $user->password)) {
                    return response()->json([
                        'status' => 401,
                        'message' => 'password cũ không chính xác',
                    ]);
                } else {
                    if ($password != $re_password) {
                        return response()->json([
                            'status' => 401,
                            'message' => 'password và nhập lại password không trùng khớp',
                        ]);
                    } else {
                        $user = User::find(auth('sanctum')->user()->id);

                        $user->password = Hash::make($password);
                        $user->save();
                        return response()->json([
                            'status' => 200,
                            'message' => 'update thành công',
                        ]);
                    }
                }
            }
        } else {
            return response()->json([

                'message' => 'Chưa đăng nhập',
            ]);
        }
    }
}
