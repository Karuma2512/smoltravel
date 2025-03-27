import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./package.css";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/packages");
        setPackages(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchPackages();
  }, []);

  const handleSelectPackage = (id) => {
    navigate(`/packages/${id}`);
  };

  return (
    <div className="container-des mx-auto p-6">
      <h2 className="title">All Packages</h2>
      <div className="package-grid">
        {packages.map((pkg) => (
          <div key={pkg.id} className="package-card">
            <img src={pkg.image_url} alt={pkg.name} className="package-img" />
            <div className="package-info">
              <h3 className="package-name">{pkg.name}</h3>
              <div className="package-details">
                <span><i className="fas fa-map-marker-alt"></i> {pkg.destination}</span>
                <span><i className="fas fa-calendar-alt"></i> {pkg.duration} days</span>
                <span><i className="fas fa-users"></i> {pkg.people} Person</span>
              </div>
              <p className="package-price">${pkg.price}</p>
            </div>
            <div className="package-footer">
              <button className="read-more" onClick={() => handleSelectPackage(pkg.id)}>Read More</button>
              <button className="book-now-btn" onClick={() => alert("Booking feature coming soon!")}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
