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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->char('o_kode');
            $table->integer('o_quantity');
            $table->integer('o_total_bayar');
            $table->boolean('o_status');
            $table->date('o_date');
            $table->time('o_time');
            $table->unsignedBigInteger('customer_id');
            $table->timestamps();

            // relasi one to many
            $table->foreign('customer_id')->references('id')->on('customers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
