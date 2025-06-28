"use client";
import React from "react";
import Link from "next/link";


const Team = () => {
 
  return (
    <>
      {/* Hero Start */}
      <div className="container-fluid bg-primary p-5 bg-hero mb-5">
        <div className="row py-5">
          <div className="col-12 text-center">
            <h1 className="display-2 text-uppercase text-white mb-md-4">Meet Our Team</h1>
            <Link className="btn btn-primary py-md-3 px-md-5 me-3" href="/">Home</Link>
            <Link className="btn btn-light py-md-3 px-md-5" href="/blog">Blog</Link>
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* Mushroom Farming Training Section */}
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img
              src="/img/detail_harvesting.jpg"
              alt="Mushroom Training"
              className="img-fluid rounded shadow"
              style={{ height: "380px", objectFit: "cover", width: "100%" }}
            />

          </div>
          <div className="col-lg-6">
            <h5 className="text-primary text-uppercase">Mushroom Training</h5>
            <h2 className="display-5 text-uppercase mb-3">Learn to Cultivate Different Varieties Of Mushroom </h2>
            <p className="mb-3">
              Our training programs cover the cultivation techniques of various Indian mushroom varieties including
              Oyster, Button, Milky, Shiitake, and more. We provide hands-on experience with growing environments,
              substrate preparation, spawn management, and disease control.
            </p>
            <p className="mb-3">
              In addition to cultivation, our experts guide you on setting up your own mushroom farm and navigating
              the Indian mushroom market. You'll receive support in marketing, supply chain, and connecting with buyers.
            </p>
            <Link href="/training" className="btn btn-primary px-4 py-2">Explore Training Details</Link>
          </div>
        </div>
      </div>
      {/* End Mushroom Farming Training Section */}

      
    </>
  );
};

export default Team;
