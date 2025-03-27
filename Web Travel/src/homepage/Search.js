import React from 'react';
import '../imc/header.css'
import '../homepage/navbar.css'
import '../homepage/Search.css'
const Search = () => {
    return (
        <div className="bg-primary py-5 mb-5 hero-header">
          <div className="search-container py-5">
            <div className="search-row justify-content-center py-5">
              <div className="search-column pt-lg-5 mt-lg-5 text-center">
                <h1 className="display-3 text-white mb-3 animated slideInDown">
                  Enjoy Your Vacation With Us
                </h1>
                <p className="fs-4 text-white mb-4 animated slideInDown">
                  Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum
                  lorem sit
                </p>
                <div className="position-relative w-75 mx-auto animated slideInDown">
                  <input
                    className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                    type="text"
                    placeholder="Eg: Thailand"
                  />
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                    style={{ marginTop: "7px" }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Search;
