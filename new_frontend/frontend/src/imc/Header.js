import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "../homepage/navbar.css";


const Navbar = () => {
  const [fix, setFix] = useState(false);  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

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
        className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${fix ? "navbar-sticky" : ""
          }`}
      >
        <NavLink to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <img src="img/Ame.jpg" alt="Tourist" className="icon-img me-3" />
            Amelia
          </h1>
        </NavLink>
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
            <NavLink to="/" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              About
            </NavLink>
            <NavLink to="/service" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Services
            </NavLink>
            <NavLink to="/package" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Packages
            </NavLink>
            <div className="nav-item dropdown">

              <span className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                Pages
              </span>
              <div className="dropdown-menu m-0">
                <NavLink to="/destination" className="dropdown-item">
                  Destination
                </NavLink>
                <NavLink to="/booking" className="dropdown-item">
                  Booking
                </NavLink>
                <NavLink to="/team" className="dropdown-item">
                  Travel Guides
                </NavLink>
                <NavLink to="/testimonial" className="dropdown-item">
                  Testimonial
                </NavLink>
              </div>
            </div>
            <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Contact
            </NavLink>
            <NavLink to="/AI" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Plan AI
            </NavLink>
            
          </div>
          
          <NavLink to="/login" className="btn btn-primary rounded-pill py-2 px-4">
            Register
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
