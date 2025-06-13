"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const TrainingPage = () => {
    return (
        <>
            {/* Hero Section */}
            <motion.div 
                className="container-fluid bg-primary p-5 bg-hero mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="row py-5">
                    <div className="col-12 text-center">
                        <motion.h1 
                            className="display-2 text-uppercase text-white mb-md-4"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            Professional Mushroom Farming Training
                        </motion.h1>
                        <motion.p 
                            className="lead mb-4 text-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Comprehensive hands-on training in cultivation, processing, and marketing of various mushroom varieties
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <Link className="btn btn-primary py-md-3 px-md-5 me-3" href="/">Home</Link>
                            <Link className="btn btn-light py-md-3 px-md-5" href="/contact">Enroll Now</Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* About Training */}
            <div className="container py-5">
                <motion.div 
                    className="row align-items-center g-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <motion.div className="col-lg-6" variants={itemVariants}>
                        <motion.img
                            src="/img/mushroom-detail.jpg"
                            alt="Mushroom Training"
                            className="img-fluid rounded shadow"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                        <motion.div 
                            className="mt-4 p-4 bg-light rounded"
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h4 className="text-uppercase mb-3">Quick Facts</h4>
                            <ul className="list-unstyled">
                                <li className="mb-2"><strong>Duration:</strong> 4 Weeks (Weekend batches available)</li>
                                <li className="mb-2"><strong>Training Mode:</strong> 70% Practical, 30% Theory</li>
                                <li className="mb-2"><strong>Batch Size:</strong> Limited to 15 participants per batch</li>
                                <li className="mb-2"><strong>Location:</strong> Our farm + Online sessions</li>
                            </ul>
                        </motion.div>
                    </motion.div>
                    <motion.div className="col-lg-6" variants={itemVariants}>
                        <h2 className="text-uppercase mb-4">Comprehensive Training Program</h2>
                        <p className="lead">
                            Our intensive mushroom farming training equips you with complete knowledge from basic cultivation to commercial production.
                        </p>
                        <p>
                            You'll learn about all aspects of mushroom cultivation including:
                        </p>
                        <ul className="mb-4">
                            <li>🍄 Detailed study of Oyster, Button, Milky, Shiitake, and medicinal mushrooms</li>
                            <li>🌱 Substrate preparation and sterilization techniques</li>
                            <li>🧫 Spawn production and inoculation methods</li>
                            <li>🏭 Small-scale and commercial production systems</li>
                            <li>📊 Business planning and profitability analysis</li>
                        </ul>
                        <motion.div 
                            className="alert alert-info"
                            whileHover={{ scale: 1.02 }}
                        >
                            <strong>Special Feature:</strong> Includes a free starter kit with spawn, substrate materials, and cultivation guide!
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Benefits Section */}
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <motion.h3 
                        className="text-center text-uppercase mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Our Training Stands Out
                    </motion.h3>
                    <motion.div 
                        className="row g-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {[
                            {
                                icon: "fas fa-hands-helping",
                                color: "text-success",
                                title: "Expert Trainers",
                                text: "Learn from industry experts with 15+ years of mushroom farming experience and PhDs in mycology."
                            },
                            {
                                icon: "fas fa-seedling",
                                color: "text-primary",
                                title: "Complete Practical Exposure",
                                text: "Hands-on training in our 2-acre mushroom farm with all equipment and facilities."
                            },
                            {
                                icon: "fas fa-business-time",
                                color: "text-warning",
                                title: "Business Support",
                                text: "1-year mentorship including market linkages, buyer contacts, and troubleshooting support."
                            }
                        ].map((item, index) => (
                            <motion.div 
                                className="col-md-4 text-center" 
                                key={index}
                                variants={itemVariants}
                            >
                                <motion.div 
                                    className="p-4 h-100 bg-white rounded shadow-sm"
                                    whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <i className={`${item.icon} fa-3x ${item.color} mb-3`}></i>
                                    <h5 className="text-uppercase">{item.title}</h5>
                                    <p>{item.text}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Detailed Course Modules */}
            <div className="container py-5">
                <motion.h3 
                    className="text-uppercase text-center mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Detailed Course Curriculum
                </motion.h3>
                <motion.div 
                    className="row"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                >
                    {[
                        {
                            title: "Week 1: Fundamentals",
                            items: [
                                "✅ Introduction to mushroom biology and types",
                                "✅ Market potential and business opportunities",
                                "✅ Infrastructure requirements for mushroom farming",
                                "✅ Understanding spawn and substrate preparation",
                                "✅ Demonstration: Preparing wheat straw substrate"
                            ]
                        },
                        {
                            title: "Week 2: Cultivation Techniques",
                            items: [
                                "✅ Step-by-step cultivation process for Oyster mushrooms",
                                "✅ Button mushroom composting techniques",
                                "✅ Temperature and humidity management",
                                "✅ Pest and disease control measures",
                                "✅ Practical: Bag preparation and spawning"
                            ]
                        },
                        {
                            title: "Week 3: Advanced Methods",
                            items: [
                                "✅ Cultivation of specialty mushrooms (Shiitake, Reishi)",
                                "✅ Low-cost technologies for rural entrepreneurs",
                                "✅ Post-harvest handling and preservation",
                                "✅ Value-added products (pickles, powder, chips)",
                                "✅ Practical: Mushroom drying and powder making"
                            ]
                        },
                        {
                            title: "Week 4: Business Development",
                            items: [
                                "✅ Developing a business plan",
                                "✅ Marketing strategies and brand building",
                                "✅ Government schemes and subsidies",
                                "✅ Quality standards and certification",
                                "✅ Practical: Visit to local markets and processing units"
                            ]
                        }
                    ].map((module, index) => (
                        <motion.div 
                            className="col-md-6 mb-4" 
                            key={index}
                            variants={itemVariants}
                        >
                            <motion.div 
                                className="card h-100"
                                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                            >
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">{module.title}</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {module.items.map((item, i) => (
                                            <motion.li 
                                                className="list-group-item" 
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Investment Section */}
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <motion.div 
                            className="text-center mb-5"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-uppercase mb-3">Training Investment</h3>
                            <p className="lead">Quality training at an affordable cost with flexible payment options</p>
                        </motion.div>
                        <motion.div 
                            className="row g-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            {[
                                {
                                    type: "Basic Package",
                                    price: "₹8,999",
                                    features: [
                                        "✅ 4-week training program",
                                        "✅ Training manual and materials",
                                        "✅ Field visits and practical sessions",
                                        "✅ Certificate of completion",
                                        "❌ No starter kit included"
                                    ],
                                    color: "primary"
                                },
                                {
                                    type: "Premium Package",
                                    price: "₹14,999",
                                    features: [
                                        "✅ Everything in Basic Package",
                                        "✅ Complete starter kit (worth ₹3,500)",
                                        "✅ 6 months mentorship support",
                                        "✅ Business setup consultation",
                                        "✅ Market linkage assistance"
                                    ],
                                    color: "success"
                                }
                            ].map((pkg, index) => (
                                <motion.div 
                                    className="col-md-6" 
                                    key={index}
                                    variants={itemVariants}
                                >
                                    <motion.div 
                                        className={`card h-100 border-${pkg.color}`}
                                        whileHover={{ scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <div className={`card-header bg-${pkg.color} text-white text-center py-3`}>
                                            <h4 className="mb-0">{pkg.type}</h4>
                                        </div>
                                        <div className="card-body">
                                            <motion.h2 
                                                className="card-title text-center py-3"
                                                initial={{ scale: 0.9 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: "spring" }}
                                            >
                                                {pkg.price}
                                            </motion.h2>
                                            <ul className="list-group list-group-flush mb-4">
                                                {pkg.features.map((feature, i) => (
                                                    <motion.li 
                                                        className="list-group-item" 
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        {feature}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div 
                            className="mt-5 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="alert alert-warning d-inline-block">
                                <strong>Early Bird Offer:</strong> Get 15% off on Premium Package if you enroll before 30th November!
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="container-fluid bg-light py-5">
                <div className="container">
                    <motion.h3 
                        className="text-center text-uppercase mb-5"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Frequently Asked Questions
                    </motion.h3>
                    <motion.div 
                        className="accordion" 
                        id="faqAccordion"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {[
                            {
                                question: "What are the prerequisites for joining the training?",
                                answer: "No prior knowledge is required. The training is designed for complete beginners as well as experienced farmers looking to diversify. Basic understanding of agriculture is helpful but not mandatory."
                            },
                            {
                                question: "Can I do this training part-time while working?",
                                answer: "Yes! We offer weekend batches (Saturday-Sunday) specifically designed for working professionals. The total duration will be 6 weekends in this case."
                            },
                            {
                                question: "What is included in the starter kit?",
                                answer: "The premium starter kit includes: 50 ready-to-fruit mushroom bags, 5kg of spawn, substrate materials, spray bottle, humidity meter, cultivation manual, and packaging samples."
                            },
                            {
                                question: "Do you help with setting up the farm after training?",
                                answer: "Absolutely! Our post-training support includes farm design consultation, equipment sourcing guidance, and troubleshooting assistance for 6 months (for premium package) or 3 months (for basic package)."
                            }
                        ].map((faq, index) => (
                            <motion.div 
                                className="accordion-item" 
                                key={index}
                                variants={itemVariants}
                            >
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                                        {faq.question}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`}>
                                    <div className="accordion-body">
                                        {faq.answer}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Call to Action */}
            <motion.div 
                className="container-fluid bg-primary text-white py-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <div className="container text-center">
                    <motion.h2 
                        className="mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Limited Seats Available for Next Batch!
                    </motion.h2>
                    <motion.p 
                        className="lead mb-5"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Join our community of 100+ successful mushroom entrepreneurs
                    </motion.p>
                    <motion.div 
                        className="d-flex justify-content-center gap-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <motion.a
                            href="https://wa.me/8504893778"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-light btn-lg px-5 py-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enroll Now
                        </motion.a>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/contact" className="btn btn-outline-light btn-lg px-5 py-3">Request Brochure</Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default TrainingPage;