<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
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
    public function createUser(Request $request,$id)
    {
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
            'message' => 'registered successfully',
        ]);
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
             'user' => $user,
            'message' => 'xóa thành công',
        ]);
    }
}
