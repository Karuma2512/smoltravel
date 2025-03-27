import React, { useState, useEffect } from "react";
import axios from "axios";
import "./popup.css";

const Destinationdetails = ({ destinationId, onClose }) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!destinationId) return;

    const fetchDestination = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/destinations/${destinationId}`);
        setDestination(response.data);
      } catch (err) {
        setError("Failed to load destination details");
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [destinationId]);

  if (!destinationId) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h2>{destination.name}</h2>
            <img src={destination.image_url} alt={destination.name} className="popup-image" />
            <p>{destination.description}</p>
            <p><strong>Country:</strong> {destination.country}</p>
            <p><strong>Status:</strong> {destination.status ? "Active" : "Inactive"}</p>
            <p><strong>Featured:</strong> {destination.featured ? "Yes" : "No"}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Destinationdetails;
