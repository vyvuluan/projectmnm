<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PhieuXuat;
use App\Models\Product;
use Validator;
use Illuminate\Support\Facades\DB;
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
        $validator = Validator::make($request->all(),[
            'employee_id' =>'required|numeric|max:10',
            'status' =>'required|numeric|max:10',
            'pt_ThanhToan' =>'required|max:10',
            'diaChi' =>'required',
            'tongTien' =>'required|numeric'
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $px = PhieuXuat::find($id);
            if($px)
            {
                $px->employee_id= $request->employee_id;
                $px->status= $request->status;
                $px->pt_ThanhToan= $request->pt_ThanhToan;
                $px->diaChi= $request->diaChi;
                $px->tongTien= $request->tongTien;
                $px->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'Cập nhật phiếu thành công ',
                ]);
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Không tìm thấy phiếu xuất',
                ]);

            }
        }
    }
    public function checksl($slgio,$slupdate,$slkho)
    {
        $temp = $slgio - $slupdate;
        if ($temp+$slkho>0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public function updateCtpx(Request $request,$mapx,$maspct)
    {
        $validator = Validator::make($request->all(),[
            'product_id'=>'required|numeric',
            'soluong' =>'required|numeric',
        ]);
        if($validator->fails())
        {
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        else
        {
            $pxcts = PhieuXuat::find($mapx)->pxct;
            $data=  $pxcts->where('product_id',$maspct)->first();
            if($data)
            {
                $checksp = Product::find($request->product_id);
                if($checksp)
                {
                    if($checksp->id==$maspct)
                    {
                       
                        $slgio = $data->soluong;
                        $slupdate = $request->soluong;
                        $slkho = $checksp->soLuongSP;
                        if($this->checksl($slgio,$slupdate,$slkho))
                        {    
                            //$data->px_id=$mapx;                 
                            $data->product_id = $checksp->id;
                            $data->soluong = $slupdate;
                            $data->gia = $checksp->gia;
                            $checksp->soLuongSP = ($slgio - $slupdate)+$slkho;
                            $checksp->save();
                            DB::table('ct_phieu_xuats')->where('px_id', $mapx)->where('product_id', $maspct)
                            ->update(['product_id' => $checksp->id,'soluong' => $slupdate,'gia' =>  $checksp->gia]);
                            return response()->json([
                                'status'=>200,
                                'message'=>'Cập nhật Chi tiết phiếu Xuất thành công ',
                            ]);
                        }
                        else
                        {
                            return response()->json([
                                'status'=>402,
                                'message'=>'Kho không còn đủ hàng',
                            ]);
                        }
                    }
                    else
                    {
                        foreach($pxcts as $pxct)
                        {
                            if($pxct->product_id==$request->product_id)
                            {
                                return response()->json([
                                    'status'=>402,
                                    'message'=>'Sản phẩm đã tồn tại trong giỏ hàng',
                                ]);
                            }
                        }
                        $slgio = $data->soluong;
                        $slupdate = $request->soluong;
                        $slkho = $checksp->soLuongSP;
                        if($slkho>$slupdate)
                        {                     
                            // $data->product_id = $checksp->product_id;
                            $spgio = Product::find($maspct);
                            $spgio->soLuongSP += $slgio;
                            $spgio->save();
                            $checksp->soLuongSP -= $slupdate ;
                            $checksp->save();
                            DB::table('ct_phieu_xuats')->where('px_id', $mapx)->where('product_id', $maspct)
                            ->update(['product_id' => $checksp->id,'soluong' => $slupdate,'gia' =>  $checksp->gia]);
                            return response()->json([
                                'status'=>200,
                                'message'=>'Cập nhật Chi tiết phiếu Xuất thành công ',
                            ]);
                        }
                        else
                        {
                            return response()->json([
                                'status'=>402,
                                'message'=>'Kho không còn đủ hàng',
                            ]);
                        }

                    }
                }
                else
                {
                    return response()->json([
                        'status'=>401,
                        'message'=>' Thông tin cập nhật không chính xác',
                    ]);
                }

              
            }
            else
            {
                return response()->json([
                    'status'=>404,
                    'message'=>'Không tìm thấy Chi tiết phiếu xuất',
                ]);

            }
        }
    }
   

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
    }
}
