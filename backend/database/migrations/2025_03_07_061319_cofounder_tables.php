<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('co_founders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('position');
            $table->text('bio')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->date('join_date')->nullable();
            $table->string('profile_picture')->nullable(); // Lưu đường dẫn ảnh
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('co_founders');
    }
};
