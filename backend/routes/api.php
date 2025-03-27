<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CoFounderController;
use App\Http\Controllers\StaffMemberController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\BookingController;
use App\Models\User;


Route::prefix('staff')->group(function () {
    Route::get('/', [StaffMemberController::class, 'index']); // Lấy danh sách nhân viên
    Route::post('/', [StaffMemberController::class, 'store']); // Thêm nhân viên
    Route::put('/{id}', [StaffMemberController::class, 'update']); // Cập nhật nhân viên
    Route::post('/{id}/hide', [StaffMemberController::class, 'hide']); // Ẩn nhân viên
    Route::post('/{id}/restore', [StaffMemberController::class, 'restore']); // Khôi phục nhân viên
    Route::delete('/{id}', [StaffMemberController::class, 'destroy']); // Xóa vĩnh viễn nhân viên
  
});
Route::prefix('packages')->group(function () {
    Route::get('/', [PackageController::class, 'index']); // Lấy danh sách
    Route::post('/', [PackageController::class, 'store']); // Thêm mới
    Route::get('/{package}', [PackageController::class, 'show']); // Lấy chi tiết
    Route::put('/{package}', [PackageController::class, 'update']); // Cập nhật
    Route::delete('/hide/{id}', [PackageController::class, 'hide']); // Ẩn gói (Soft Delete)
    // Route::put('/restore/{id}', [PackageController::class, 'restore']); // Khôi phục
    Route::delete('/{id}', [PackageController::class, 'destroy']); // Xóa vĩnh viễn 
});

Route::get('/users/count', [AuthController::class, 'getTotalUsers']);
Route::apiResource('destinations', DestinationController::class);
Route::apiResource('co-founders', CoFounderController::class);
Route::delete('/packages/{id}', [PackageController::class, 'hide']);
Route::get('destinations/search', [DestinationController::class, 'search']);




Route::post('/co-founders/{id}/activate', [CoFounderController::class, 'activate']);

Route::middleware(['api'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/users', [AuthController::class, 'getUsers']); 
    Route::post('/users/{id}/hide', [AuthController::class, 'hideUser']); // Ẩn người dùng
    Route::post('/users/{id}/restore', [AuthController::class, 'restoreUser']); // Khôi phục người dùng
 
});


Route::middleware(['api'])->group(function () {
    Route::post('/bookings', [BookingController::class, 'store']); // Đặt chỗ
    Route::get('/my-bookings', [BookingController::class, 'userBookings']); // Lấy danh sách booking của user
    Route::post('/bookings/{id}/cancel', [BookingController::class, 'cancel']); // Hủy booking
});

// Admin routes
// Route::middleware(['auth:sanctum', 'admin'])->group(function () {
//     Route::get('/bookings', [BookingController::class, 'index']); // Lấy danh sách booking
//     Route::post('/bookings/{id}/confirm', [BookingController::class, 'confirm']); // Xác nhận booking
// });
