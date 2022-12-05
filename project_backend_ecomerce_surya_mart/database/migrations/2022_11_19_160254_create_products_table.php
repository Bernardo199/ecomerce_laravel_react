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
            $table->string('p_image');
            $table->char('p_kode', 13)->unique();
            $table->string('p_name');
            $table->integer('p_price');
            $table->integer('p_stock');
            $table->string('p_unit');
            $table->unsignedBigInteger('category_id');
            $table->timestamps();

            // relasi one to many
            $table->foreign('category_id')->references('id')->on('categories');
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
