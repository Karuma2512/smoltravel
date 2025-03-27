import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import "../homepage/navbar.css";

const Navbar = () => {
  const [fix, setFix] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleScroll = () => {
    setFix(window.scrollY >= 150);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = (e) => {
    e.preventDefault();
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`navbar-container-fluid p-0 ${fix ? "navbar-fixed" : ""}`}>
      <nav
        className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${
          fix ? "navbar-sticky" : ""
        }`}
      >
        <Link to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <img src="img/Ame.jpg" alt="Tourist" className="icon-img me-3" />
            Amelia
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <a
              className="nav-item nav-link"
              href="#"
              onClick={toggleDarkMode}
              title="Toggle Dark Mode"
            >
              <i className={`bi ${isDarkMode ? "bi-sun-fill" : "bi bi-moon-stars-fill"}`}></i>
            </a>
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/service" className="nav-item nav-link">
              Services
            </Link>
            <Link to="/package" className="nav-item nav-link">
              Packages
            </Link>
            <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Pages
              </Link>
              <div className="dropdown-menu m-0">
                <Link to="/destination" className="dropdown-item">
                  Destination
                </Link>
                <Link to="/booking" className="dropdown-item">
                  Booking
                </Link>
                <Link to="/team" className="dropdown-item">
                  Travel Guides
                </Link>
                <Link to="/testimonial" className="dropdown-item">
                  Testimonial
                </Link>
              </div>
            </div>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
            <Link to="/AI" className="nav-item nav-link">
              Plan AI
            </Link>
          </div>
          <Link to="/register" className="btn btn-primary rounded-pill py-2 px-4">
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
