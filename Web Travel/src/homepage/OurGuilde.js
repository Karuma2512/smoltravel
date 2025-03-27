import React from 'react';
import './OurGuide.css'; 

const OurGuide = () => {
  return (
    <div className="travel-guide-container-xxl py-5">
      <div className="travel-guide-container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Travel Guide</h6>
          <h1 className="mb-5">Meet Our Guide</h1>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="travel-team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="img/Ame.jpg" alt="Team member 1" />
              </div>
              <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Amelia Waston</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
            <div className="travel-team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="img/grace.jpg" alt="Team member 2" />
              </div>
              <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Grace Howard</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
            <div className="travel-team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="img/Elma.jpg" alt="Team member 3" />
              </div>
              <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Elma</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
            <div className="travel-team-item">
              <div className="overflow-hidden">
                <img className="img-fluid" src="img/Saber.jpg" alt="Team member 4" />
              </div>
              <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-square mx-1" href="">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="text-center p-4">
                <h5 className="mb-0">Artoria</h5>
                <small>Designation</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurGuide;
