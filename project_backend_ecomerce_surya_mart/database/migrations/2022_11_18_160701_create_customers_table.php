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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('c_fullname', 100);
            $table->string('c_email')->unique();
            $table->char('c_notelp', 17);
            $table->string('c_kecamatan');
            $table->string('c_desa');
            $table->string('c_dusun');
            $table->string('c_kodepos');
            $table->text('c_detail_alamat');
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
        Schema::dropIfExists('customers');
    }
};
