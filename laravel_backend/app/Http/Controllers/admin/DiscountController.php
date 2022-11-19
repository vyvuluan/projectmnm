<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Discount;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class DiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $date = Carbon::today();
        $discount = Discount::where('start', '<', $date)
            ->where('end', '>', $date)
            ->orderBy('created_at', 'desc')->paginate(10);
        return response()->json([
            'status' => 200,
            'discount' =>  $discount,
        ]);
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
        $validator = Validator::make($request->all(), [
            'discount_id' => 'required|unique:discounts',
            'phantram' => 'required|numeric|max:100',
            'dieukien' => 'required|numeric',
            'start' => 'required',
            'end' => 'required',
        ], [
            'discount_id.required' => 'Ô discount_id Không được bỏ trống',
            'discount_id.unique' => 'discount_id đã tồn tại',

            'phantram.required' => 'Ô phantram không được bỏ trống',
            'phantram.numeric' => 'Ô phantram phải là số',
            'phantram.max' => 'Ô phantram có giá trị tối đa là 100',
            'dieukien.required' => 'Ô dieukien không được bỏ trống',
            'dieukien.numeric' => 'Ô dieukien phải là số',

            'start.required' => 'Ô start không được bỏ trống',
            'end.required' => 'Ô end không được bỏ trống',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
            ]);
        }
        $discount = Discount::create($request->all());

        return response()->json([
            'status' => 200,
            'discount' =>  $discount,
            'message' => 'Tạo discount thành công',
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

        $discount = Discount::where('discount_id', $id)->first();
        if (empty($discount)) {
            return response()->json([
                'status' => 400,
                'message' =>  'Không có mã bạn vừa nhập',
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'discount' =>  $discount,
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $discount = Discount::where('discount_id', $id)->first();
        if (empty($discount)) {
            return response()->json([
                'status' => 400,
                'message' =>  'Không có mã bạn vừa nhập',
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'discount' =>  $discount,
            ]);
        }
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
        $validator = Validator::make($request->all(), [
            'discount_id' => 'required',
            'phantram' => 'required|numeric|max:100',
            'dieukien' => 'required|numeric',
            'start' => 'required',
            'end' => 'required',
        ], [
            'discount_id.required' => 'Ô discount_id Không được bỏ trống',

            'phantram.required' => 'Ô phantram không được bỏ trống',
            'phantram.numeric' => 'Ô phantram phải là số',
            'phantram.max' => 'Ô phantram có giá trị tối đa là 100',
            'dieukien.required' => 'Ô dieukien không được bỏ trống',
            'dieukien.numeric' => 'Ô dieukien phải là số',

            'start.required' => 'Ô start không được bỏ trống',
            'end.required' => 'Ô end không được bỏ trống',

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'message' => $validator->messages(),
            ]);
        }

        $discount = Discount::where('discount_id', $id)->delete();
        $discount = Discount::create($request->all());
        return response()->json([
            'status' => 200,
            'discount' => $discount,
            'message' => 'sửa thành công',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $discount = Discount::where('discount_id', $id)->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Xóa thành công',
        ]);
    }
    public function check_discount(Request $request)
    {
        if (isset($request->discount)) {
            $date = Carbon::today();
            $discount = Discount::where('discount_id', $request->discount)
                ->where('start', '<', $date)
                ->where('end', '>', $date)
                ->first();
            if (!empty($discount)) {
                if ($discount->dieukien > $request->tongTien) {
                    return response()->json([
                        'status' => 400,
                        'message' => 'Đơn hàng cần tối thiểu ' . number_format($discount->dieukien, 0, ',', '.') . 'đ'  . ' để áp dụng',
                    ]);
                } else {
                    return response()->json([
                        'status' => 200,
                        'discount' => $discount->phantram,
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'Không có mã giảm giá bạn vừa nhập',
                ]);
            }
        }
    }
    public function ds_discount_tontai()
    {
        $date = Carbon::today();
        $discount = Discount::where('start', '<', $date)
            ->where('end', '>', $date)
            ->get();
        return response()->json([
            'status' => 200,
            'discount' => $discount,
        ]);
    }
}
