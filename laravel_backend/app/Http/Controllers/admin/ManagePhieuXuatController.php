<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PhieuXuat;
use Validator;
class ManagePhieuXuatController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $px = PhieuXuat::orderBy('id','asc')->paginate(10);
        return response()->json([
            'data'=>$px,
        ]);
    }
    public function xemctpx($id)
    {
        $ctpx=PhieuXuat::find($id)->pxct;
        return response()->json([
            'data'=>$ctpx,
        ]);
    }
    public function editpx($id)
    {
        $px = PhieuXuat::find($id);
        if($px)
        {
            return response()->json([
                'status'=>200,
                'loaisp'=>$px,
            ]);
        }
    }
    public function editctpx($mapx,$masp)
    {
        $pxct = PhieuXuat::find($mapx)->pxct;
        return $pxct;
        $data=  $pxct->where('product_id',$masp);
        if($data)
        {
            return response()->json([
                'status'=>200,
                'loaisp'=>$data,
            ]);
        }
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function update(Request $request, $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
