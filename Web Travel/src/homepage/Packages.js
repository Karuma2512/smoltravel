import React from 'react';
import '../../src/homepage/package.css'

const Packages = () => {
    return (
        <div className="wrapper py-5">
            <div className="package-container">
                <div className="text-center">
                    <h6 className="section-title bg-white text-primary px-3">Packages</h6>
                    <h1 className="mb-5">Awesome Packages</h1>
                </div>
                <div className="row g-4 justify-content-center">
                    {/* Package 1 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="package-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="img/Morder.jpg" alt="Thailand" />
                            </div>
                            <div className="d-flex border-bottom">
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-map-marker-alt text-primary me-2"></i>Thailand
                                </small>
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-calendar-alt text-primary me-2"></i>3 days
                                </small>
                                <small className="flex-fill text-center py-2">
                                    <i className="fa fa-user text-primary me-2"></i>2 Person
                                </small>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="mb-0">$149.00</h3>
                                <div className="mb-3">
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                </div>
                                <p>Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam eos</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <a href="#" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                                    <a href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Package 2 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="package-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="img/Morder1.jpg" alt="VietNam" />
                            </div>
                            <div className="d-flex border-bottom">
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-map-marker-alt text-primary me-2"></i>VietNam
                                </small>
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-calendar-alt text-primary me-2"></i>5 days
                                </small>
                                <small className="flex-fill text-center py-2">
                                    <i className="fa fa-user text-primary me-2"></i>4 Person
                                </small>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="mb-0">$249.00</h3>
                                <div className="mb-3">
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                </div>
                                <p>Explore the beautiful beaches and culture of VietNam. A paradise for relaxation.</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <a href="#" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                                    <a href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Package 3 */}
                    <div className="col-lg-4 col-md-6">
                        <div className="package-item">
                            <div className="overflow-hidden">
                                <img className="img-fluid" src="img/Morder2.jpg" alt="Japan" />
                            </div>
                            <div className="d-flex border-bottom">
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-map-marker-alt text-primary me-2"></i>Japan
                                </small>
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-calendar-alt text-primary me-2"></i>7 days
                                </small>
                                <small className="flex-fill text-center py-2">
                                    <i className="fa fa-user text-primary me-2"></i>2 Person
                                </small>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="mb-0">$499.00</h3>
                                <div className="mb-3">
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                    <small className="fa fa-star text-primary"></small>
                                </div>
                                <p>Experience the rich culture and modern cities of Japan. A trip to remember!</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <a href="#" className="btn btn-sm btn-primary px-3 border-end" style={{ borderRadius: '30px 0 0 30px' }}>Read More</a>
                                    <a href="#" className="btn btn-sm btn-primary px-3" style={{ borderRadius: '0 30px 30px 0' }}>Book Now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;
