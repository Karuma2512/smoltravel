import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "../homepage/navbar.css";

const Navbar = () => {
  const [fix, setFix] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={`navbar-container-fluid p-0 ${fix ? "navbar-fixed" : ""}`}>
      <nav
        className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${fix ? "navbar-sticky" : ""
          }`}
      >
        <NavLink to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <img src={`/img/Ame.jpg`} alt="Welcome"  className="icon-img me-3" />
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
            <NavLink to="/destinations" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Destination
            </NavLink>
            <NavLink to="/service" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Services
            </NavLink>
            <NavLink to="/packages" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Packages
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Contact
            </NavLink>
            <NavLink to="/AI" className={({ isActive }) => `nav-item nav-link ${isActive ? "active" : ""}`}>
              Plan AI
            </NavLink>
          </div>

          {isAuthenticated ? (
            <div className="user-icon-container" onClick={toggleDropdown}>
              <i className="bi bi-person-circle user-icon"></i>

              {showDropdown && (
                <div className="user-dropdown">
                  <NavLink to="/tourists" className="dropdown-item">
                    Your Tourists
                  </NavLink>
                  <NavLink to="/information" className="dropdown-item">
                    Information
                  </NavLink>
                  <NavLink to="/booking" className="dropdown-item">
                    Your Booking
                  </NavLink>
                  <span className="dropdown-item" onClick={handleLogout}>
                    Log out
                  </span>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-primary rounded-pill py-2 px-4">
              Log In
            </NavLink>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
