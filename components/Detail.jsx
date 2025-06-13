import React from 'react';
import Link from 'next/link';

const Detail = () => {
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
                    <div className="col-lg-8">
                        {/* Blog Detail Start */}
                        <div className="mb-5">
                            <img
                                className="img-fluid w-100 rounded mb-5"
                                src="/img/mushroom-detail.jpg"
                                alt="Oyster mushrooms growing in a farm"
                                style={{ maxHeight: "500px", objectFit: "cover" }}
                            />
                            <h1 className="text-uppercase mb-4">
                                Complete Guide to Organic Mushroom Cultivation
                            </h1>
                            <p>
                                Mushroom farming has become an increasingly popular agricultural practice due to its high profitability and low space requirements. Unlike traditional crops, mushrooms can be grown vertically in small spaces, making them ideal for urban farming. The process begins with selecting the right mushroom species for your climate and market demand.
                            </p>
                            <p>
                                The most commonly cultivated mushrooms include oyster, shiitake, and button varieties. Each type requires specific growing conditions and substrates. Oyster mushrooms, for example, thrive on straw or sawdust, while shiitake mushrooms prefer hardwood logs or supplemented sawdust blocks. Proper substrate preparation is crucial for successful mushroom cultivation.
                            </p>
                            <p>
                                Temperature and humidity control are critical factors in mushroom farming. Most varieties require high humidity (80-90%) and specific temperature ranges for optimal growth. Investing in proper climate control systems can significantly increase your yield and quality. Many commercial growers use automated misting systems and temperature-controlled growing rooms to maintain ideal conditions.
                            </p>
                            <p>
                                Harvesting mushrooms at the right time is essential for quality and shelf life. Mushrooms should be picked just before the caps fully open. Proper post-harvest handling, including immediate cooling and careful packaging, helps maintain freshness. Many growers sell directly to restaurants and farmers markets, while others process their mushrooms into value-added products like powders and extracts.
                            </p>
                            <div className="my-4">
                                <h4 className="text-uppercase">Key Steps in Mushroom Farming:</h4>
                                <ul className="list-unstyled">
                                    <li className="mb-2"><strong>1. Substrate Preparation:</strong> Proper sterilization and nutrient balance</li>
                                    <li className="mb-2"><strong>2. Spawn Selection:</strong> Choosing high-quality mushroom spawn</li>
                                    <li className="mb-2"><strong>3. Inoculation:</strong> Introducing spawn to the substrate</li>
                                    <li className="mb-2"><strong>4. Incubation:</strong> Maintaining ideal conditions for mycelium growth</li>
                                    <li className="mb-2"><strong>5. Fruiting:</strong> Triggering and managing mushroom development</li>
                                    <li className="mb-2"><strong>6. Harvesting:</strong> Proper techniques for quality and yield</li>
                                    <li className="mb-2"><strong>7. Post-Harvest:</strong> Storage and processing methods</li>
                                </ul>
                            </div>
                            <img
                                className="img-fluid w-100 rounded my-4"
                                src="/img/detail_harvesting.jpg"
                                alt="Harvesting mushrooms"
                                style={{ maxHeight: "400px", objectFit: "cover" }}
                            />
                        </div>
                        {/* Blog Detail End */}

                        {/* Comment Section Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Comments</h3>
                            <div className="d-flex mb-4">
                                <img
                                    src="/img/farmer-1.jpg"
                                    className="img-fluid rounded"
                                    style={{ width: 60, height: 60, objectFit: "cover" }}
                                    alt="Farmer profile"
                                />
                                <div className="ps-3">
                                    <h6>
                                        Rajesh Kumar <small><i>15 March 2023</i></small>
                                    </h6>
                                    <p>
                                        This guide was extremely helpful for setting up my small mushroom farm. The substrate preparation tips made a big difference in my yield. I'm now getting 3kg per square foot from my oyster mushrooms!
                                    </p>
                                    <button className="btn btn-sm btn-secondary">Reply</button>
                                </div>
                            </div>
                            <div className="d-flex mb-4">
                                <img
                                    src="/img/farmer-2.jpg"
                                    className="img-fluid rounded"
                                    style={{ width: 60, height: 60, objectFit: "cover" }}
                                    alt="Farmer profile"
                                />
                                <div className="ps-3">
                                    <h6>
                                        Priya Sharma <small><i>22 April 2023</i></small>
                                    </h6>
                                    <p>
                                        Could you provide more details about organic certification for mushroom farming? I'm particularly interested in the documentation required for selling to premium markets.
                                    </p>
                                    <button className="btn btn-sm btn-secondary">Reply</button>
                                </div>
                            </div>
                        </div>
                        {/* Comment Section End */}


                    </div>

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

                        {/* Categories Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Mushroom Varieties</h3>
                            <div className="d-flex flex-column justify-content-start bg-dark rounded p-4">
                                <div className="fs-5 fw-bold text-light text-uppercase mb-2">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Oyster Mushrooms
                                </div>
                                <div className="fs-5 fw-bold text-light text-uppercase mb-2">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Shiitake Mushrooms
                                </div>
                                <div className="fs-5 fw-bold text-light text-uppercase mb-2">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Button Mushrooms
                                </div>
                                <div className="fs-5 fw-bold text-light text-uppercase mb-2">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Medicinal Mushrooms
                                </div>
                                <div className="fs-5 fw-bold text-light text-uppercase">
                                    <i className="bi bi-arrow-right text-primary me-2" />
                                    Exotic Varieties
                                </div>
                            </div>
                        </div>
                        {/* Categories End */}

                        {/* Recent Posts Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Popular Guides</h3>
                            <div className="bg-dark rounded p-4">
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-substrate.jpg"
                                        style={{ width: 75, height: 75, objectFit: "cover" }}
                                        alt="Substrate preparation"
                                    />
                                    <div className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0">
                                        Substrate Preparation Techniques
                                    </div>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-spawn.jpg"
                                        style={{ width: 75, height: 75, objectFit: "cover" }}
                                        alt="Mushroom spawn"
                                    />
                                    <div className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0">
                                        Spawn Production Methods
                                    </div>
                                </div>
                                <div className="d-flex overflow-hidden mb-3">
                                    <img
                                        className="img-fluid flex-shrink-0 rounded-start"
                                        src="/img/mushroom-marketing.jpg"
                                        style={{ width: 75, height: 75, objectFit: "cover" }}
                                        alt="Mushroom marketing"
                                    />
                                    <div className="d-flex align-items-center bg-light rounded-end h5 text-uppercase p-3 mb-0">
                                        Mushroom Marketing Strategies
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Recent Posts End */}

                        {/* Tags Start */}
                        <div className="mb-5">
                            <h3 className="text-uppercase mb-4">Key Topics</h3>
                            <div className="d-flex flex-wrap m-n1">
                                <button className="btn btn-dark m-1">Organic</button>
                                <button className="btn btn-dark m-1">Hydroponic</button>
                                <button className="btn btn-dark m-1">Substrate</button>
                                <button className="btn btn-dark m-1">Harvesting</button>
                                <button className="btn btn-dark m-1">Spawn</button>
                                <button className="btn btn-dark m-1">Sterilization</button>
                                <button className="btn btn-dark m-1">Packaging</button>
                                <button className="btn btn-dark m-1">Storage</button>
                                <button className="btn btn-dark m-1">Training</button>
                            </div>
                        </div>
                        {/* Tags End */}

                        {/* About Farm Start */}
                        <div>
                            <h3 className="text-uppercase mb-4">Our Mushroom Farm</h3>
                            <div className="bg-dark rounded text-center text-light" style={{ padding: 30 }}>
                                <p>
                                    With over 15 years of experience in commercial mushroom cultivation, we specialize in organic farming methods and sustainable practices. Our training programs have helped establish more than 200 successful mushroom farms across the region.
                                </p>
                               
                                <Link className="btn btn-primary py-2 px-4" href="/contact">Contact Us</Link>
                            </div>
                        </div>
                        {/* About Farm End */}
                    </div>
                    {/* Sidebar End */}
                </div>
            </div>
            {/* Blog End */}
        </>
    );
};

export default Detail;