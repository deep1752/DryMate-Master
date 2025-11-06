'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { slidersAPI, getImageUrl, handleApiError } from '../lib/api';

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await slidersAPI.getAll({ status: 'active' });
        const activeSlides = response.data.sliders || response.data;
        setSlides(activeSlides.filter(slide => slide.status === 'active'));
      } catch (error) {
        const { message } = handleApiError(error);
        console.error('Error fetching sliders:', message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSliders();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [slides]);

  // Conditional rendering based on isLoading state
  if (isLoading) {
    return (
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '80px' }}>
        <div className="spinner"></div> {/* 👈 The loader element */}
      </div>
    );
  }

  // The rest of the slider component
  return (
    <div className="hero-slider" style={{ marginTop: '80px' }}>
      <div className="slide-wrapper">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide-content ${index === activeIndex ? 'active' : ''}`}
          >
            <div 
              className="slide-background"
              style={{ backgroundImage: `url(${getImageUrl(slide.image?.url || slide.image)})` }}
            ></div>
            <div className="slide-overlay"></div>
            <div className="slide-text">
              <p className="slide-tagline animate-pop-in">{slide.title}</p>
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