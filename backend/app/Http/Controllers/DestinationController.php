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
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',  // Validate file ảnh
            'status' => 'required|boolean',
            'featured' => 'required|boolean',
        ]);
    
        // Xử lý upload ảnh hoặc image_url
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('destinations', 'public');
            $validatedData['image_url'] = $imagePath;
        } elseif ($request->image_url && filter_var($request->image_url, FILTER_VALIDATE_URL)) {
            $validatedData['image_url'] = $request->image_url;
        }
    
        $destination = Destination::create($validatedData);
    
        return response()->json($destination, 201);
    }
    

    // Cập nhật destination (DÙNG URL ẢNH)
    public function update(Request $request, $id)
{
    $destination = Destination::findOrFail($id);

    $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'country' => 'required|string|max:255',
        'description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'status' => 'required|boolean',
        'featured' => 'required|boolean',
    ]);

    // Xử lý upload ảnh hoặc image_url
    if ($request->hasFile('image')) {
        if ($destination->image_url) {
            Storage::disk('public')->delete($destination->image_url);
        }
        $imagePath = $request->file('image')->store('destinations', 'public');
        $validatedData['image_url'] = $imagePath;
    } elseif ($request->image_url && filter_var($request->image_url, FILTER_VALIDATE_URL)) {
        $validatedData['image_url'] = $request->image_url;
    }

    $destination->update($validatedData);

    return response()->json($destination, 200);
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
    public function search(Request $request)
    {
        $query = Destination::query();
    
        if ($request->has('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }
    
        if ($request->has('country')) {
            $query->where('country', 'LIKE', '%' . $request->country . '%');
        }
    
        $destinations = $query->get();
    
        if ($destinations->isEmpty()) {
            return response()->json(['message' => 'No destinations found'], 404);
        }
    
        return response()->json($destinations);
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
