<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateArticlesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->foreignId("author")->references("id")->on("users");
            $table->string("categories");
            $table->string("title");
            $table->string("status")->default("editing");
            $table->jsonb("content")->nullable();
            $table->integer("likes")->default(0);
            $table->integer("dislikes")->default(0);
            $table->boolean("production")->default(0);
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
        Schema::dropIfExists('articles');
    }
}
