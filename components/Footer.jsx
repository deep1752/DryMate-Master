'use client';

import React from 'react';
import Link from 'next/link';
import { useAdmin } from '@/context/AdminContext';

const Footer = () => {
  const { admin, mobileNumber } = useAdmin();

  return (
    <footer className="footer footer-visible">
      <div className="footer-content">
        <div className="footer-grid">

          {/* Contact Info */}
          <div className="footer-section contact-section">
            <h4 className="footer-heading">
              <span className="heading-icon">📬</span> Get In Touch
            </h4>
            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <p>{admin?.companyEmail || 'drymatemushroom007@gmail.com'}</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <p>{admin?.companyMobile || mobileNumber || "9636642396"}</p>
            </div>

            <div className="social-links-container">
              {admin?.fbLink && (
                <a href={admin.fbLink} target="_blank" rel="noreferrer" className="social-link facebook" aria-label="Facebook">
                  <span className="social-icon">fb</span>
                </a>
              )}
              {admin?.instaLink && (
                <a href={admin.instaLink} target="_blank" rel="noreferrer" className="social-link instagram" aria-label="Instagram">
                  <span className="social-icon">ig</span>
                </a>
              )}
              {admin?.linkedinLink && (
                <a href={admin.linkedinLink} target="_blank" rel="noreferrer" className="social-link linkedin" aria-label="LinkedIn">
                  <span className="social-icon">in</span>
                </a>
              )}
              {/* {admin?.twitterLink && (
                <a href={admin.twitterLink} target="_blank" rel="noreferrer" className="social-link twitter" aria-label="Twitter">
                  <span className="social-icon">tw</span>
                </a>
              )}
              {admin?.youtubeLink && (
                <a href={admin.youtubeLink} target="_blank" rel="noreferrer" className="social-link youtube" aria-label="YouTube">
                  <span className="social-icon">yt</span>
                </a>
              )} */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section links-section">
            <h4 className="footer-heading">
              <span className="heading-icon">🔗</span> Quick Links
            </h4>
            <ul className="footer-links">
              <li><Link href="/" className="footer-link"><span className="link-arrow">→</span> Home</Link></li>
              <li><Link href="/about" className="footer-link"><span className="link-arrow">→</span> About Us</Link></li>
              <li><Link href="/product" className="footer-link"><span className="link-arrow">→</span> Our Mushrooms</Link></li>
              <li><Link href="/training" className="footer-link"><span className="link-arrow">→</span> Training Programs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section newsletter-section">
            <h4 className="footer-heading">
              <span className="heading-icon">📰</span> {admin?.companyName || 'DryMate Mushrooms'}
            </h4>
            <p className="newsletter-text">Subscribe for seasonal growing tips and special offers!</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email" className="newsletter-input" required />
              <button type="submit" className="newsletter-button">
                Subscribe<span className="button-shine"></span>
              </button>
            </form>
            <div className="mushroom-facts">
              <div className="fact-item"><span className="fact-icon">🍄</span><span>100% Organic</span></div>
              <div className="fact-item"><span className="fact-icon">🍄</span><span>Locally Grown</span></div>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {new Date().getFullYear()} {admin?.companyName || 'DryMate Mushrooms'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
