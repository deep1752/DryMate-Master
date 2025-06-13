'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Footer = () => {
  const [admin, setAdmin] = useState(null);
  const adminId = 1;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/${adminId}`);
        setAdmin(res.data);
        setIsVisible(true);
      } catch (error) {
        console.error("Failed to fetch admin data");
      }
    };

    fetchAdmin();
  }, [adminId]);

  if (!admin) {
    return <footer className="footer-loading">Loading footer...</footer>;
  }

  return (
    <footer className={`footer ${isVisible ? 'footer-visible' : ''}`}>
   

      <div className="footer-content">
        <div className="footer-grid">
          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h4 className="footer-heading">
              <span className="heading-icon">📬</span>
              Get In Touch
            </h4>
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <p>{admin.address}</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <p>{admin.email}</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <p>{admin.mobile_number}</p>
            </div>
            
            <div className="social-links">
              {admin.twiter_link && (
                <a href={`https://${admin.twiter_link}`} target="_blank" rel="noreferrer" className="social-icon twitter">
                  𝕏
                </a>
              )}
              {admin.fb_link && (
                <a href={`https://${admin.fb_link}`} target="_blank" rel="noreferrer" className="social-icon facebook">
                  fb
                </a>
              )}
              {admin.linkedin_link && (
                <a href={`https://${admin.linkedin_link}`} target="_blank" rel="noreferrer" className="social-icon linkedin">
                  in
                </a>
              )}
              {admin.insta_link && (
                <a href={`https://${admin.insta_link}`} target="_blank" rel="noreferrer" className="social-icon instagram">
                  ig
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <h4 className="footer-heading">
              <span className="heading-icon">🔗</span>
              Quick Links
            </h4>
            <ul className="footer-links">
              <li>
                <Link href="/" className="footer-link">
                  <span className="link-arrow">→</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  <span className="link-arrow">→</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="footer-link">
                  <span className="link-arrow">→</span> Our Mushrooms
                </Link>
              </li>
              <li>
                <Link href="/growing" className="footer-link">
                  <span className="link-arrow">→</span> Growing Guide
                </Link>
              </li>
              <li>
                <Link href="/blog" className="footer-link">
                  <span className="link-arrow">→</span> Mushroom Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h4 className="footer-heading">
              <span className="heading-icon">📰</span>
              Mushroom News
            </h4>
            <p className="newsletter-text">Subscribe for seasonal growing tips and special offers!</p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Your email" 
                className="newsletter-input" 
                required
              />
              <button type="submit" className="newsletter-button">
                Subscribe
                <span className="button-shine"></span>
              </button>
            </form>
            <div className="mushroom-facts">
              <div className="fact-item">
                <span className="fact-icon">🍄</span>
                <span>100% Organic</span>
              </div>
              <div className="fact-item">
                <span className="fact-icon">🍄</span>
                <span>Locally Grown</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} {admin.brand_name || 'Mushroom Magic'}. All rights reserved.
          </p>
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">💰</span>
            <span className="payment-icon">📱</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;