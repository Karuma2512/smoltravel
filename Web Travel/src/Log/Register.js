import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Log/RegisterForm.css';



const countryList = [
  "United States", "Canada", "United Kingdom", "Australia", "Germany",
  "France", "Japan", "South Korea", "Italy", "Brazil",
  "India", "Mexico", "Russia", "China", "South Africa",
  "Spain", "Netherlands", "Sweden", "Switzerland", "Norway",
  "Argentina", "Chile", "Colombia", "Denmark", "Finland",
  "Greece", "Ireland", "New Zealand", "Portugal", "Singapore",
  "Malaysia", "Thailand", "Vietnam", "Philippines", "Indonesia",
  "Turkey", "Saudi Arabia", "UAE", "Egypt", "Israel",
  "Belgium", "Poland", "Czech Republic", "Austria", "Hungary",
  "Ukraine", "Pakistan", "Bangladesh", "South Sudan", "Peru"
];

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      toast.success('User registered successfully!');
      setFormData({ name: '', email: '', password: '', age: '', gender: '', country: '' });
      setTimeout(() => { window.location.href = '/login'; }, 2000);
    } catch (err) {
      toast.error('Registration failed. Check your inputs.');
    }
  };

  return (
    <div className="register-page">
    <div className="Register-container">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className="row">
            <div className="input-field">
              <input type="text" name="name" required value={formData.name} onChange={handleChange} />
              <label>Name</label>
            </div>
            <div className="input-field">
              <input type="email" name="email" required value={formData.email} onChange={handleChange} />
              <label>Email</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input type="password" name="password" required value={formData.password} onChange={handleChange} />
              <label>Password</label>
            </div>
            <div className="input-field">
              <input type="number" name="age" value={formData.age} onChange={handleChange} min="1" max="100" />
              <label>Age</label>
            </div>
          </div>

          <div className="input-field">
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="input-field">
            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">Select Country</option>
              {countryList.map((country, index) => (
                <option key={index} value={country}>{country}</option>
              ))}
            </select>
          </div>

          <button type="submit">Register</button>
          <div className="login">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
          </form>
      </div>
    </div>
  </div>
  );
}

export default RegisterForm;
