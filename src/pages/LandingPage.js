import React, { useState } from "react";
import Header from "../component/landingpage/LandingPageheader";
import "./pagecss/landingpage.css";
import busImage from "./images/DJV JUL 2390-05.jpg"; // Importing hero image
import routeIcon from "./images/icons8-route-64.png"; // Importing feature icons
import trackingIcon from "./images/icons8-tracking-32.png";
import bookingIcon from "./images/icons8-booking-50.png";

import BusRouteForm from "../component/landingpage/RouteForm";

const LandingPage = () => {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  const [featureImagesLoaded, setFeatureImagesLoaded] = useState({
    routeIcon: false,
    trackingIcon: false,
    bookingIcon: false,
  });

  const handleFeatureImageLoad = (key) => {
    setFeatureImagesLoaded((prevState) => ({ ...prevState, [key]: true }));
  };

  return (
    <div>
      <div>
        <Header />
        <main>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h2>Streamline Your College Commute</h2>
              <p>
                Efficiently manage bus schedules, track routes, and ensure a
                hassle-free journey for students and staff.
              </p>

              <a href="#search-route" className="cta-button">
                Get Started
              </a>
            </div>
            <div className="hero-image">
              {!heroImageLoaded && (
                <div className="image-placeholder">Loading...</div>
              )}
              <img
                src={busImage}
                alt="College Bus"
                onLoad={() => setHeroImageLoaded(true)}
                style={{ display: heroImageLoaded ? "block" : "none" }}
              />
            </div>
          </section>

          {/* Route Form Section */}
          <section id="search-route">
            <div id="form-container">
              <h2>Select a Route to View Details</h2>
              <BusRouteForm />
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="features">
            <h2>Features</h2>
            <div className="feature-list">
              <div className="feature-item">
                {!featureImagesLoaded.routeIcon && (
                  <div className="image-placeholder">Loading...</div>
                )}
                <img
                  src={routeIcon}
                  alt="Route Management"
                  onLoad={() => handleFeatureImageLoad("routeIcon")}
                  style={{
                    display: featureImagesLoaded.routeIcon ? "block" : "none",
                  }}
                />
                <h3>Route Management</h3>
                <p>
                  Easily manage and update bus routes for students and staff.
                </p>
              </div>
              <div className="feature-item">
                {!featureImagesLoaded.trackingIcon && (
                  <div className="image-placeholder">Loading...</div>
                )}
                <img
                  src={trackingIcon}
                  alt="Live Tracking"
                  onLoad={() => handleFeatureImageLoad("trackingIcon")}
                  style={{
                    display: featureImagesLoaded.trackingIcon
                      ? "block"
                      : "none",
                  }}
                />
                <h3> Dynamic Bus Reassignment</h3>
                <p>
                  {" "}
                  Utilizes driver-provided crowd ratings to reallocate buses
                  effectively
                </p>
              </div>
              <div className="feature-item">
                {!featureImagesLoaded.bookingIcon && (
                  <div className="image-placeholder">Loading...</div>
                )}
                <img
                  src={bookingIcon}
                  alt="Seat Booking"
                  onLoad={() => handleFeatureImageLoad("bookingIcon")}
                  style={{
                    display: featureImagesLoaded.bookingIcon ? "block" : "none",
                  }}
                />
                <h3>Driver Rating System</h3>
                <p>
                  Enables drivers to report real-time crowd density in their
                  buses.
                </p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="about">
            <h2>About Us</h2>
            <p>
              Our College Bus Management System aims to simplify the
              transportation experience for colleges, ensuring students and
              staff have a reliable and efficient way to commute. With advanced
              route management and real-time tracking, we bring convenience to
              every journey.
            </p>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact">
            <h2>Contact Us</h2>
            <p>Have questions or need assistance? Reach out to us!</p>
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </section>
        </main>

        {/* Footer */}
        <footer>
          <p>&copy; 2024 College Bus Management System. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
