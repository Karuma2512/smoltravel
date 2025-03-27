<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StaffMember;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class StaffMemberController extends Controller
{
    // Lấy danh sách tất cả nhân viên
    public function index(Request $request)
    {
        $query = StaffMember::query();
        
        if ($request->has('include_hidden')) {
            $query->withTrashed();
        }
        
        return response()->json($query->get());
    }

    // Lấy thông tin một nhân viên cụ thể
    public function show($id)
    {
        $staff = StaffMember::find($id);
        if (!$staff) {
            return response()->json(['message' => 'Staff member not found'], 404);
        }
        return response()->json($staff);
    }

    // Thêm nhân viên mới
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:staff_members,email',
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'hire_date' => 'nullable|date',
            'status' => 'required|in:active,inactive',
            'profile_picture' => 'nullable|image',
        ]);
        
        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $validatedData['profile_picture'] = $path;
        }
        
        $staff = StaffMember::create($validatedData);
        return response()->json($staff, 201);
    }

    // Cập nhật thông tin nhân viên
    public function update(Request $request, $id)
    {
        $staff = StaffMember::find($id);
        if (!$staff) {
            return response()->json(['message' => 'Staff member not found'], 404);
        }
        
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => ['sometimes', 'email', Rule::unique('staff_members', 'email')->ignore($id)],
            'position' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:20',
            'hire_date' => 'nullable|date',
            'status' => 'sometimes|in:active,inactive',
            'profile_picture' => 'nullable|image',
        ]);

        if ($request->hasFile('profile_picture')) {
            if ($staff->profile_picture) {
                Storage::disk('public')->delete($staff->profile_picture);
            }
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $validatedData['profile_picture'] = $path;
        }
        
        $staff->update($validatedData);
        return response()->json($staff);
    }

    // Ẩn nhân viên (Soft Delete)
    public function hide($id)
    {
        $staff = StaffMember::find($id);
        if (!$staff) {
            return response()->json(['message' => 'Staff member not found'], 404);
        }
        $staff->delete();
        return response()->json(['message' => 'Staff hidden successfully']);
    }

    // Khôi phục nhân viên đã bị ẩn
    public function restore($id)
    {
        $staff = StaffMember::withTrashed()->find($id);
        if (!$staff) {
            return response()->json(['message' => 'Staff member not found'], 404);
        }
        if (!$staff->trashed()) {
            return response()->json(['message' => 'Staff is not hidden'], 400);
        }
        $staff->restore();
        return response()->json(['message' => 'Staff restored successfully']);
    }

    // Xóa vĩnh viễn nhân viên
    public function destroy($id)
    {
        $staff = StaffMember::find($id);
    
        if (!$staff) {
            return response()->json(['message' => 'Staff member not found'], 404);
        }
    
        $staff->delete(); 
    
        return response()->json(['message' => 'Staff member has been soft deleted']);
    }

}
