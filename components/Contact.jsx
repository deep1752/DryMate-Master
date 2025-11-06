"use client";

import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert({ message: '', type: '' });

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/contact/post`, formData);
            setAlert({
                message: 'Message sent successfully! We will get back to you soon.',
                type: 'success'
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.detail ||
                'Error sending message. Please try again later.';
            setAlert({
                message: errorMessage,
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Hero Start */}

            <div className="about-hero" style={{ marginTop: '80px' }}>
                <div className="hero-content">
                    <h1>Contact Us</h1>
                    <div className="hero-buttons">
                        <Link className="action-btn primary-btn" href="/">Home</Link>
                        <Link className="action-btn secondary-btn" href="/about">About Us</Link>
                    </div>
                </div>
            </div>
            {/* Hero End */}

            <div className="container-fluid p-5">
                <div className="row g-0">
                    <div className="col-lg-6">
                        <div className="bg-dark p-5">
                            {alert.message && (
                                <div className={`alert alert-${alert.type === 'success' ? 'success' : 'danger'} mb-4`}>
                                    {alert.message}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-6">
                                        <input
                                            name="name"
                                            type="text"
                                            className="form-control bg-light border-0 px-4"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            style={{ height: 55 }}
                                            required
                                        />
                                    </div>
                                    <div className="col-6">
                                        <input
                                            name="email"
                                            type="email"
                                            className="form-control bg-light border-0 px-4"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            style={{ height: 55 }}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            name="subject"
                                            type="text"
                                            className="form-control bg-light border-0 px-4"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            style={{ height: 55 }}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <textarea
                                            name="message"
                                            className="form-control bg-light border-0 px-4 py-3"
                                            rows={4}
                                            placeholder="Message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <button
                                            className="btn btn-primary w-100 py-3"
                                            type="submit"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                                    Sending...
                                                </>
                                            ) : 'Send Message'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center bg-light p-5">
                        <div>
                            <h3 className="mb-4 text-dark">Why Choose <span className="text-success">DryMate</span>?</h3>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    ✅ <strong>Organic Farming Training:</strong> Learn sustainable mushroom cultivation techniques from experts.
                                </li>
                                <li className="mb-3">
                                    ✅ <strong>Fresh & Dried Mushrooms:</strong> 100% organic, hand-picked, and packaged with care.
                                </li>
                                <li className="mb-3">
                                    ✅ <strong>Certified Quality:</strong> No chemicals, just natural goodness in every product.
                                </li>
                                <li className="mb-3">
                                    ✅ <strong>Mushroom-Based Products:</strong> Try our teas, snacks, powders, and more!
                                </li>
                                <li className="mb-3">
                                    ✅ <strong>Support for Farmers:</strong> We empower local growers with knowledge and market access.
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;