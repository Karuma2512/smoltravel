import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MyTeam.css';

const MyTeam = () => {
  const [coFounders, setCoFounders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCoFounders = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/co-founders');
        setCoFounders(response.data);
      } catch (error) {
        console.error('Error fetching Co-Founders:', error);
      }
    };

    fetchCoFounders();
  }, []);

  return (
    <div className="container-xxl py-5">
      <div className="container text-center">
        <h6 className="section-title bg-white text-center text-primary px-3">Co-Founder</h6>
        <h1 className="mb-5">Our Co-Founder Say!!!</h1>

        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="testimonial-carousel"
        >
          {coFounders.map((coFounder, index) => (
            <SwiperSlide key={index}>
              <div className={`testimonial-item ${activeIndex === index ? '' : 'dimmed'}`}>
                <img
                  className="rounded-circle shadow p-1 mx-auto mb-3"
                  src={coFounder.profile_picture_url}
                  alt={coFounder.name}
                  style={{ width: '130px', height: '130px' }}
                />
                <h5 className="mb-0"><strong>{coFounder.name}</strong></h5>
                <p>{coFounder.position}</p>
                <p className="mt-2">{coFounder.bio}</p>
                <div className="social-icons mt-2 d-flex justify-content-center">
                  {coFounder.linkedin && (
                    <a
                      href={coFounder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-square mx-1"
                    >
                      <i className="fab fa-linkedin" style={{ color: '#0A66C2', fontSize: '24px' }}></i>
                    </a>
                  )}
                  {coFounder.twitter && (
                    <a
                      href={coFounder.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-square mx-1"
                    >
                      <i className="fab fa-twitter" style={{ color: '#1DA1F2', fontSize: '24px' }}></i>
                    </a>
                  )}
                  {coFounder.instagram && (
                    <a
                      href={coFounder.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-square mx-1"
                    >
                      <i className="fab fa-instagram" style={{ color: '#E4405F', fontSize: '24px' }}></i>
                    </a>
                  )}
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MyTeam;
