<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('user_vendor', function (Blueprint $table) {
            $table->unique('user_id');    // Ensure user_id is unique
            $table->unique('vendor_id');  // Ensure vendor_id is unique
        });
    }

    public function down()
    {
        Schema::table('user_vendor', function (Blueprint $table) {
            $table->dropUnique(['user_id']);    // Drop the unique constraint on user_id
            $table->dropUnique(['vendor_id']);  // Drop the unique constraint on vendor_id
        });
    }
};
