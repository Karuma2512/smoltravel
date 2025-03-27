<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('staff_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('position');
            $table->string('department');
            $table->string('phone')->nullable();
            $table->date('hire_date')->nullable();
            $table->string('status')->default('Active'); // Active, Inactive
            $table->string('profile_picture')->nullable(); // URL ảnh đại diện
            $table->timestamps();
            $table->softDeletes(); // Sử dụng Soft Delete
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_members');
    }
};
