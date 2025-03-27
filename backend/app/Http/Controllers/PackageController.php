<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    //  Lấy danh sách tất cả các gói du lịch
    public function index()
    {
        return response()->json(Package::all());
    }

    //  Lấy chi tiết một gói du lịch
    public function show($id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }
        return response()->json($package);
    }

    //  Thêm mới gói du lịch (DÙNG URL ẢNH)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'image_url' => 'required|url',
            'status' => 'required|in:active,inactive',
            'featured' => 'nullable|boolean',
        ]);

        //  Tải ảnh từ URL về storage
        $imageContents = file_get_contents($request->image_url);
        $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION);
        $imageName = 'package_images/' . Str::random(20) . '.' . $extension;
        Storage::disk('public')->put($imageName, $imageContents);

        // Cập nhật đường dẫn vào database
        $validated['image_url'] = $imageName;

        $package = Package::create($validated);
        return response()->json($package, 201);
    }

    //  Cập nhật gói du lịch (DÙNG URL ẢNH)
    public function update(Request $request, $id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'destination' => 'sometimes|string|max:255',
            'duration' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'image_url' => 'sometimes|url',
            'status' => 'sometimes|in:active,inactive',
            'featured' => 'nullable|boolean',
        ]);
        $validated['featured'] = filter_var($request->featured, FILTER_VALIDATE_BOOLEAN);

        //  Nếu có ảnh mới từ URL
        if ($request->image_url) {
            // Xóa ảnh cũ nếu có
            if ($package->image_url) {
                Storage::disk('public')->delete($package->image_url);
            }

            // Tải ảnh mới từ URL
            $imageContents = file_get_contents($request->image_url);
            $extension = pathinfo(parse_url($request->image_url, PHP_URL_PATH), PATHINFO_EXTENSION);
            $imageName = 'package_images/' . Str::random(20) . '.' . $extension;
            Storage::disk('public')->put($imageName, $imageContents);

            // Cập nhật đường dẫn mới
            $validated['image_url'] = $imageName;
        }

        $package->update($validated);
        return response()->json($package);
    }

    //  Ẩn gói du lịch (Soft Delete)
    public function hide($id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        $package->delete(); // Soft delete
        return response()->json(['message' => 'Package hidden successfully']);
    }

    //  Khôi phục gói du lịch
    public function restore($id)
    {
        $package = Package::withTrashed()->find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        if (!$package->trashed()) {
            return response()->json(['message' => 'Package is not hidden'], 400);
        }

        $package->restore();
        return response()->json(['message' => 'Package restored successfully']);
    }

    //  Xóa vĩnh viễn gói du lịch
    public function destroy($id)
    {
        $package = Package::withTrashed()->find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        if ($package->image_url) {
            Storage::disk('public')->delete($package->image_url); // Xóa ảnh khỏi storage
        }

        $package->forceDelete(); // Xóa vĩnh viễn
        return response()->json(['message' => 'Package deleted permanently']);
    }
}
