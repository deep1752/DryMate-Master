'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '../context/UserContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user, logout } = useUser();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);


  const adminId = 1;

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/${adminId}`);
        setAdmin(response.data);
      } catch (error) {
        console.error("Failed to fetch admin details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [adminId]);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !admin) {
    return null;
  }



  return (
    <header className="mushroom-header">
      {/* Top Contact Bar */}
      <div className="header-top-bar">
        <div className="header-contact-info">
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>{admin.email}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>{admin.mobile_number}</span>
          </div>
        </div>

        <div
          className="header-social-links"
          style={{ display: isMobile ? "none" : "flex" }}
        >
          {admin.fb_link && (
            <a
              href={`https://${admin.fb_link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon facebook"
            >
              fb
            </a>
          )}
          {admin.twiter_link && (
            <a
              href={`https://${admin.twiter_link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon twitter"
            >
              𝕏
            </a>
          )}
          {admin.linkedin_link && (
            <a
              href={`https://${admin.linkedin_link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon linkedin"
            >
              in
            </a>
          )}
          {admin.insta_link && (
            <a
              href={`https://${admin.insta_link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon instagram"
            >
              ig
            </a>
          )}
          {admin.youtube_link && (
            <a
              href={`https://${admin.youtube_link}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon youtube"
            >
              yt
            </a>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="header-main">
        <div className="header-logo">
          <Link href="/">
            <img
              src="/img/logo.png"
              alt="Mushroom Farms Logo"
              className="logo-image"
            />
            <span className="logo-text">{admin.brand_name || "Mushroom Farms"}</span>
          </Link>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <nav className={`header-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === '/' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/product"
                className={`nav-link ${pathname === '/product' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/blog"
                className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/team"
                className={`nav-link ${pathname === '/team' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> Our Team
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/training"
                className={`nav-link ${pathname === '/training' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> Training
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="link-icon"></span> Contact
              </Link>
            </li>
          </ul>

          {/* <div className="header-auth">
            {user ? (
              <div className="user-dropdown">
                <button className="user-button">
                  <span className="user-avatar">👤</span>
                  <span className="user-name">{user.first_name || "User"}</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="dropdown-menu">
                  <Link href="/profile" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  <Link href="/profile/change-password" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    Change Password
                  </Link>
                  <button className="dropdown-item logout" onClick={() => { logout(); setIsMenuOpen(false); }}>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/join" className="join-button" onClick={() => setIsMenuOpen(false)}>
                Join Us
                <span className="button-shine"></span>
              </Link>
            )}
          </div> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;