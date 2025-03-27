import React, { useState } from 'react';
import './booking.css';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateTime: '',
        destination: '1',
        specialRequest: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to an API or process it)
        console.log(formData);
    };

    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="booking p-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-6 text-white">
                            <h6 className="text-white text-uppercase">Booking</h6>
                            <h1 className="text-white mb-4">Online Booking</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <a className="btn btn-outline-light py-3 px-5 mt-2" href="#">Read More</a>
                        </div>
                        <div className="col-md-6">
                            <h1 className="text-white mb-4">Book A Tour</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control bg-transparent"
                                                id="name"
                                                placeholder="Your Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control bg-transparent"
                                                id="email"
                                                placeholder="Your Email"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating date" id="date3" data-target-input="nearest">
                                            <input
                                                type="text"
                                                className="form-control bg-transparent datetimepicker-input"
                                                id="dateTime"
                                                placeholder="Date & Time"
                                                value={formData.dateTime}
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="dateTime">Date & Time</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <select
                                                className="form-select bg-transparent"
                                                id="destination"
                                                value={formData.destination}
                                                onChange={handleChange}
                                            >
                                                <option value="" disabled selected hidden>
                                                    Select Destination
                                                </option>
                                                <option value="1">Destination 1</option>
                                                <option value="2">Destination 2</option>
                                                <option value="3">Destination 3</option>
                                            </select>
                                            <label htmlFor="destination">Destination</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control bg-transparent"
                                                placeholder="Special Request"
                                                id="specialRequest"
                                                value={formData.specialRequest}
                                                onChange={handleChange}
                                                style={{ height: '100px' }}
                                            />
                                            <label htmlFor="specialRequest">Special Request</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-outline-light w-100 py-3" type="submit">
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
