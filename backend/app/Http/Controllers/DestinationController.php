<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DestinationController extends Controller
{
    // Lấy danh sách destinations
    public function index()
    {
        return response()->json(Destination::all());
    }

    // Lấy thông tin chi tiết một destination
    public function show($id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }
        return response()->json($destination);
    }

    // Thêm mới destination (DÙNG URL ẢNH)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'required|url',  // Yêu cầu ảnh phải là URL hợp lệ
            'status' => 'required|in:active,inactive',
            'featured' => 'nullable|boolean',
        ]);

        // Tải ảnh từ URL về storage
        $imageContents = file_get_contents($request->image_url);
        $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION);
        $imageName = 'destination_images/' . Str::random(20) . '.' . $extension;
        Storage::disk('public')->put($imageName, $imageContents);

        // Cập nhật đường dẫn vào database
        $validated['image_url'] = $imageName;

        $destination = Destination::create($validated);
        return response()->json($destination, 201);
    }

    // Cập nhật destination (DÙNG URL ẢNH)
    public function update(Request $request, $id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'country' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'image_url' => 'sometimes|url',  // Chấp nhận URL ảnh
            'status' => 'sometimes|in:active,inactive',
            'featured' => 'nullable|boolean',
        ]);
        $validated['featured'] = filter_var($request->featured, FILTER_VALIDATE_BOOLEAN);
        // Nếu có ảnh mới từ URL
        if ($request->image_url) {
            // Xóa ảnh cũ nếu có
            if ($destination->image_url) {
                Storage::disk('public')->delete($destination->image_url);
            }

            // Tải ảnh mới từ URL
            $imageContents = file_get_contents($request->image_url);
            $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION);
            $imageName = 'destination_images/' . Str::random(20) . '.' . $extension;
            Storage::disk('public')->put($imageName, $imageContents);

            // Cập nhật đường dẫn mới
            $validated['image_url'] = $imageName;
        }

        $destination->update($validated);
        return response()->json($destination);
    }

  
    public function hide($id)
    {
        $destination = Destination::find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }

        $destination->delete();
        return response()->json(['message' => 'Destination hidden successfully']);
    }


    public function restore($id)
    {
        $destination = Destination::withTrashed()->find($id);
        if (!$destination) {
            return response()->json(['message' => 'Destination not found'], 404);
        }

        if (!$destination->trashed()) {
            return response()->json(['message' => 'Destination is not hidden'], 400);
        }

        $destination->restore();
        return response()->json(['message' => 'Destination restored successfully']);
    }

    public function destroy($id)
{
    $destination = Destination::find($id);

    if (!$destination) {
        return response()->json(['message' => 'Destination not found'], 404);
    }

    $destination->delete(); // 🟢 Soft Delete - chỉ ẩn đi chứ không xóa khỏi DB

    return response()->json(['message' => 'Destination has been soft deleted']);
}
}
