import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./PackageDetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook điều hướng
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/packages/${id}`);
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };
    fetchPackageDetails();
  }, [id]);

  if (!packageData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="package-details-container">
         <div className="package-back-buttons">
         <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
         </div>
      <div className="package-content">
        <div className="package-image">
          <img src={packageData.image_url} alt={packageData.name} />
        </div>
        <div className="package-details">
          <h2>{packageData.name}</h2>
          
          <div className="package-rating">
            ⭐ ⭐ ⭐ ⭐ ⭐ ({packageData.rating || 4.0})
          </div>

          <div className="package-info">
            <span>⏳ Duration: {packageData.duration} Days</span>
            <span>🎟 Available Tickets: {packageData.tickets || 50}</span>
          </div>

          <div className="package-meta">
            <span>📍 {packageData.destination}</span>
            <span>💰 Price: ${packageData.price}</span>
            <span>{packageData.status === 'active' ? '✅ Active' : '❌ Inactive'}</span>
          </div>

          <div className="package-buttons">
            <button className="book-now">BOOK NOW</button>
           
          </div>

          {/* Description text area moved below BOOK NOW button */}
          <div className="package-description-wrapper">
            <div className="package-description-container">
              <label htmlFor="description">Description:</label>
              <div>{packageData.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
