'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [adminMobile, setAdminMobile] = useState(process.env.NEXT_PUBLIC_ADMIN_MOBILE || '8504893778');

  // Fetch admin details if not provided via env
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ADMIN_MOBILE) return;

    const fetchAdminDetails = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/get_by_id/1`);
        if (!res.ok) throw new Error(`Admin API error: ${res.status}`);
        const data = await res.json();
        if (data?.mobile_number) setAdminMobile(data.mobile_number);
      } catch (error) {
        console.error('Failed to fetch admin mobile:', error);
      }
    };

    fetchAdminDetails();
  }, []);

  // Fetch product list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get_all`);
        const data = await res.json();
        const activeProducts = data.filter(p => p.status === 'active');
        setProducts(activeProducts);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    const message = `Hello, I'm interested in buying:\n\n🛍️ *${product.name}*\n💰 Price: ₹${product.final_price}\n🔖 Save ₹${product.price - product.final_price}\n📝 Description: ${product.discripction}`;
    const whatsappURL = `https://wa.me/${adminMobile}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      <div className="about-hero" style={{ marginTop: '80px' }}>
        <div className="hero-content">
          <h1>Our Products</h1>
          <div className="hero-buttons">
            <Link className="action-btn primary-btn" href="/">Home</Link>
            <Link className="action-btn secondary-btn" href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>

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
                <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>
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
