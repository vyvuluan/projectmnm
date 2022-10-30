<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\Contact;
use Illuminate\Support\Facades\Validator;

class ContactContrller extends Controller
{
    public function store(Request $request)
    {
        // $request->validate([
        //     'message' => 'required|max:255',
        // ],[
        //     'message.required' => 'Ô message không được bỏ trông',
        //     'message.max' => 'Ô message tối đa 255 ký tự',
        // ]);

        $validator = Validator::make($request->all(),[
            'message' => 'required|max:255',
        ],[
            'message.required' => 'Ô message không được bỏ trông',
            'message.max' => 'Ô message tối đa 255 ký tự',
        ]);

        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        if(auth('sanctum')->check())
        {
            $contact = new Contact();
            $contact->id = auth('sanctum')->user()->customer->id;
            $contact->message  = $request->message;
            $contact->save();

            return response()->json([
                'status' => 200,
                'message' => 'Thành công',
                'contact' => $contact->message,
            ]);
        }
        else
        {
            return response()->json([

                'message' => 'Cần đăng nhập',
            ]);
        }
    }

}
