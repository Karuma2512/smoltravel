import React from "react";
import './destination.css'
const Destination = () => {
  const destinations = [
    {
      id: 1,
      imgSrc: "img/Thailand.jpg",
      discount: "30% OFF",
      location: "Thailand",
      delay: "0.1s",
    },
    {
      id: 2,
      imgSrc: "img/Malaysia.jpg",
      discount: "25% OFF",
      location: "Malaysia",
      delay: "0.3s",
    },
    {
      id: 3,
      imgSrc: "img/Australia.jpg",
      discount: "35% OFF",
      location: "Australia",
      delay: "0.5s",
    },
  ];

  return (
    <div className="container-xxl py-5 destination">
      <div className="container">
        <div
          className="text-center wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <h6 className="section-title bg-white text-center text-primary px-3">
            Destination
          </h6>
          <h1 className="mb-5">Popular Destination</h1>
        </div>
        <div className="row g-3">
          <div className="col-lg-7 col-md-6">
            <div className="row g-3">
              {destinations.map((destination) => (
                <div
                  key={destination.id}
                  className={`col-lg-${
                    destination.id === 1 ? "12" : "6"
                  } col-md-12 wow zoomIn`}
                  data-wow-delay={destination.delay}
                >
                  <a
                    className="position-relative d-block overflow-hidden"
                    href=""
                  >
                    <img
                      className="img-fluid"
                      src={destination.imgSrc}
                      alt={destination.location}
                    />
                    <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                      {destination.discount}
                    </div>
                    <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                      {destination.location}
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div
            className="col-lg-5 col-md-6 wow zoomIn"
            data-wow-delay="0.7s"
            style={{ minHeight: "350px" }}
          >
            <a
              className="position-relative d-block h-100 overflow-hidden"
              href=""
            >
              <img
                className="img-fluid position-absolute w-100 h-100"
                src="img/Indonesia.jpg"
                alt="Indonesia"
                style={{ objectFit: "cover" }}
              />
              <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                20% OFF
              </div>
              <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                Indonesia
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
