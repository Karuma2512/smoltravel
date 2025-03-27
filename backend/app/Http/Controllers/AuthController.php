<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
class AuthController extends Controller
{
    // Đăng nhập
    public function login(Request $request)
    {
        try {
            $user = User::where('email', $request->email)->first();
    
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
    
            $token = $user->createToken('YourAppName')->plainTextToken;
            $redirectUrl = $user->role === 'Admin' ? 'http://localhost:3000/dashboard' : '/';
    
            return response()->json([
                'token' => $token,
                'message' => 'Login successful',
                'user' => $user,
                'redirect' => $redirectUrl
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    

    public function getUsers()
    {
        $users = User::withTrashed()->get(); // Lấy cả user bị ẩn (soft deleted)
        return response()->json($users);
    }
    
    public function getTotalUsers(): JsonResponse
    {
        $totalUsers = User::count(); // Đếm tổng số user trong database
        return response()->json(['totalUsers' => $totalUsers]);
    }
    
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'age' => 'required|integer',
                'gender' => 'required|string',
                'country' => 'required|string',
            ]);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'age' => $validatedData['age'],
                'gender' => $validatedData['gender'],
                'country' => $validatedData['country'],
                'role' => 'User', // Đặt mặc định là "User"
                'status' => 'active'
            ]);

            return response()->json(['message' => 'User registered successfully!'], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Thêm user mới (Admin sử dụng)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'role' => 'required|string|in:User,Editor,Admin',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => 'active'
        ]);

        return response()->json($user, 201);
    }

    // Xóa mềm user (deactivate)
    public function deactivateUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete(); // Soft delete
        return response()->json(['message' => 'User deactivated successfully']);
    }
    public function hideUser($id) {
        $user = User::find($id);
        if ($user) {
            $user->delete(); // Soft delete (ẩn user)
            return response()->json(['message' => 'User hidden successfully']);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
    public function restoreUser($id) {
        $user = User::withTrashed()->find($id);
        if ($user) {
            $user->restore(); // Khôi phục user
            return response()->json(['message' => 'User restored successfully']);
        }
        return response()->json(['message' => 'User not found'], 404);
    }
    
    // Khôi phục user đã bị soft delete
    
    // Upload avatar
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = auth()->user();

        if ($request->hasFile('avatar')) {
            // Xóa avatar cũ nếu có
            if ($user->avatar) {
                Storage::delete(str_replace('storage/', 'public/', $user->avatar));
            }

            // Lưu ảnh mới
            $path = $request->file('avatar')->store('public/avatars');

            // Cập nhật đường dẫn ảnh mới
            $user->avatar = str_replace('public/', 'storage/', $path);
            $user->save();

            return response()->json(['message' => 'Avatar uploaded successfully', 'avatar' => $user->avatar]);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }
}
