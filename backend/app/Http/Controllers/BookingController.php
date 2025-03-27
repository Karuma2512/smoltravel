<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    // Đặt chỗ mới
    public function store(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
            'booking_date' => 'required|date|after:today',
        ]);

        $user = Auth::user();
        $package = Package::findOrFail($request->package_id);

        $booking = Booking::create([
            'user_id' => $user->id,
            'package_id' => $package->id,
            'booking_date' => $request->booking_date,
            'total_price' => $package->price,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        return response()->json(['message' => 'Booking created successfully', 'booking' => $booking], 201);
    }

    // Lấy danh sách booking của user
    public function userBookings()
    {
        $user = Auth::user();
        $bookings = Booking::where('user_id', $user->id)->with('package')->get();

        return response()->json($bookings);
    }

    // Admin lấy danh sách tất cả booking
    public function index()
    {
        $bookings = Booking::with(['user', 'package'])->get();
        return response()->json($bookings);
    }

    // Hủy đặt chỗ
    public function cancel($id)
    {
        $booking = Booking::findOrFail($id);
        if ($booking->status === 'confirmed') {
            return response()->json(['message' => 'Cannot cancel confirmed booking'], 400);
        }

        $booking->update(['status' => 'canceled']);
        return response()->json(['message' => 'Booking canceled successfully']);
    }

    // Xác nhận booking (chỉ admin)
    public function confirm($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->update(['status' => 'confirmed']);
        return response()->json(['message' => 'Booking confirmed successfully']);
    }
}
