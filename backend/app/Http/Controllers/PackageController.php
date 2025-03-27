<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PackageController extends Controller
{
    // Lấy danh sách packages
    public function index()
    {
        return response()->json(Package::all());
    }

    // Lấy thông tin chi tiết một package
    public function show($id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }
        return response()->json($package);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'featured' => 'required|in:0,1',  // Chấp nhận 0 hoặc 1
            'status' => 'required|in:active,inactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
    
        // Kiểm tra upload ảnh từ form
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('packages', 'public');
            $validated['image_url'] = $imagePath;
        } elseif ($request->image_url && filter_var($request->image_url, FILTER_VALIDATE_URL)) {
            $validated['image_url'] = $request->image_url;
        }
    
        $package = Package::create($validated);
    
        return response()->json($package, 201);
    }
    
    public function update(Request $request,Package $package)
{
    $validated = $request->validate([
        'name' => 'sometimes|string|max:255',
        'destination' => 'sometimes|string|max:255',
        'duration' => 'sometimes|string|max:255',
        'price' => 'sometimes|numeric',
        'description' => 'nullable|string',
        'featured' => 'nullable|in:0,1',
        'status' => 'nullable|in:active,inactive',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
    ]);

    if ($request->hasFile('image')) {
        if ($package->image_url) {
            Storage::disk('public')->delete($package->image_url);
        }
        $imagePath = $request->file('image')->store('packages', 'public');
        $validated['image_url'] = $imagePath;
    } elseif ($request->image_url && filter_var($request->image_url, FILTER_VALIDATE_URL)) {
        $validated['image_url'] = $request->image_url;
    }
    $package->update($validated);

    return response()->json($package, 200);
}

    public function hide($id)
    {
        $package = Package::find($id);
        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        $package->delete(); // Soft delete
        return response()->json(['message' => 'Package hidden successfully']);
    }

    // Khôi phục package
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

    // Xóa vĩnh viễn package
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
