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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('TenSP');
            $table->integer('Gia');
            $table->integer('soLuong');
            $table->text('Mota');
            $table->string('ctSanPham');
            $table->string('hinh');
            $table->bigInteger('maLoai');
            $table->integer('baoHanh');
            $table->bigInteger('maNCC');
            $table->bigInteger('maNSX');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
