<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    // Đặt chỗ
    public function store(Request $request)
    {
        // Xác thực dữ liệu
        $request->validate([
            'package_id' => 'required|integer|exists:packages,id', // Đảm bảo package_id tồn tại trong bảng packages
            'booking_date' => 'required|date|after:today', // Đảm bảo ngày đặt chỗ là sau ngày hiện tại
            'status' => 'required|string',
            'total_price' => 'required|numeric',
            'payment_status' => 'required|string',
            'special_request' => 'nullable|string',
            'number_of_people' => 'required|integer',
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
        ]);

        // Lấy user hiện tại từ Auth
        $user = Auth::user();  // Lấy user đang đăng nhập

        // Tìm gói tour theo package_id từ request
        $package = Package::find($request->package_id);  // Sử dụng find thay cho findOrFail để không gây lỗi nếu không tìm thấy

        // Kiểm tra nếu gói tour không tồn tại
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        // Tính toán tổng giá trị booking dựa trên số lượng người
        $totalPrice = $package->price * $request->number_of_people;

        // Tạo mới booking
        $booking = Booking::create([
            'user_id' => $user->id,  // Gán user_id từ người dùng đang đăng nhập
            'package_id' => $package->id,
            'booking_date' => $request->booking_date,
            'total_price' => $totalPrice,  // Sử dụng giá đã tính toán
            'status' => 'pending',
            'payment_status' => 'pending',
            'special_request' => $request->special_request,
            'number_of_people' => $request->number_of_people,
            'name' => $request->name,  // Lưu tên người đặt
            'email' => $request->email,  // Lưu email người đặt
            'phone' => $request->phone,  // Lưu số điện thoại người đặt
        ]);

        // Nạp thông tin package liên quan đến booking vừa tạo
        $booking->load('package');

        // Trả về phản hồi thành công với dữ liệu booking
        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking
        ], 201);
    }

    // Lấy danh sách booking của người dùng
    public function userBookings()
    {
        // Lấy thông tin người dùng hiện tại
        $user = Auth::user();

        // Lấy danh sách booking của người dùng với thông tin gói tour đi kèm
        $bookings = Booking::with('package')
            ->where('user_id', $user->id)  // Chỉ lấy booking của người dùng hiện tại
            ->latest()  // Sắp xếp theo thời gian tạo mới nhất
            ->get();

        // Trả về danh sách booking
        return response()->json($bookings);
    }

    // Danh sách booking dành cho admin
    public function index()
    {
        // Lấy tất cả các booking với thông tin người dùng và gói tour đi kèm
        $bookings = Booking::with(['user', 'package'])
            ->latest()  // Sắp xếp theo thời gian tạo mới nhất
            ->get();

        // Trả về danh sách booking
        return response()->json($bookings);
    }

    // Hủy booking
    public function cancel($id)
    {
        // Tìm booking theo id
        $booking = Booking::findOrFail($id);

        // Kiểm tra nếu booking đã được xác nhận thì không thể hủy
        if ($booking->status === 'confirmed') {
            return response()->json(['message' => 'Cannot cancel a confirmed booking'], 400);
        }

        // Cập nhật trạng thái booking thành canceled
        $booking->update(['status' => 'canceled']);

        // Trả về thông báo thành công
        return response()->json(['message' => 'Booking canceled successfully']);
    }

    // Xác nhận booking
    public function confirm($id)
    {
        // Tìm booking theo id
        $booking = Booking::findOrFail($id);

        // Cập nhật trạng thái booking thành confirmed
        $booking->update(['status' => 'confirmed']);

        // Trả về thông báo thành công
        return response()->json(['message' => 'Booking confirmed successfully']);
    }
}
