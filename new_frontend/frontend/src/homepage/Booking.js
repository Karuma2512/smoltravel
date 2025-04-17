import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './booking.css';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dateTime: '',
        destination: '',
        specialRequest: '',
        number_of_people: 1
    });

    const [message, setMessage] = useState('');
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // Lấy danh sách điểm đến từ API
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/packages');
                setDestinations(response.data);
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        };
        fetchDestinations();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const bookingData = {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                package_id: formData.destination,  // Thêm destination
                booking_date: formData.dateTime,  // Thêm dateTime
                number_of_people: formData.number_of_people,  // Thêm number_of_people
                special_request: formData.specialRequest,  // Thêm specialRequest
                status: 'pending',  // Thêm status là 'pending'
                payment_status: 'unpaid',  // Thêm payment_status là 'unpaid'
            };

            const response = await axios.post(
                'http://localhost:8000/api/bo   okings',
                bookingData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Reset form data sau khi gửi thành công
            setFormData({
                name: '',
                email: '',
                phone: '',
                dateTime: '',
                destination: '',
                specialRequest: '',
                number_of_people: 1,
            });

        
        } catch (error) {
            console.error("Booking failed:", error.response ? error.response.data : error.message);
            setMessage('Booking failed. Please try again.');
        }
    };
    return (
        <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
            <div className="container">
                <div className="booking p-5">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-6 text-white">
                            <h6 className="text-white text-uppercase">Booking</h6>
                            <h1 className="text-white mb-4">Online Booking</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.</p>
                        </div>
                        <div className="col-md-6">
                            <h1 className="text-white mb-4">Book A Tour</h1>
                            {message && <p className="alert alert-info">{message}</p>}
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
                                                required
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
                                                required
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="date"
                                                className="form-control bg-transparent"
                                                id="dateTime"
                                                placeholder="Date & Time"
                                                value={formData.dateTime}
                                                onChange={handleChange}
                                                required
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
                                                required
                                            >
                                                <option value="" disabled hidden>Select Destination</option>
                                                {destinations.map((dest) => (
                                                    <option key={dest.id} value={dest.id}>
                                                        {dest.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <label htmlFor="destination">Destination</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="number"
                                                className="form-control bg-transparent"
                                                id="number_of_people"
                                                value={formData.number_of_people}
                                                onChange={handleChange}
                                                min="1"
                                                required
                                            />
                                            <label htmlFor="number_of_people">Number of People</label>
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
