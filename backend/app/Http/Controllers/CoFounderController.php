<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CoFounder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class CoFounderController extends Controller
{
    // Lấy danh sách tất cả co-founder
    public function index()
    {
        return response()->json(CoFounder::all());
    }

    // Lấy thông tin một co-founder cụ thể
    public function show($id)
    {
        $coFounder = CoFounder::find($id);
        if (!$coFounder) {
            return response()->json(['message' => 'Co-founder not found'], 404);
        }
        return response()->json($coFounder);
    }

    // Thêm mới một co-founder
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:co_founders,email',
            'position' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'twitter' => 'nullable|url',
            'join_date' => 'nullable|date',
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $validatedData['profile_picture'] = $path;
        }

        $coFounder = CoFounder::create($validatedData);

        return response()->json($coFounder, 201);
    }

    // Cập nhật thông tin co-founder
    public function update(Request $request,$id)
    {
        $coFounder = CoFounder::find($id);
        if (!$coFounder) {
            return response()->json(['message' => 'Co-founder not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('co_founders', 'email')->ignore($id, 'id')],
            'position' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'linkedin' => 'nullable|url',
            'twitter' => 'nullable|url',
            'join_date' => 'nullable|date',
            'profile_picture' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            if ($coFounder->profile_picture) {
                Storage::disk('public')->delete($coFounder->profile_picture); // Xóa ảnh cũ
            }
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $validatedData['profile_picture'] = $path;
        }

        $coFounder->update($validatedData);

        return response()->json($coFounder);
    }

    // Xóa co-founder
    public function destroy($id)
    {
        $coFounder = CoFounder::find($id);
        if (!$coFounder) {
            return response()->json(['message' => 'Co-founder not found'], 404);
        }

        if ($coFounder->profile_picture) {
            Storage::disk('public')->delete($coFounder->profile_picture);
        }

        $coFounder->delete();

        return response()->json(['message' => 'Co-founder deleted']);
    }
}
