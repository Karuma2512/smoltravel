import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Des.css"

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/destinations");
        setDestinations(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchDestinations();
  }, []);

  // Khi click vào 1 điểm đến, mở popup và hiển thị thông tin chi tiết
  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setShowPopup(true);
  };

  return (
    <div className="container-des mx-auto p-6">
      <h2 className="title">All Destinations</h2>
      <div className="destination-grid">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="destination-card"
            onClick={() => handleSelectDestination(destination)}
          >
            <img src={destination.image_url} alt={destination.name} className="destination-img" />
            <div className="destination-info">
              <h3 className="destination-name">{destination.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Popup chi tiết Destination */}
      {showPopup && selectedDestination && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>✖</button>
            <h2 className="popup-title">Destination Details</h2>

            <img src={selectedDestination.image_url} alt={selectedDestination.name} className="popup-img" />

            <div className="popup-form">
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{selectedDestination.name}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Country:</span>
                <span className="info-value">{selectedDestination.country}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Description:</span>
                <span className="info-value">{selectedDestination.description || "No description available"}</span>
              </div>

              <div className="info-item">
                <span className="info-label">Status:</span>
                <span className="info-value">{selectedDestination.status ? "Active" : "Inactive"}</span>
              </div>

              <div className={`toggle-feature ${selectedDestination.featured ? "active" : ""}`}>
                Feature: {selectedDestination.featured ? "Yes" : "No"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationList;
