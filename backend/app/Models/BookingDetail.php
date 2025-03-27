<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id', 'customer_name', 'customer_email', 'customer_phone', 'num_people', 'price_per_person', 'total_amount'
    ];

    public function booking() {
        return $this->belongsTo(Booking::class);
    }
}
