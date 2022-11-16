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
        Schema::create('nccs', function (Blueprint $table) {
            $table->id();
            // $table->bigInteger('maNSX');
            $table->string('tenNCC');
            $table->string('diaChi');
            $table->string('sdt',10);
          
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
        Schema::dropIfExists('nccs');
    }
};
