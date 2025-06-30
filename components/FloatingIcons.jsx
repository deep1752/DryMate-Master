'use client';

import { useAdmin } from '@/context/AdminContext';

const FloatingIcons = () => {
  const { mobileNumber } = useAdmin();

  return (
    <div className="floating-contact-icons">
      <a
        href={`https://wa.me/${mobileNumber}`}
        className="whatsapp-icon"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
      <a href={`tel:${mobileNumber}`} className="call-icon" aria-label="Call Us">
        <i className="bi bi-telephone-fill"></i>
      </a>
      <a href="#" className="custom-back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
};

export default FloatingIcons;
