<?php

namespace App\Http\Controllers\DoAn;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ncc;
use App\Http\Resources\NccResource;

class NccController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //return Ncc::all();
        return NccResource::collection(Ncc::paginate(10));
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
        $Ncc = Ncc::create($request->all());
        return new NccResource($Ncc);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show( Ncc $Ncc)
    {

        return new NccResource($Ncc);
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
    public function update(Request $request,Ncc $Ncc)
    {
        $Ncc->update($request->all());
        return new NccResource($Ncc);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ncc $Ncc)
    {

        $Ncc->delete();
    }
}
