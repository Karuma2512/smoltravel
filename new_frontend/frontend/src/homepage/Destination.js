import React, { useEffect, useState } from "react";
import axios from "axios";
import "./destination.css";


const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/destinations");
        setDestinations(response.data.slice(0, 10)); 
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchDestinations();
  }, []);
  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setShowPopup(true);
  };
  return (
    <div id="fh5co-destination">
      <div className="tour-fluid">
        <div className="row">
          <div className="col-md-12">
            <ul id="fh5co-destination-list" className="animate-box">
              {destinations.slice(0, 5).map(destination => (
                <li key={destination.id} className="one-forth text-center" style={{ backgroundImage: `url(${destination.image_url})` }}
                onClick={() => handleSelectDestination(destination)} 
                >
                  <a>
                    <div className="case-studies-summary">
                      <h2>{destination.name}</h2>
                    </div>
                  </a>
                </li>
              ))}
              
              {/* Ô Most Popul  ar Destinations */}
              <li className="one-half text-center popular-destination">
                <div className="title-bg">
                  <div className="case-studies-summary">
                    <h2>Most Popular Destinations</h2>
                    <span><a href="/destinations">View All Destinations</a></span>
                  </div>
                </div>
              </li>
              
              {destinations.slice(5, 10).map(destination => (
                <li key={destination.id} className="one-forth text-center" style={{ backgroundImage: `url(${destination.image_url})` }}
                
                onClick={() => handleSelectDestination(destination)} 
                >
                  
                  <a>
                    <div className="case-studies-summary">
                      <h2>{destination.name}</h2>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
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
export default Destination;