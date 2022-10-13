<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Nsx;
use App\Http\Resources\NsxResource;
use Illuminate\Support\Facades\DB;

class NsxController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Nsx::all();
        // return NsxResource::collection(Nsx::paginate());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'TenSP' => 'required',
        //     'Gia' => 'required',
        //     'Mota' => 'required',
        // ]);
        $Nsx = Nsx::create($request->all());
        return new NsxResource($Nsx);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Nsx $Nsx)
    {

        return new NsxResource($Nsx);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,Nsx $Nsx)
    {
        $Nsx->update($request->all());
        return new NsxResource($Nsx);

        // $data = $request->all();
        // $Nsx = Nsx::find($id);
        // $Nsx ->tenNSX = $data['tenNSX'];
        // $Nsx ->quocGia = $data['quocGia'];
        // $Nsx ->save();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Nsx $Nsx)
    {
        $Nsx->delete();
        return response()->json([
            'message' => 'expense deleted'
        ]);
    }
}
