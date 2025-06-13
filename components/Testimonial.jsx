"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <>
            {/* Hero Section */}
            <div className="container-fluid bg-primary p-5 bg-hero mb-5">
                <div className="row py-5">
                    <div className="col-12 text-center">
                        <h1 className="display-2 text-uppercase text-white mb-md-4">
                            What Our Clients Say
                        </h1>
                        <a href="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                            Home
                        </a>
                        <a href="/testimonial" className="btn btn-light py-md-3 px-md-5">
                            Testimonials
                        </a>
                    </div>
                </div>
            </div>

            {/* Testimonial Section */}
            <div className="container-fluid p-0 my-5">
                <div className="row g-0">
                    <div className="col-lg-6" style={{ minHeight: 500 }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute w-100 h-100"
                                src="img/testimonial-5.jpg"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 bg-dark p-5">
                        <div className="mb-5">
                            <h5 className="text-primary text-uppercase">Testimonial</h5>
                            <h1 className="display-3 text-uppercase text-light mb-0">
                                Our Client Say
                            </h1>
                            <Slider {...settings}>
                                {[
                                    {
                                        text: "I attended their mushroom cultivation training and it changed my life. Today, I run a successful mushroom business from home. Highly recommended!",
                                        name: "Anjali Verma",
                                        role: "Mushroom Grower",
                                        image: "/img/testimonial-1.jpg",
                                    },
                                    {
                                        text: "Their spawn quality is top-notch and their team is always ready to help. It's been an amazing journey growing mushrooms with their support.",
                                        name: "Rajesh Kumar",
                                        role: "Small-Scale Farmer",
                                        image: "/img/testimonial-2.jpg",
                                    },
                                    {
                                        text: "Great training, clear guidance, and excellent after-support. If you're serious about mushroom farming, this is the place to start.",
                                        name: "Pooja Sharma",
                                        role: "Entrepreneur",
                                        image: "/img/testimonial-1.jpg",
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="testimonial-item">
                                        <p className="fs-5 fw-normal text-light mb-4">
                                            <i className="fa fa-quote-left text-primary me-3" />
                                            {item.text}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <img
                                                className="rounded-circle testimonial-img"
                                                src={item.image}
                                                alt="client"
                                            />
                                            <div className="ps-4">
                                                <h5 className="text-uppercase text-light mb-1">
                                                    {item.name}
                                                </h5>
                                                <span className="text-uppercase text-secondary">
                                                    {item.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>


                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default Testimonial;
