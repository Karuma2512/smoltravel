<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        // Bảng bookings
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('package_id')->constrained()->onDelete('cascade');
            $table->dateTime('booking_date'); // Ngày đặt
            $table->date('travel_date'); // Ngày đi
            $table->decimal('total_price', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'canceled'])->default('pending');
            $table->timestamps();
        });

        // Bảng booking_details
        Schema::create('booking_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade');
            $table->string('customer_name');
            $table->string('customer_email')->nullable();
            $table->string('customer_phone')->nullable();
            $table->integer('num_people'); // Số người đi
            $table->decimal('price_per_person', 10, 2);
            $table->decimal('total_amount', 10, 2);
            $table->timestamps();
        });

        // Bảng payments
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('payment_method', ['credit_card', 'paypal', 'bank_transfer']);
            $table->string('transaction_id')->unique()->nullable();
            $table->decimal('amount', 10, 2);
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('payments');
        Schema::dropIfExists('booking_details');
        Schema::dropIfExists('bookings');
    }
};
