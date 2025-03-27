import React, { useState, useEffect } from "react";
import '../src/navbar.css'

const Navbar = () => {
  const [fix, setFix] = useState(false);


  const handleScroll = () => {
    if (window.scrollY >= 150) {
      setFix(true);
    } else {
      setFix(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navbar-container-fluid p-0 ${fix ? "navbar-fixed" : ""}`}>
      <nav
        className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 ${
          fix ? "navbar-sticky" : ""
        }`}
      >
        <a href="#" className="navbar-brand p-0">
          <h1 className="text-primary m-0">
            <img src="img/Ame.jpg" alt="Tourist" className="icon-img me-3" />
            Tourist
          </h1>
        </a>
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
            <a href="index.html" className="nav-item nav-link active">
              Home
            </a>
            <a href="about.html" className="nav-item nav-link">
              About
            </a>
            <a href="service.html" className="nav-item nav-link">
              Services
            </a>
            <a href="package.html" className="nav-item nav-link">
              Packages
            </a>
            <div className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </a>
              <div className="dropdown-menu m-0">
                <a href="destination.html" className="dropdown-item">
                  Destination
                </a>
                <a href="booking.html" className="dropdown-item">
                  Booking
                </a>
                <a href="team.html" className="dropdown-item">
                  Travel Guides
                </a>
                <a href="testimonial.html" className="dropdown-item">
                  Testimonial
                </a>
                <a href="404.html" className="dropdown-item">
                  404 Page
                </a>
              </div>
            </div>
            <a href="contact.html" className="nav-item nav-link">
              Contact
            </a>
            <a href="AI .html" className="nav-item nav-link">
              Plan AI
            </a>
          </div>
          <a href="#" className="btn btn-primary rounded-pill py-2 px-4">
            Register
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
