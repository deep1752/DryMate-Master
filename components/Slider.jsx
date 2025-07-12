'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/slider/get`)
      .then(res => {
        const activeSlides = res.data.filter(slide => slide.status === 'active');
        setSlides(activeSlides);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  return (
    <div className="hero-slider"style={{ marginTop: '80px' }}>
      <div className="slide-wrapper">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide-content ${index === activeIndex ? 'active' : ''}`}
          >
            <div 
              className="slide-background"
              style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}/${slide.image})` }}
            ></div>
            <div className="slide-overlay"></div>
            <div className="slide-text">
              <p className="slide-tagline animate-pop-in">{slide.title}</p>
              {/* <h2 className="slide-heading animate-pop-in delay-1">{slide.subtitle}</h2> */}
              <div className="slide-actions animate-pop-in delay-2">
                <Link className="action-btn primary-btn" href="/training">Join Trainings</Link>
                <Link className="action-btn secondary-btn" href="/contact">Contact Us</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slide-nav">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button 
        className="nav-arrow prev-arrow"
        onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
      >
        &lt;
      </button>
      <button 
        className="nav-arrow next-arrow"
        onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
        aria-label="Next slide"
      >
        &gt;
      </button>
    </div>
  );
};

export default Slider;


