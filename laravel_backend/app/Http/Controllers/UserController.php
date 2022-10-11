<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        
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
            else
            {
                $token= $user->createToken($user->email.'_Token',[''])->plainTextToken;
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
    public function index()
    {
        return response()->json([
            'data' => User::all(),
        ]);
    }
    public function register(Request $request)
    {   
        if(empty($request->role_id))
        {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
        }
        else
        {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role_id' => $request->role_id,
            ]);
        }
        
        if($user->role_id == 2) //admin
        {
            $token= $user->createToken($user->email.'_AdminToken',['server:admin'])->plainTextToken;
        }
        else
        {
            $token= $user->createToken($user->email.'_Token',[''])->plainTextToken;
        }
        $customer = new Customer();
        $customer->user_id = $user->id;
        $customer->save();
        return response()->json([
            'status' => 200,
            'username' => $user->username,
            'token' => $token,
            'message' => 'registered successfully',
        ]);
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
    
}
