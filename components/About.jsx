'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from "axios";
import { trainersAPI, companyAPI, getImageUrl, handleApiError } from '../lib/api';

const About = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [trainersCount, setTrainersCount] = useState(0);
  const [activeTab, setActiveTab] = useState('mission');
  const [trainers, setTrainers] = useState([]);
  const [isTrainersLoading, setIsTrainersLoading] = useState(true); // 👈 New state for trainer loading

  // Fetch company details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await companyAPI.getInfo();
        const data = response.data;
        setAdminDetails(data);
      } catch (error) {
        const { message } = handleApiError(error);
        console.error("Failed to fetch company details:", message);
      }
    };
    fetchCompanyDetails();
  }, []);

  // Fetch team/expert count and trainers data
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await trainersAPI.getAll();
        const data = response.data.trainers || response.data;
        setTrainers(data);
        setTrainersCount(data.length);
      } catch (error) {
        const { message } = handleApiError(error);
        console.error("Error fetching trainers:", message);
      } finally {
        setIsTrainersLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero" style={{ marginTop: '80px' }}>
        <div className="hero-content">
          <h1>About Us</h1>
          <div className="hero-buttons">
            <Link className="action-btn primary-btn" href="/">Home</Link>
            <Link className="action-btn secondary-btn" href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-image-container">
            <img src="/img/mushroom-farm.jpg" alt="Mushroom Farm" className="about-image" />
          </div>
          <div className="about-content">
            <div className="about-header">
              <span className="about-subtitle">About Us</span>
              <h2 className="about-title">Welcome to {adminDetails ? adminDetails.brand_name : 'Our Farm'}</h2>
            </div>
            <p className="about-tagline">Organic, sustainable, and locally grown mushrooms – the future of healthy farming.</p>
            <p className="about-description">
              {adminDetails?.about || "We are dedicated to delivering top-quality mushrooms while promoting sustainable farming practices. Join us in cultivating health, nature, and opportunity."}
            </p>

            <div className="about-tabs">
              <div className="about-tabs-header">
                <button
                  className={`about-tab-button ${activeTab === 'mission' ? 'active' : ''}`}
                  onClick={() => setActiveTab('mission')}
                >
                  Our Mission
                </button>
                <button
                  className={`about-tab-button ${activeTab === 'why-choose' ? 'active' : ''}`}
                  onClick={() => setActiveTab('why-choose')}
                >
                  Why Choose Us
                </button>
              </div>
              <div className="about-tabs-content">
                {activeTab === 'mission' ? (
                  <p className="about-tab-text">
                    We believe in delivering fresh, healthy mushrooms grown with care and expertise. Our mission is to promote green agriculture and empower communities.
                  </p>
                ) : (
                  <p className="about-tab-text">
                    {adminDetails?.why_choose_us || "With experienced cultivators, top-notch facilities, and a passion for sustainability, we bring you the best mushroom farming experience."}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="about-services">
        <div className="about-services-container">
          <div className="about-service-card">
            <div className="about-service-icon">🍄</div>
            <h3 className="about-service-title">Training Programs</h3>
            <p className="about-service-description">Learn everything about mushroom cultivation, from spawn preparation to post-harvest handling.</p>
            <Link href="#" className="about-service-link">Read More →</Link>
          </div>

          <div className="about-service-card">
            <div className="about-service-icon">🧺</div>
            <h3 className="about-service-title">Farming Kits</h3>
            <p className="about-service-description">Get complete mushroom farming kits with tools, substrate, and guides for beginners and experts.</p>
            <Link href="#" className="about-service-link">Read More →</Link>
          </div>

          <div className="about-service-card">
            <div className="about-service-icon">📊</div>
            <h3 className="about-service-title">Consulting</h3>
            <p className="about-service-description">Need help setting up your mushroom business? We provide expert consulting and site planning services.</p>
            <Link href="#" className="about-service-link">Read More →</Link>
          </div>
        </div>

        <div className="about-services-cta">
          <h2 className="about-services-cta-title">Join Our Training & Get Started</h2>
          <Link href="/training" className="about-services-cta-button">Start Training</Link>
        </div>
      </section>

      {/* Team Section */}
      <div className="container px-2 py-4">
        <div className="mb-4 text-center">
          <h5 className="text-primary text-uppercase">The Team</h5>
          <h2 className="display-6 text-uppercase mb-0">Expert Trainers</h2>
        </div>
        {isTrainersLoading ? (
          <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
            <div className="spinner"></div>
          </div>
        ) : trainers.length === 0 ? (
          <div className="text-center text-muted">No trainers found.</div>
        ) : (
          <div className="row g-2">
            {trainers.map((trainer) => (
              <div className="col-4 col-sm-4 col-md-4 col-lg-4" key={trainer.id}>
                <div className="team-item text-center p-2">
                  <img
                    src={getImageUrl(trainer.image?.url || trainer.image)}
                    alt={trainer.name}
                    className="rounded-circle shadow mb-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <h6 className="text-uppercase mb-0">{trainer.name}</h6>
                  <small className="text-secondary text-uppercase d-block mb-2">
                    {trainer.designation}
                  </small>
                  <div>
                    <a
                      className="btn btn-light btn-sm btn-square rounded-circle mx-1"
                      href={trainer.twitter_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-light btn-sm btn-square rounded-circle mx-1"
                      href={trainer.fb_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      className="btn btn-light btn-sm btn-square rounded-circle mx-1"
                      href={trainer.linkedin_link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Team End */}
    </div>
  );
};

export default About;