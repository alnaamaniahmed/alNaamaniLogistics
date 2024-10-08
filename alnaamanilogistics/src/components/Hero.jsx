import React, { useState, useEffect } from "react";
import "../styles/Hero.css";
import { Typewriter } from "react-simple-typewriter";
import logisticsL from "../images/logistics.png";
import busL from "../images/bus.png";
import planeL from "../images/plane.png";
import worldL from "../images/worldwide.png";
import truckImg from "../images/truckImg.png";
import airportImg from "../images/airport.jpg";
import cargo from "../images/cargo.jpg";
import cargoship from "../images/cargoship.jpg";
import containers from "../images/containers.jpg";
import { Carousel } from "react-responsive-carousel";
import "../styles/carousel.min.css";

function Hero({ isArabic }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  useEffect(() => {
    const sections = [
      { id: 'home', title: isArabic ? 'الرئيسية - النعماني اللوجستية' : 'Home - Al Naamani Logistics' },
      { id: 'services', title: isArabic ? 'الخدمات - النعماني اللوجستية' : 'Services - Al Naamani Logistics' },
      { id: 'about', title: isArabic ? 'من نحن - النعماني اللوجستية' : 'About Us - Al Naamani Logistics' },
      { id: 'contact', title: isArabic ? 'تواصل معنا - النعماني اللوجستية' : 'Contact Us - Al Naamani Logistics' },
    ];

    const updateTitle = () => {
      const offset = window.innerHeight * 0.3;
      let titleUpdated = false; 
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -offset && rect.top <= offset) {
            if (!titleUpdated || document.title !== section.title) {
              document.title = section.title;
              titleUpdated = true;
            }
          }
        }
      });
    };

    const handleScroll = () => {
      updateTitle();
    };


    updateTitle();

    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isArabic]);
  useEffect(() => {
    const services = document.querySelector('.services');
    const aboutUs = document.querySelector('.AboutUs');
    const contactUs = document.querySelector('.contactUsSection');

    const sections = [
      { element: services, title: 'Services - Al Naamani Logistics' },
      { element: aboutUs, title: 'About Us - Al Naamani Logistics' },
      { element: contactUs, title: 'Contact Us - Al Naamani Logistics' },
    ];

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              const section = sections.find(section => section.element === entry.target);
              if (section) {
                document.title = section.title;  // Update the title when a section is in view
              }
            } else {
              entry.target.classList.remove('animate');
            }
        },
        {
            root: null, 
            threshold: 0.1, 
        }
    );

    // Observe each section
    sections.forEach(section => {
      if (section.element) {
        observer.observe(section.element);
      }
    });

    // Cleanup on unmount
    return () => {
      sections.forEach(section => {
        if (section.element) {
          observer.unobserve(section.element);
        }
      });
    };
}, []);
  const [fadeOut, setFadeOut] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [loadingDots, setLoadingDots] = useState("");

  useEffect(() => {
    console.log("is Arabic: ", isArabic);
    if (
      submitStatus === "Waiting to send message" ||
      submitStatus === "في انتظار إرسال الرسالة"
    ) {
      const interval = setInterval(() => {
        setLoadingDots((prevDots) =>
          prevDots.length < 3 ? prevDots + "." : ""
        );
      }, 500);

      return () => clearInterval(interval);
    } else {
      setLoadingDots("");
    }
  }, [submitStatus, isArabic]);
  useEffect(() => {
    console.log("is Arabic: ", isArabic);
    if (
      submitStatus === "Message sent successfully!" ||
      submitStatus === "تم إرسال الرسالة بنجاح!"
    ) {
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
  }, [submitStatus, isArabic]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      alert(
        isArabic
          ? ".يرجى إدخال عنوان بريد إلكتروني صالح"
          : "Please enter a valid email address."
      );
      return;
    }
    setSubmitStatus(
      isArabic ? "في انتظار إرسال الرسالة" : "Waiting to send message"
    );
    try {
      const response = await fetch("https://formspree.io/f/mwpezrgz", {
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
        setSubmitStatus(
          isArabic ? "تم إرسال الرسالة بنجاح!" : "Message sent successfully!"
        );
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus(
          isArabic
            ? ".فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى"
            : "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      setSubmitStatus(
        isArabic
          ? ".حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً"
          : "An error occurred. Please try again later."
      );
    }
  };

  return (
    <div
      id="home"
      className={isArabic ? "hero-container-arabic" : "hero-container"}
    >
      <div className="cargos">
        <Carousel
          autoPlay
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          autoFocus={true}
          stopOnHover={false}
          interval={5500}
          transitionTime={1000}
          width
          className="carousel-wrapper"
        >
          <div className="cargos">
            <img loading="lazy" src={cargoship} alt="Cargo Ship" />
          </div>
          <div className="cargos">
            <img loading="lazy" src={cargo} alt="Cargo" />
          </div>
          <div className="cargos">
            <img loading="lazy" src={airportImg} alt="Airport" />
          </div>
          <div className="cargos">
            <img loading="lazy" src={containers} alt="Containers" />
          </div>
        </Carousel>
        <div
          className={isArabic ? "overlay-content-arabic" : "overlay-content"}
        >
          <h1>
            {isArabic ? "مرحباً بك في " : "Welcome to "}{" "}
            <span>
              {isArabic ? "النعماني اللوجستية" : "Al Naamani Logistics"}
            </span>
          </h1>
          <p id="first">
            {isArabic
              ? "شريكك الموثوق في تقديم"
              : "Your trusted partner in delivering"}
          </p>
          <p id="second">
            {""}
            <Typewriter
              // key={key}
              words={
                isArabic
                  ? ["التميز والكفاءة", "الاعتمادية والدقة", "الثقة والالتزام"]
                  : [
                      "Excellence and Efficiency",
                      "Reliability and Precision",
                      "Trust and Commitment",
                    ]
              }
              loop={0}
              cursor
              cursorStyle={"|"}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </p>
        </div>
      </div>
      <div id="services" className="services">
        <h2>{isArabic ? "خدماتنا" : "Our Services"}</h2>
        <p>
          {isArabic
            ? "اكتشف الطرق العديدة التي يمكننا مساعدتك بها"
            : "Discover the many ways we can assist you"}
        </p>
        <div className="circle-logo">
          <div className="circle-logo-image">
            <div className="circledL">
              <img
                className="Icons"
                src={planeL}
                alt={isArabic ? "رمز الطائرة" : "planeIcon"}
              />
            </div>
            <p className="services-type">
              {isArabic ? "الشحن الجوي" : "Air Freight"}
            </p>
          </div>
          <div className="circle-logo-image">
            <div className="circledL">
              <img
                className="Icons"
                src={worldL}
                alt={isArabic ? "رمز العالم" : "worldIcon"}
              />
            </div>
            <p className="services-type">
              {isArabic ? "النقل العالمي" : "WorldWide Transport"}
            </p>
          </div>
          <div className="circle-logo-image">
            <div className="circledL">
              <img
                className="Icons"
                src={logisticsL}
                alt={isArabic ? "رمز الخدمات اللوجستية" : "logisticsIcon"}
              />
            </div>
            <p className="services-type">
              {isArabic ? "الخدمات اللوجستية" : "Logistics Services"}
            </p>
          </div>
          <div className="circle-logo-image">
            <div className="circledL">
              <img
                className="Icons"
                src={busL}
                alt={isArabic ? "رمز الحافلة" : "busIcon"}
              />
            </div>
            <p className="services-type">
              {isArabic ? "الشحن البري" : "Road Freight"}
            </p>
          </div>
        </div>
      </div>
      <div id="about"className="AboutUs">
        <div className="aboutUs-img">
          <img src={truckImg} alt={isArabic ? "صورة الشاحنة" : "truckImage"} />
        </div>
        <div className="aboutUs-text">
          <h2>{isArabic ? "من نحن" : "About Us"}</h2>
          <p className={isArabic ? "arabicPara" : ""}>
            {isArabic
              ? "نتخصص في حلول التوصيل العالمية الموثوقة و الفعالة. بفضل خبرتنا في الشحن البري و الجوي, نضمن وصول بضائعكم إلى وجهتها بأمان وفي الوقت المحدد. نهجنا الذي يركز على العميل والتزامنا بالاستدامة يجعلنا شريكاً موثوقاً في صناعة الخدمات اللوجستية."
              : "We specialize in reliable and efficient global delivery solutions. With expertise in both road and air freight, we ensure your goods reach their destination safely and on time. Our customer-focused approach and commitment to sustainability make us a trusted partner in the logistics industry."}
          </p>
        </div>
      </div>
      <div id="contact" className="contactUsSection">
        <div className="sectionHeader">
          <h2>{isArabic ? "تواصل معنا" : "Contact Us"}</h2>
        </div>
        <div className={isArabic ? "sectionForm-arabic" : "sectionForm"}>
          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder={isArabic ? "الاسم" : "Your Name"}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder={isArabic ? "البريد الإلكتروني" : "Your Email"}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder={isArabic ? "اكتب رسالتك..." : "Type Your Message..."}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">{isArabic ? "إرسال" : "Submit"}</button>
          </form>
        </div>
        {submitStatus && (
          <div
            className={`submit-status ${fadeOut ? "fade-out" : ""}`}
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            <p style={{ direction: isArabic ? "rtl" : "ltr" }}>
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
