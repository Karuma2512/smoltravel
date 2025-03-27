import React from 'react';
import '../homepage/services.css'

const Services = () => {
    return (
        <div className="services-section py-5">
            <div className="services-container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Services</h6>
                    <h1 className="mb-5">Our Services</h1>
                </div>
                <div className="row g-4">
                    {[...Array(4)].map((_, index) => (
                        <div 
                            key={index} 
                            className={`col-lg-3 col-sm-6 wow fadeInUp`} 
                            data-wow-delay={`${0.1 + (index % 4) * 0.2}s`}
                        >
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i 
                                        className={`fa fa-3x ${getServiceIcon(index)} text-primary mb-4`}
                                    ></i>
                                    <h5>{getServiceTitle(index)}</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const getServiceIcon = (index) => {
    const icons = ["fa-globe", "fa-hotel", "fa-user", "fa-cog"];
    return icons[index % icons.length];
};

const getServiceTitle = (index) => {
    const titles = [
        "WorldWide Tours", 
        "Hotel Reservation", 
        "Travel Guides", 
        "Event Management"
    ];
    return titles[index % titles.length];
};

export default Services;
