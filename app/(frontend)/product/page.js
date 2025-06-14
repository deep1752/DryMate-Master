'use client';

import React, { useEffect, useState } from 'react';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get_all`)
      .then(res => res.json())
      .then(data => {
        const activeProducts = data.filter(p => p.status === 'active');
        setProducts(activeProducts);
      })
      .catch(err => console.error('Failed to fetch products:', err));
  }, []);

  const handleBuyNow = (product) => {
    const message = `Hello, I'm interested in buying:\n\n🛍️ *${product.name}*\n💰 Price: ₹${product.final_price}\n🔖 Save ₹${product.price - product.final_price}\n📝 Description: ${product.discripction}`;
    const whatsappURL = `https://wa.me/918504893778?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="product-page">
      <h1 className="product-heading">Our Products</h1>
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
  );
};

export default ProductPage;
