import React from 'react';
import Link from 'next/link';

const Blog = () => {
    return (
        <>
            {/* Hero Start */}
            <div className="container-fluid bg-primary p-5 bg-hero mb-5">
                <div className="row py-5">
                    <div className="col-12 text-center">
                        <h1 className="display-2 text-uppercase text-white mb-md-4">
                            Mushroom Farming Blog
                        </h1>
                        <Link className="btn btn-primary py-md-3 px-md-5 me-3" href="/">Home</Link>
                        <Link className="btn btn-light py-md-3 px-md-5" href="/detail">Blog Details</Link>
                    </div>
                </div>
            </div>
            {/* Hero End */}

            {/* Blog Start */}
            <div className="container-fluid p-5">
                <div className="row g-5">
                    {/* Blog list Start */}
                    <div className="col-lg-8">
                        <div className="row g-5">
                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/oyster-mushroom.jpg"
                                            alt="Oyster mushrooms growing"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>15</span>
                                            <h6 className="text-light text-uppercase mb-0">March</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            Complete Guide to Growing Oyster Mushrooms
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/mushroom-substrate.jpg"
                                            alt="Mushroom substrate preparation"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>02</span>
                                            <h6 className="text-light text-uppercase mb-0">April</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            Best Substrate Recipes for Maximum Yield
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/mushroom-harvest.jpg"
                                            alt="Harvesting mushrooms"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>22</span>
                                            <h6 className="text-light text-uppercase mb-0">April</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            When and How to Harvest Your Mushrooms
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/mushroom-drying.jpg"
                                            alt="Drying mushrooms"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>05</span>
                                            <h6 className="text-light text-uppercase mb-0">May</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            Best Methods for Preserving Mushrooms
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/mushroom-marketing.jpg"
                                            alt="Mushroom products at market"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>18</span>
                                            <h6 className="text-light text-uppercase mb-0">May</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            How to Market Your Mushroom Products
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/testimonial-5.jpg"
                                            alt="Mushroom farming training"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>30</span>
                                            <h6 className="text-light text-uppercase mb-0">May</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            Upcoming Mushroom Farming Training Programs
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/mushroom-recipes.jpg"
                                            alt="Mushroom recipes"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>12</span>
                                            <h6 className="text-light text-uppercase mb-0">June</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/detail">
                                            Delicious Recipes Using Your Homegrown Mushrooms
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="blog-item">
                                    <div className="position-relative overflow-hidden rounded-top" style={{ height: "250px" }}>
                                        <img
                                            className="img-fluid h-100 w-100"
                                            src="/img/mushroom-health.jpg"
                                            alt="Mushroom health benefits"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="bg-dark d-flex align-items-center rounded-bottom p-4">
                                        <div className="flex-shrink-0 text-center text-secondary border-end border-secondary pe-3 me-3">
                                            <span>25</span>
                                            <h6 className="text-light text-uppercase mb-0">June</h6>
                                            <span>2023</span>
                                        </div>
                                        <Link className="h5 text-uppercase text-light" href="/blog/health-benefits">
                                            Health Benefits of Different Mushroom Varieties
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination pagination-lg justify-content-center m-0">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">
                                                    <i className="bi bi-arrow-left" />
                                                </span>
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="#">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">
                                                    <i className="bi bi-arrow-right" />
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* Blog list End */}

                    {/* Sidebar Start */}
                    <div className="col-lg-4">
                        {/* Search Form Start */}
                        <div className="mb-5">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control p-3"
                                    placeholder="Search mushroom topics..."
                                />
                                <button className="btn btn-primary px-4">
                                    <i className="bi bi-search" />
                                </button>
                            </div>
                        </div>
                        {/* Search Form End */}

                        {/* Category Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Categories</h3>
                            <div className="d-flex flex-column justify-content-start bg-dark rounded p-4">
                                <Link className="fs-5 fw-bold text-light text-uppercase mb-2" href="/blog/category/growing-guides">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Growing Guides
                                </Link>
                                <Link className="fs-5 fw-bold text-light text-uppercase mb-2" href="/blog/category/substrate-preparation">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Substrate Preparation
                                </Link>
                                <Link className="fs-5 fw-bold text-light text-uppercase mb-2" href="/blog/category/harvesting">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Harvesting & Storage
                                </Link>
                                <Link className="fs-5 fw-bold text-light text-uppercase mb-2" href="/blog/category/marketing">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Marketing & Sales
                                </Link>
                                <Link className="fs-5 fw-bold text-light text-uppercase" href="/blog/category/training">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Training Programs
                                </Link>
                            </div>
                        </div>
                        {/* Category End */}

                        {/* Recent Post Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Recent Posts</h3>
                            <div className="bg-dark rounded p-4">
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-spawn.jpg"
                                        style={{ width: 75 }}
                                        alt="Mushroom spawn"
                                    />
                                    <Link
                                        href="/blog/spawn-production"
                                        className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0"
                                    >
                                        DIY Mushroom Spawn Production
                                    </Link>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-pests.jpg"
                                        style={{ width: 75 }}
                                        alt="Mushroom pests"
                                    />
                                    <Link
                                        href="/blog/pest-control"
                                        className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0"
                                    >
                                        Common Mushroom Pests and Solutions
                                    </Link>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-business.jpg"
                                        style={{ width: 75 }}
                                        alt="Mushroom business"
                                    />
                                    <Link
                                        href="/blog/business-plan"
                                        className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0"
                                    >
                                        Creating a Mushroom Farming Business Plan
                                    </Link>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-medicinal.jpg"
                                        style={{ width: 75 }}
                                        alt="Medicinal mushrooms"
                                    />
                                    <Link
                                        href="/blog/medicinal-mushrooms"
                                        className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0"
                                    >
                                        Growing Medicinal Mushrooms at Home
                                    </Link>
                                </div>
                                <div className="d-flex overflow-hidden">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-profit.jpg"
                                        style={{ width: 75 }}
                                        alt="Mushroom profit"
                                    />
                                    <Link
                                        href="/blog/profitability"
                                        className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0"
                                    >
                                        Mushroom Farming Profitability Analysis
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* Recent Post End */}

                        {/* Tags Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Popular Tags</h3>
                            <div className="d-flex flex-wrap m-n1">
                                <Link href="/blog/tag/oyster" className="btn btn-dark m-1">
                                    Oyster
                                </Link>
                                <Link href="/blog/tag/shitake" className="btn btn-dark m-1">
                                    Shitake
                                </Link>
                                <Link href="/blog/tag/organic" className="btn btn-dark m-1">
                                    Organic
                                </Link>
                                <Link href="/blog/tag/hydroponic" className="btn btn-dark m-1">
                                    Hydroponic
                                </Link>
                                <Link href="/blog/tag/urban-farming" className="btn btn-dark m-1">
                                    Urban Farming
                                </Link>
                                <Link href="/blog/tag/substrate" className="btn btn-dark m-1">
                                    Substrate
                                </Link>
                                <Link href="/blog/tag/spawn" className="btn btn-dark m-1">
                                    Spawn
                                </Link>
                                <Link href="/blog/tag/harvest" className="btn btn-dark m-1">
                                    Harvest
                                </Link>
                                <Link href="/blog/tag/preservation" className="btn btn-dark m-1">
                                    Preservation
                                </Link>
                                <Link href="/blog/tag/business" className="btn btn-dark m-1">
                                    Business
                                </Link>
                                <Link href="/blog/tag/training" className="btn btn-dark m-1">
                                    Training
                                </Link>
                                <Link href="/blog/tag/medicinal" className="btn btn-dark m-1">
                                    Medicinal
                                </Link>
                            </div>
                        </div>
                        {/* Tags End */}

                        {/* Plain Text Start */}
                        <div>
                            <h3 className="text-uppercase mb-4">About Our Farm</h3>
                            <div
                                className="bg-dark rounded text-center text-light"
                                style={{ padding: 30 }}
                            >
                                <p>
                                    At Mushroom Masters, we're passionate about sustainable mushroom cultivation.
                                    Our blog shares years of experience in growing, harvesting, and marketing
                                    premium mushrooms. Learn from our experts and join our community of mushroom
                                    enthusiasts and commercial growers.
                                </p>
                                <Link href="/about" className="btn btn-primary py-2 px-4">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        {/* Plain Text End */}
                    </div>
                    {/* Sidebar End */}
                </div>
            </div>
            {/* Blog End */}
        </>
    );
};

export default Blog;