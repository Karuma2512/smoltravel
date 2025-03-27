import React, { useState } from 'react';
import axios from 'axios';
import '../imc/header.css';
import '../homepage/navbar.css';
import '../homepage/Search.css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [destinations, setDestinations] = useState([]);

    const handleSearch = async () => {
      try {
          const response = await axios.get(`http://localhost:8000/api/destinations/search`, {
              params: { name: searchTerm }
          });
          console.log("Response data:", response.data); // Debug API response
          setDestinations(response.data);
      } catch (error) {
          console.error("Error fetching destinations:", error);
      }
  };
  

    return (
        <div className="bg-primary py-5 mb-5 hero-header">
            <div className="search-container py-5">
                <div className="search-row justify-content-center py-5">
                    <div className="search-column pt-lg-5 mt-lg-5 text-center">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                            Enjoy Your Vacation With Us
                        </h1>
                        <p className="fs-4 text-white mb-4 animated slideInDown">
                            Find the best destinations for your journey
                        </p>
                        <div className="position-relative w-75 mx-auto animated slideInDown">
                            <input
                                className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                                type="text"
                                placeholder="Eg: Thailand"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            
                        </div>
                    </div>
                </div>
                {/* Hiển thị kết quả tìm kiếm */}
                <div className="container mt-4">
                    {destinations.length > 0 ? (
                        <ul className="list-group">
                            {destinations.map((destination) => (
                                <li key={destination.id} className="list-group-item">
                                    <h5>{destination.name} - {destination.country}</h5>
                                    <p>{destination.description}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-white text-center">No destinations found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
