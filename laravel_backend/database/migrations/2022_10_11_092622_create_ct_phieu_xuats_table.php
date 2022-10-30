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
        Schema::create('ct_phieu_xuats', function (Blueprint $table) {
            $table->bigInteger('px_id')->unsigned();
            $table->bigInteger('product_id')->unsigned();
            $table->integer('soluong');
            $table->integer('gia');
            $table->timestamps();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('px_id')->references('id')->on('phieu_xuats')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ct_phieu_xuats');
    }
};
