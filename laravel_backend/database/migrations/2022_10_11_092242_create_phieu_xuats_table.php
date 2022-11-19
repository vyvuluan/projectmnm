<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phieu_xuats', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('employee_id')->nullable()->unsigned();
            $table->bigInteger('customer_id')->nullable()->unsigned();
            $table->integer('status')->length(1);
            $table->string('pt_ThanhToan');
            $table->string('tenKH');
            $table->string('sdt',10);
            $table->string('diaChi');
            $table->string('payment_id')->nullable();
            $table->integer('discount')->default(0);
            $table->bigInteger('tongTien')->nullable();
            $table->timestamps();
            $table->foreign('employee_id')->references('id')->on('employees')->onDelete('cascade');
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phieu_xuats');
    }
};
