import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OurGuide.css';

const OurGuide = () => {
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/staff');
        setStaffMembers(response.data);
      } catch (error) {
        console.error('Error fetching staff members:', error);
      }
    };
    fetchStaff();
  }, []);

  return (
    <div className="travel-guide-container-xxl py-5">
      <div className="travel-guide-container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">Travel Guide</h6>
          <h1 className="mb-5">Meet Our Guide</h1>
        </div>
        <div className="row g-4">
          {staffMembers.map((member, index) => (
            <div key={member.id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay={`${0.1 * (index + 1)}s`}>
              <div className="travel-team-item">
                <div className="overflow-hidden">
                  <img className="img-fluid" src={member.profile_picture_url} alt={member.name} />
                </div>
                <div className="position-relative d-flex justify-content-center" style={{ marginTop: '-19px' }}>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a className="btn btn-square mx-1" href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
                <div className="text-center p-4">
                  <h5 className="mb-0">{member.name}</h5>
                  <small>{member.position}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurGuide;
