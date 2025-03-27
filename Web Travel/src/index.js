import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createRoot } from "react-dom/client";
import Home from "./homepage/Home";
import AboutPage from "./homepage/AboutPage";
import LoginForm from "./Log/LoginForm";
import RegisterForm from "./Log/Register";


// Hàm kiểm tra role
const getUserRole = () => {
  return localStorage.getItem("userRole"); // Lấy role từ localStorage
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Điều hướng tự động sau khi đăng nhập */}
        <Route
          path="/redirect"
          element={
            getUserRole() === "Admin" ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="http://localhost:8080/" />
            )
          }
        />

        {/* Dashboard chỉ cho admin */}
        <Route
          path="/dashboard"
          element={getUserRole() === "Admin" ?  <Navigate to="http://localhost:3000/" /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
