<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function generateMomoQR($order_id, $amount)
    {
        $momoPhone = '0865359827'; 
        $qrLink = "https://qr.momo.vn/$momoPhone?amount=$amount&comment=Order-$order_id";

        return response()->json([
            'qr_link' => $qrLink
        ]);
    }
}
