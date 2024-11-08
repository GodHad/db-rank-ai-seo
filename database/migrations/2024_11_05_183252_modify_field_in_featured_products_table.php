<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyFieldInFeaturedProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('featured_products', function (Blueprint $table) {
            $table->text('content', 255)->nullable()->change();
            $table->string('banner', 255)->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('featured_products', function (Blueprint $table) {
            $table->text('content', 255)->nullable(false)->change();
            $table->string('banner', 255)->nullable(false)->change();
        });
    }
}
