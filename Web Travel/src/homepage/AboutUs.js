import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-section">
      <div className="about-us-row">
        <div className="about-us-image-container">
          <img
            className="about-us-image"
            src="/img/Watson_Amelia_-_Portrait_Mini.jpg"
            alt="Ame"
          />
        </div>
        <div className="about-us-text-container">
          <h6 className="about-us-section-title">About Us</h6>
          <h1 className="about-us-title">
            Welcome to <span className="about-us-highlight">Tourist</span>
          </h1>
          <p className="about-us-description">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit.
          </p>
          <p className="about-us-description">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
            lorem sit clita duo justo magna dolore erat amet.
          </p>
          <div className="about-us-features">
            <p>
              <i className="about-us-icon fa fa-arrow-right"></i>First Class Flights
            </p>
            <p>
              <i className="about-us-icon fa fa-arrow-right"></i>Handpicked Hotels
            </p>
            <p>
              <i className="about-us-icon fa fa-arrow-right"></i>5 Star Accommodations
            </p>
            <p>
              <i className="about-us-icon fa fa-arrow-right"></i>Latest Model Vehicles
            </p>
            <p>
              <i className="about-us-icon fa fa-arrow-right"></i>150 Premium City Tours
            </p>
            <p>
              <i className="about-us-icon fa fa-arrow-right"></i>24/7 Service
            </p>
          </div>
          <a className="about-us-btn" href="#">Read More</a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
