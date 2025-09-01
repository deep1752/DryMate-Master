'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const Home = () => {
    const [adminDetails, setAdminDetails] = useState(null);
    const [trainersCount, setTrainersCount] = useState(0);
    const [activeTab, setActiveTab] = useState('mission');
    const [trainingTab, setTrainingTab] = useState('overview');

    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [trainers, setTrainers] = useState([]);
    const [trainersLoading, setTrainersLoading] = useState(true);
    const router = useRouter();

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

    // Fetch products
    useEffect(() => {
        setProductsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get_all`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                const activeProducts = data.filter(p => p.status === 'active');
                setProducts(activeProducts);
                setProductsLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch products:', err);
                setProductsLoading(false);
            });
    }, []);

    const handleBuyNow = () => {
        router.push(`/product`);
    };

    // Fetch admin details
    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/1`);
                const data = await response.json();
                setAdminDetails(data);
            } catch (error) {
                console.error('Failed to fetch admin details:', error);
            }
        };

        fetchAdminDetails();
    }, []);

    // Fetch trainers count
    useEffect(() => {
        const fetchTrainersCount = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/get_all`);
                const data = await response.json();
                setTrainersCount(data.length);
            } catch (error) {
                console.error('Failed to fetch trainers count:', error);
            }
        };
        fetchTrainersCount();
    }, []);

    // Fetch trainers
    useEffect(() => {
        setTrainersLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/get_all`)
            .then((res) => {
                setTrainers(res.data);
                setTrainersLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching trainers:", err);
                setTrainersLoading(false);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const LoadingSpinner = () => (
        <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );

    return (
        <>
            {/* About Start */}
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

            <section className="hero-section">
                <h2 className="hero-title">About Mushroom Farming</h2>
                <p className="hero-text">
                    Organic, Sustainable & Profitable Mushroom Cultivation
                </p>
                <div className="hero-notes">
                    <div className="note">
                        <h3>🌱 Eco-Friendly</h3>
                        <p>Mushrooms can be grown using agricultural waste, reducing environmental impact.</p>
                    </div>
                    <div className="note">
                        <h3>🏡 Small Space, Big Yield</h3>
                        <p>Requires minimal land and infrastructure for high production.</p>
                    </div>
                    <div className="note">
                        <h3>💰 High Market Demand</h3>
                        <p>Used in food, medicine, and cosmetics, making it a profitable business.</p>
                    </div>
                    <div className="note">
                        <h3>🍄 Nutrient-Rich</h3>
                        <p>Loaded with vitamins, proteins, and antioxidants beneficial for health.</p>
                    </div>
                    <div className="note">
                        <h3>📚 Easy to Learn</h3>
                        <p>Beginner-friendly with numerous training programs available.</p>
                    </div>
                </div>
            </section>

            {/* Program Start */}
            {/* Services Section */}
            <section className="about-services">
                <div className="about-services-container">
                    <div className="about-service-card">
                        <div className="about-service-icon">🍄</div>
                        <h3 className="about-service-title">Training Programs</h3>
                        <p className="about-service-description">Learn everything about mushroom cultivation, from spawn preparation to post-harvest handling.</p>
                        <Link href="/training" className="about-service-link">Read More →</Link>
                    </div>
                    <div className="about-service-card">
                        <div className="about-service-icon">🧺</div>
                        <h3 className="about-service-title">Farming Kits</h3>
                        <p className="about-service-description">Get complete mushroom farming kits with tools, substrate, and guides for beginners and experts.</p>
                        <Link href="/training" className="about-service-link">Read More →</Link>
                    </div>
                    <div className="about-service-card">
                        <div className="about-service-icon">📊</div>
                        <h3 className="about-service-title">Consulting</h3>
                        <p className="about-service-description">Need help setting up your mushroom business? We provide expert consulting and site planning services.</p>
                        <Link href="/contact" className="about-service-link">Read More →</Link>
                    </div>
                </div>
                <div className="about-services-cta">
                    <h2 className="about-services-cta-title">Join Our Training & Get Started</h2>
                    <Link href="/training" className="about-services-cta-button">Start Training</Link>
                </div>
            </section>

            <div className="home-page">
                <h2 className="section-title">Our Products</h2>
                {productsLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="product-slider">
                        {products.map(product => (
                            <div className="slider-card" key={product.id}>
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`}
                                    alt={product.name}
                                    className="slider-image"
                                />
                                <h3 className="slider-name">{product.name}</h3>
                                <p className="slider-price">
                                    <span className="original">₹{product.price}</span>{' '}
                                    <span className="final">₹{product.final_price}</span>
                                </p>
                                <p className="slider-discount">
                                    Save ₹{product.price - product.final_price}
                                </p>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <section className="program-section">
                <div className="section-header">
                    <h2>Our Training Program</h2>
                    <p>Comprehensive learning for aspiring mushroom farmers</p>
                </div>
                <div className="program-tabs">
                    <button
                        className={trainingTab === 'overview' ? 'active' : ''}
                        onClick={() => setTrainingTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={trainingTab === 'modules' ? 'active' : ''}
                        onClick={() => setTrainingTab('modules')}
                    >
                        Modules
                    </button>
                    <button
                        className={trainingTab === 'outcomes' ? 'active' : ''}
                        onClick={() => setTrainingTab('outcomes')}
                    >
                        Outcomes
                    </button>
                </div>
                <div className="tab-content">
                    {trainingTab === 'overview' && (
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
                                    in our state-of-the-art mushroom cultivation facility. You'll learn directly from
                                    experienced growers who have successfully established their own mushroom farms.
                                </p>
                                <ul>
                                    <li>Small class sizes for personalized attention</li>
                                    <li>Comprehensive training manual included</li>
                                    <li>Ongoing mentorship after program completion</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}
                    {trainingTab === 'modules' && (
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
                    {trainingTab === 'outcomes' && (
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

            {/* Team Start */}
            <div className="container px-2 py-4">
                <div className="mb-4 text-center">
                    <h5 className="text-primary text-uppercase">The Team</h5>
                    <h2 className="display-6 text-uppercase mb-0">Expert Trainers</h2>
                </div>
                {trainersLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="row g-2">
                        {trainers.map((trainer) => (
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4" key={trainer.id}>
                                <div className="team-item text-center p-2">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${trainer.image}`}
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
        </>
    );
};

export default Home;