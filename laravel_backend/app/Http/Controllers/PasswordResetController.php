<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Support\Facades\Hash;

class PasswordResetController extends Controller
{
    /**
     * Create token password reset.
     *
     * @param  ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function sendMail(Request $request)
    {
        $user = User::where('email', $request->email)->firstOrFail();
        $passwordReset = PasswordReset::updateOrCreate([
            'email' => $user->email,
        ], [
            // 'token' => $user->createToken('token-name')->plainTextToken,
            'token' => Str::random(60),
        ]);
        if ($passwordReset) {
            $user->notify(new ResetPasswordRequest($passwordReset->token));
        }

        return response()->json([
            'message' => 'Chúng tôi đã gửi cho bạn một email để reset lại mật khẩu vui lòng kiểm tra'
        ]);
    }

    public function reset(Request $request, $token)
    {

        $passwordReset = PasswordReset::where('token', $token)->firstOrFail();
        if (Carbon::parse($passwordReset->updated_at)->addMinutes(720)->isPast()) {
            $passwordReset->delete();

            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 422);
        }
        // $user = User::where('email', $passwordReset->email)->firstOrFail();
        $password = Hash::make($request->password);
        $updatePasswordUser = User::where('email', $passwordReset->email)
            ->update(['password' => $password]);
        // $updatePasswordUser = $user->update($password);
        PasswordReset::where('token', $token)->delete();
        // $passwordReset->delete();

        return response()->json([
            'success' => $updatePasswordUser,
        ]);
    }
}
