'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import { useAdmin } from '@/context/AdminContext';
  

const MushroomTrainingPage = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { mobileNumber } = useAdmin();

    const trainingModules = [
        {
            title: "Introduction to Mushroom Cultivation",
            topics: ["Mushroom biology", "Species selection", "Market overview"]
        },
        {
            title: "Growing Techniques",
            topics: ["Substrate preparation", "Inoculation methods", "Climate control"]
        },
        {
            title: "Organic Practices",
            topics: ["Natural pest control", "Sustainable materials", "Certification"]
        },
        {
            title: "Harvest & Post-Harvest",
            topics: ["Optimal harvesting", "Storage techniques", "Packaging"]
        }
    ];

    const mushroomTypes = [
        {
            name: "Button Mushroom",
            image: "/img/button.jpg",
            points: [
                "Most commonly cultivated variety",
                "Grows well on composted substrate",
                "Ideal temperature: 22-25°C",
                "Harvest in 3-4 weeks"
            ]
        },
        {
            name: "Oyster Mushroom",
            image: "/img/oyster.jpg",
            points: [
                "Easiest to grow for beginners",
                "Grows on straw, sawdust, or coffee grounds",
                "Fast growing (2-3 weeks)",
                "High demand in local markets"
            ]
        },
        {
            name: "Cordyceps Mushroom",
            image: "/img/cordyceps.jpg",
            points: [
                "High-value medicinal mushroom",
                "Requires specific growing conditions",
                "Longer cultivation period (8-10 weeks)",
                "Used in traditional medicine"
            ]
        }
    ];

    const redirectToWhatsApp = (message) => {
        const phoneNumber = mobileNumber || "8504893778"; // fallback number
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };


    return (
        <>
            {/* Hero Start */}
            <div className="about-hero" style={{ marginTop: '80px' }}>
                <div className="hero-content">
                    <h1>Mushroom Training Programs</h1>

                    <div className="hero-buttons">
                        <Link className="action-btn primary-btn" href="/">Home</Link>
                        <Link className="action-btn secondary-btn" href="/contact">Contact Us</Link>
                    </div>
                </div>
            </div>
            {/* Hero End */}

            <div className="mushroom-training-page">
                {/* Benefits Showcase */}
                <section className="benefits-section">
                    <div className="section-header">
                        <h2>Why Mushroom Farming?</h2>
                        <p>Discover the advantages of this sustainable agricultural practice</p>
                    </div>

                    <div className="benefits-grid">
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="benefit-card"
                        >
                            <div className="benefit-icon">🌱</div>
                            <h3>Quick Returns</h3>
                            <p>Harvest in as little as 3 weeks with proper techniques</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="benefit-card"
                        >
                            <div className="benefit-icon">♻️</div>
                            <h3>Sustainable</h3>
                            <p>Grows on agricultural waste with minimal environmental impact</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="benefit-card"
                        >
                            <div className="benefit-icon">🏙️</div>
                            <h3>Space Efficient</h3>
                            <p>Can be grown vertically in small urban spaces</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="benefit-card"
                        >
                            <div className="benefit-icon">💰</div>
                            <h3>High Demand</h3>
                            <p>Growing market for organic, locally-grown mushrooms</p>
                        </motion.div>
                    </div>

                </section>

                {/* Mushroom Types Section */}
                <section className="mushroom-types-section">
                    <div className="section-header">
                        <h2>Popular Mushroom Varieties We Teach</h2>
                        <p>Learn to grow different types with our expert guidance</p>
                    </div>

                    <div className="mushroom-types-grid">
                        {mushroomTypes.map((mushroom, index) => (
                            <motion.div
                                key={index}
                                className="mushroom-type-card"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="mushroom-image">
                                    <img src={mushroom.image} alt={mushroom.name} />
                                </div>
                                <div className="mushroom-details">
                                    <h3>{mushroom.name}</h3>
                                    <ul>
                                        {mushroom.points.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="btn inquire-btn"
                                        onClick={() => redirectToWhatsApp(`I'm interested in ${mushroom.name} training`)}
                                    >
                                        Inquire About {mushroom.name}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Simple Steps Section */}
                <section className="simple-steps-section">
                    <div className="section-header">
                        <h2>Mushroom Farming Made Simple</h2>
                        <p>Follow these basic steps to start your mushroom farm</p>
                    </div>

                    <div className="steps-container">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Choose Your Mushroom</h3>
                            <p>Select the right variety based on your climate and market demand</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Prepare Substrate</h3>
                            <p>Create growing medium (straw, sawdust, or compost)</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Inoculate</h3>
                            <p>Introduce mushroom spawn to the substrate</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">4</div>
                            <h3>Incubate</h3>
                            <p>Keep in dark, humid conditions for mycelium growth</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">5</div>
                            <h3>Fruit & Harvest</h3>
                            <p>Expose to light and fresh air for mushrooms to appear</p>
                        </div>
                    </div>
                </section>
                <section className="program-section">
                    <div className="section-header">
                        <h2>Our Training Program</h2>
                        <p>Comprehensive learning for aspiring mushroom farmers</p>
                    </div>

                    <div className="program-tabs">
                        <button
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={activeTab === 'modules' ? 'active' : ''}
                            onClick={() => setActiveTab('modules')}
                        >
                            Modules
                        </button>
                        <button
                            className={activeTab === 'outcomes' ? 'active' : ''}
                            onClick={() => setActiveTab('outcomes')}
                        >
                            Outcomes
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="overview-content"
                            >
                                <div className="overview-image">
                                    <img src="/img/mushroom3.jpg" alt="Training Overview" />
                                </div>
                                <div className="overview-text">
                                    <h3>Hands-On Learning Experience</h3>
                                    <p>
                                        Our intensive program combines classroom instruction with practical, hands-on training
                                        in our state-of-the-art mushroom cultivation facility. You&#39;ll learn directly from experienced growers who have successfully established their own mushroom farms.
                                    </p>
                                    <ul>
                                        <li>Small class sizes for personalized attention</li>
                                        <li>Comprehensive training manual included</li>
                                        <li>Ongoing mentorship after program completion</li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'modules' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="modules-content"
                            >
                                {trainingModules.map((module, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="module-card"
                                    >
                                        <h3>{module.title}</h3>
                                        <ul>
                                            {module.topics.map((topic, i) => (
                                                <li key={i}>{topic}</li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}

                        {activeTab === 'outcomes' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="outcomes-content"
                            >
                                <div className="outcome-item">
                                    <div className="outcome-number">1</div>
                                    <div className="outcome-text">
                                        <h3>Start Your Own Farm</h3>
                                        <p>Gain the knowledge and confidence to establish your mushroom cultivation operation</p>
                                    </div>
                                </div>
                                <div className="outcome-item">
                                    <div className="outcome-number">2</div>
                                    <div className="outcome-text">
                                        <h3>Increase Yield</h3>
                                        <p>Learn techniques to maximize production and minimize losses</p>
                                    </div>
                                </div>
                                <div className="outcome-item">
                                    <div className="outcome-number">3</div>
                                    <div className="outcome-text">
                                        <h3>Market Access</h3>
                                        <p>Connect with buyers and learn effective marketing strategies</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>




            </div>


        </>
    );
};

export default MushroomTrainingPage;