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
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading || !admin) {
    return null;
  }

  return (
    <header className="mushy-header">
      {/* Main Navigation */}
      <div className="mushy-header__main">
        <div className="mushy-header__brand">
          <Link href="/" className="mushy-header__logo-link">
            <img
              src="/img/new-logo-2.jpg"
              alt="DryMate Logo"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover'
              }}
            />

            <span style={{ fontWeight: 'bold', color: 'black', marginLeft: '20px' }}>
              Organic Mushroom Farming
            </span>


          </Link>
        </div>

        <button
          className={`mushy-header__hamburger ${isMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="mushy-header__hamburger-box">
            <span className="mushy-header__hamburger-inner"></span>
          </span>
        </button>

        <nav className={`mushy-header__nav ${isMenuOpen ? 'is-visible' : ''}`}>
          <ul className="mushy-header__nav-list">
            <li className="mushy-header__nav-item">
              <Link
                href="/"
                className={`mushy-header__nav-link ${pathname === '/' ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mushy-header__link-icon"></span> Home
              </Link>
            </li>
            <li className="mushy-header__nav-item">
              <Link
                href="/about"
                className={`mushy-header__nav-link ${pathname === '/about' ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mushy-header__link-icon"></span> About
              </Link>
            </li>
            <li className="mushy-header__nav-item">
              <Link
                href="/product"
                className={`mushy-header__nav-link ${pathname === '/product' ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mushy-header__link-icon"></span> Products
              </Link>
            </li>
            <li className="mushy-header__nav-item">
              <Link
                href="/training"
                className={`mushy-header__nav-link ${pathname === '/training' ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mushy-header__link-icon"></span> Training
              </Link>
            </li>
            <li className="mushy-header__nav-item">
              <Link
                href="/contact"
                className={`mushy-header__nav-link ${pathname === '/contact' ? 'is-active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mushy-header__link-icon"></span> Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;