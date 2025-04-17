import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PaymentMethod = () => {
    const location = useLocation();
    const booking = location.state?.booking;
    const [packageData, setPackageData] = useState(null);

    useEffect(() => {
        if (booking?.package_id) {
            console.log("Fetching package data for ID:", booking.package_id);

            fetch(`http://localhost:8000/api/packages/${booking.package_id}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Dữ liệu package nhận được:", data);
                    setPackageData(data.booking.package);
                })
                .catch(err => console.error("Lỗi tải package:", err));
        }
    }, [booking]);

    if (!booking) {
        return <p className="text-center">Không tìm thấy thông tin booking!</p>;
    }

    // Kiểm tra dữ liệu booking
    console.log("Booking Data:", booking);
    
    // Chuyển đổi total_price sang số
    let bookingData = booking.booking   ;
    console.log(bookingData)
    const totalPrice = bookingData.total_price ? Number(bookingData.total_price) : packageData?.price || 0;

    console.log("Total Price:", totalPrice, "(type:", typeof totalPrice, ")");

    const momoQR = totalPrice > 0
        ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=momo://pay?phone=0865359827&amount=${totalPrice}&comment=Booking-${bookingData .id}`
        : null;

    return (
        <div className="container text-center mt-5">
            <h2 className="mb-4">Chọn phương thức thanh toán</h2>
            <div className="border p-4">
                <h4 className="mb-3">Information booking</h4>
                <p><strong>Packages:</strong> {bookingData.package.name || "Đang tải..."}</p>
                <p><strong>Totals:</strong> {totalPrice.toLocaleString()} VNĐ</p>
            </div>

            <div className="mt-4">
                <h4 className="mb-3">Payment with MoMo</h4>
                <p>Scan QR code to payment:</p>
                {momoQR ? (
                    <img src={momoQR} alt="MoMo QR Code" className="w-50" />
                ) : (
                    <p className="text-danger">Không thể tạo mã QR vì giá trị thanh toán là 0.</p>
                )}
                <p>Phone Number MoMo: <strong>0865359827</strong></p>
            </div>
        </div>
    );
};

export default PaymentMethod;
