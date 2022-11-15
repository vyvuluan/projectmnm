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
        DB::unprepared(
            // PROC lấy comment của sản phẩm
            '
            CREATE PROCEDURE get_allcomment(IN id INT(15))
            BEGIN
                select product_id,customer_id,comment,comments.created_at,ten from comments,customers where comments.product_id = id and customers.id=comments.customer_id;
            END
           '
        );
        DB::unprepared(
            // PROC Thêm comment
            '
            CREATE PROCEDURE add_comment(IN maSP INT(15),IN maKH INT(15),IN comment VARCHAR(255))
            BEGIN

                INSERT INTO comments(product_id,customer_id,comment,created_at,updated_at) VALUES (maSP,maKH,comment,NOW(),NOW());
            END'
        );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('procedure');
    }
};
