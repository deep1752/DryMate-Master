'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const About = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [trainersCount, setTrainersCount] = useState(0);
  const [activeTab, setActiveTab] = useState('mission');

  // Fetch admin details
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/1`);
        const data = await response.json();
        setAdminDetails(data);
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      }
    };

    fetchAdminDetails();
  }, []);

  // Fetch team/expert count
  useEffect(() => {
    const fetchTrainersCount = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/get_all`);
        const data = await response.json();
        setTrainersCount(data.length);
      } catch (error) {
        console.error("Failed to fetch team count:", error);
      }
    };

    fetchTrainersCount();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="container-fluid bg-primary p-5 bg-hero mb-5">
        <div className="row py-5">
          <div className="col-12 text-center">
            <h1 className="display-2 text-uppercase text-white mb-md-4">
              About Us
            </h1>
            <Link className="btn btn-primary py-md-3 px-md-5 me-3" href="/">Home</Link>
            <Link className="btn btn-light py-md-3 px-md-5" href="/contact">Contact Us</Link>
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

      {/* Stats Section */}
      <section className="about-stats">
        <div className="about-stats-container">
          <div className="about-stat">
            <div className="about-stat-icon">⭐</div>
            <div className="about-stat-content">
              <span className="about-stat-label">Experience</span>
              <span className="about-stat-value">
                {adminDetails ? adminDetails.expirence_in_year : '...'}
              </span>
            </div>
          </div>

          <div className="about-stat">
            <div className="about-stat-icon">👥</div>
            <div className="about-stat-content">
              <span className="about-stat-label">Our Experts</span>
              <span className="about-stat-value">
                {trainersCount > 0 ? trainersCount : '...'}
              </span>
            </div>
          </div>

          <div className="about-stat">
            <div className="about-stat-icon">✅</div>
            <div className="about-stat-content">
              <span className="about-stat-label">Projects Done</span>
              <span className="about-stat-value">
                {adminDetails ? adminDetails.complet_project_numbers : '...'}
              </span>
            </div>
          </div>

          <div className="about-stat">
            <div className="about-stat-icon">😊</div>
            <div className="about-stat-content">
              <span className="about-stat-label">Happy Clients</span>
              <span className="about-stat-value">
                {adminDetails ? adminDetails.happy_clint_numbers : '...'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;