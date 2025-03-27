<?php
Route::middleware(['api'])->group(function () {
    Route::post('/register', function (Request $request) {
        return response()->json(['message' => 'API is working!']);
    });
});



