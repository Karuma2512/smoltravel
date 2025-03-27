import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MyTeam.css';

const MyTeam = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Grace",
      location: "New York, USA",
      image: "img/grace.jpg",
      text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    },
    {
      name: "Amelia Waston",
      location: "Los Angeles, USA",
      image: "img/Ame.jpg",
      text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    },
    {
      name: "Tohru",
      location: "Chicago, USA",
      image: "img/tohru.jpg",
      text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    },
    {
      name: "Elma",
      location: "San Francisco, USA",
      image: "img/Elma.jpg",
      text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit."
    }
  ];

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
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div
                className={`testimonial-item ${
                  activeIndex === index ? '' : 'dimmed'
                }`}
              >
                <img
                  className="rounded-circle shadow p-1 mx-auto mb-3"
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />
                <h5 className="mb-0">{testimonial.name}</h5>
                <p>{testimonial.location}</p>
                <p className="mt-2">{testimonial.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MyTeam;
