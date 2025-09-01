'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { user, logout } = useUser();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="mushy-header ">
      <div className="mushy-header__main">
        <div className="mushy-header__brand">
          <Link href="/" className="mushy-header__logo-link">
            <img
              src="/img/final-logo.png"
              alt="DryMate Logo"
              style={{ width: '100px', height: '100px' }}
            />
            <span style={{ fontWeight: 'bold', color: 'black', marginLeft: '30px' }}>
              <h4>DryMate</h4>
              <h6>We Grow Nature’s Superfood.</h6>
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
            {[
              { name: 'Home', path: '/' },
              { name: 'About', path: '/about' },
              { name: 'Products', path: '/product' },
              { name: 'Training', path: '/training' },
              { name: 'Contact', path: '/contact' },
            ].map(({ name, path }) => (
              <li key={name} className="mushy-header__nav-item">
                <Link
                  href={path}
                  className={`mushy-header__nav-link ${pathname === path ? 'is-active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mushy-header__link-icon"></span> {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
