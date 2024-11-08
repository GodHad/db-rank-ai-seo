<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('og_graph_image')->nullable();
            $table->string('twitter_graph_image')->nullable();
        });

        Schema::table('encyclopedia', function (Blueprint $table) {
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('og_graph_image')->nullable();
            $table->string('twitter_graph_image')->nullable();
        });

        Schema::table('contents', function (Blueprint $table) {
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('og_graph_image')->nullable();
            $table->string('twitter_graph_image')->nullable();
        });
    }

    public function down()
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description', 'og_graph_image', 'twitter_graph_image']);
        });

        Schema::table('encyclopedia', function (Blueprint $table) {
            $table->dropColumn(['meta_title', 'meta_description', 'og_graph_image', 'twitter_graph_image']);
        });
    }
};