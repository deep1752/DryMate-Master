"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Team = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/get_all`)
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error("Error fetching trainers:", err));
  }, []);

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

      {/* Team Start */}
      <div className="container px-2 py-4">
        <div className="mb-4 text-center">
          <h5 className="text-primary text-uppercase">The Team</h5>
          <h1 className="display-6 text-uppercase mb-0">Expert Trainers</h1>
        </div>
        <div className="row g-2">
          {trainers.map((trainer) => (
            <div className="col-4 col-sm-4 col-md-4 col-lg-4" key={trainer.id}>
              <div className="team-item text-center p-2">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${trainer.image}`}
                  alt={trainer.name}
                  className="rounded-circle shadow mb-2"
                  style={{ width: "100px", height: "100px", objectFit: "cover" }}
                />
                <h6 className="text-uppercase mb-0">{trainer.name}</h6>
                <small className="text-secondary text-uppercase d-block mb-2">
                  {trainer.designation}
                </small>
                <div>
                  <a
                    className="btn btn-light btn-sm btn-square rounded-circle mx-1"
                    href={trainer.twitter_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    className="btn btn-light btn-sm btn-square rounded-circle mx-1"
                    href={trainer.fb_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a
                    className="btn btn-light btn-sm btn-square rounded-circle mx-1"
                    href={trainer.linkedin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Team End */}
    </>
  );
};

export default Team;
