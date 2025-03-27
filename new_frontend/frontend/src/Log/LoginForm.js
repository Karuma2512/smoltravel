import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./LoginForm.css";

function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", formData);
      const { token, user, redirect } = response.data;

      // Lưu token và user vào localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      localStorage.setItem("userRole", user.role);

      // Chuyển hướng theo role
      window.location.href =redirect;
    } catch (error) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper-login">
        <form onSubmit={handleSubmit}>
          <h2>Ame Travel</h2>
          <div className="input-field">
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
            <label>Enter your email</label>
          </div>

          <div className="input-field">
            <input type="password" name="password" required value={formData.password} onChange={handleChange} />
            <label>Enter your password</label>
          </div>

          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Log In</button>

          <div className="register">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
