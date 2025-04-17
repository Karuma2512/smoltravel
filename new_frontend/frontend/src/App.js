import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./homepage/Home";
import LoginForm from "./Log/LoginForm";
import RegisterForm from "./Log/Register";
import PackPage from "./packages/PackagePage";
import DestiPage from "./destination/DestinationPage";
import DetailPages from "./packages/DetailsPage";
import PaymentMethod from "./payment/payment";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const getUserRole = () => {
  return localStorage.getItem("userRole"); 
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/destinations" element={<DestiPage />} />
        <Route path="/packages" element={<PackPage />} />
        <Route path="/packages/:id" element={<DetailPages />} />
        <Route path="/payment" element={<PaymentMethod />} />


   

       
        <Route
          path="/dashboard"
          element={getUserRole() === "Admin" ? <Navigate to="http://localhost:3000/" /> : <Navigate to="/" />}
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
    
  );  
}

export default App;
