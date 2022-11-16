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
            $table->string('tenSP');
            $table->integer('gia');
            $table->integer('soLuongSP')->default(0);
            $table->longText('moTa');
            $table->string('ctSanPham');
            $table->string('hinh');
            $table->bigInteger('maLoai')->unsigned();
            $table->integer('baoHanh');
            $table->bigInteger('maNCC')->unsigned();
            $table->bigInteger('maNSX')->unsigned();
            $table->timestamps();
            $table->foreign('maNCC')->references('id')->on('nccs')->onDelete('cascade');
            $table->foreign('maLoai')->references('id')->on('loaisps')->onDelete('cascade');
            $table->foreign('maNSX')->references('id')->on('nsxes')->onDelete('cascade');
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
