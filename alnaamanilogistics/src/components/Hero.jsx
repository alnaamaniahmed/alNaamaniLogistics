import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import {Typewriter} from "react-simple-typewriter";
import logisticsL from "../images/logistics.png";
import busL from "../images/bus.png";
import planeL from "../images/plane.png";
import worldL from "../images/worldwide.png";
import truckImg from "../images/truckImg.png"; 

function Hero() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [fadeOut, setFadeOut] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [loadingDots, setLoadingDots] = useState("");
  useEffect(() => {
    if (submitStatus === "Waiting to send message") {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) =>
          prevDots.length < 3 ? prevDots + "." : ""
        );
      }, 500); 

      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [submitStatus]);
  useEffect(() => {
    if (submitStatus === "Message sent successfully!") {
      const fadeTimeout = setTimeout(() => {
        setFadeOut(true); 
      }, 1000); 

      const timeout = setTimeout(() => {
        setSubmitStatus(""); 
        setFadeOut(false); 
      }, 3000);

      return () => {
        clearTimeout(fadeTimeout);
        clearTimeout(timeout);
      }; 
    }
  }, [submitStatus]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setSubmitStatus("Waiting to send message");
    try {
      const response = await fetch("https://formspree.io/f/xnnaodkl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("An error occurred. Please try again later.");
    }
  };
  return (
    <div id="home" className="hero-container">
      <div className="cargos">
        <div className="overlay-content">
          <h1>
            Welcome to <span>Al Naamani Logistics</span>
          </h1>
          <p id="first">Your trusted partner in delivering</p>
          <p id="second">{""}<Typewriter
                words={["Excellence and Efficiency", "Reliability and Precision", "Trust and Commitment"]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              /></p>
        </div>
      </div>
      <div id="services" className="services">
        <h2>Our Services</h2>
        <p>Discover the many ways we can assist you</p>
        <div className="circle-logo">
          <div className="circle-logo-image">
            <div className="circledL">
              <img className="Icons" src={planeL} alt="planeIcon" />
            </div>
            <p className="services-type">Air Freight</p>
          </div>
          <div className="circle-logo-image">
            <div className="circledL">
              <img className="Icons" src={worldL} alt="worldIcon" />
            </div>
            <p className="services-type">WorldWide Transport</p>
          </div>
          <div className="circle-logo-image">
            <div className="circledL">
              <img className="Icons" src={logisticsL} alt="logisticsIcon" />
            </div>
            <p className="services-type">Logistics Services</p>
          </div>
          <div className="circle-logo-image">
            <div className="circledL">
              <img className="Icons" src={busL} alt="planeIcon" />
            </div>
            <p className="services-type">Road Freight</p>
          </div>
        </div>
      </div>
      <div className="AboutUs">
        <div className="aboutUs-img">
          <img src={truckImg} alt="truckImage" />
        </div>
        <div id="about" className="aboutUs-text">
          <h2>About Us</h2>
          <p>
            We specialize in reliable and efficient global delivery solutions.
            With expertise in both road and air freight, we ensure your goods
            reach their destination safely and on time. Our customer-focused
            approach and commitment to sustainability make us a trusted partner
            in the logistics industry.
          </p>
        </div>
      </div>
      <div id="contact" className="contactUsSection">
        <div className="sectionHeader">
          <h2>Contact Us</h2>
        </div>
        <div className="sectionForm">
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Type Your Message..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
        {submitStatus && (
          <div
            className={`submit-status ${fadeOut ? "fade-out" : ""}`}
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            <p>
              {submitStatus}
              {loadingDots}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
