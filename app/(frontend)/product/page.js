'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [adminMobile, setAdminMobile] = useState('918504893778'); // fallback

  // Fetch products
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get_all`)
      .then(res => res.json())
      .then(data => {
        const activeProducts = data.filter(p => p.status === 'active');
        setProducts(activeProducts);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);


  // Fetch admin mobile number
  useEffect(() => {
    const fetchAdminMobile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/1`);
        const data = await response.json();
        if (data?.mobile_number) {
          const formatted = data.mobile_number.startsWith('91') ? data.mobile_number : `91${data.mobile_number}`;
          setAdminMobile(formatted);
        }
      } catch (error) {
        console.error('Failed to fetch admin mobile number:', error);
      }
    };

    fetchAdminMobile();
  }, []);


  const handleBuyNow = (product) => {
    const message = `
Hello, I'm interested in buying this product:

*Product:* ${product.name}
*Price:* ₹${product.final_price}
*You Save:* ₹${product.price - product.final_price}
*Description:* ${product.discripction}

Please let me know how to proceed.
  `;
    const whatsappURL = `https://wa.me/${adminMobile}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };


  return (
    <>
      {/* Hero Start */}
      <div className="about-hero" style={{ marginTop: '80px' }}>
        <div className="hero-content">
          <h1>Our Products</h1>
          <div className="hero-buttons">
            <Link className="action-btn primary-btn" href="/">Home</Link>
            <Link className="action-btn secondary-btn" href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
      {/* Hero End */}

      <div className="product-page">
        <div className="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${product.image}`}
                alt={product.name}
                className="product-image"
              />
              <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-desc">{product.discripction}</p>
                <p className="product-price">
                  <span className="original-price">₹{product.price}</span>{' '}
                  <span className="final-price">₹{product.final_price}</span>
                </p>
                <p className="product-discount">Save ₹{product.price - product.final_price}</p>
                <button
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(product)}
                >
                  Buy Now on WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
