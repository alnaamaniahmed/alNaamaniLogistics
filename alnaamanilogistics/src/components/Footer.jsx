import React, {useEffect} from "react";
import "../styles/Footer.css";
import Logo from "../images/logo.png";
import mailIcon from "../images/mail.png";
import phoneIcon from "../images/phone.png";
import locationIcon from "../images/location.png";
import { Link } from "react-scroll";
function Footer({ isArabic }) {
  const year = new Date().getFullYear();
  useEffect(() => {
    const footer = document.querySelector('.footer-container');

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                footer.classList.add('animate');
            }else {
              footer.classList.remove('animate'); 
          }
        },
        {
            root: null, 
            threshold: 0.1, 
        }
    );

    if (footer) {
        observer.observe(footer);
    }

    // Cleanup on unmount
    return () => {
        if (footer) {
            observer.unobserve(footer);
        }
    };
}, []);
  return (
    <footer className="footer-container">
      {/* Third Wave (White) */}
      <div className="custom-shape-divider-top-white">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill-white"
          ></path>
        </svg>
      </div>
      {/* Second Wave (Grey) */}
      <div className="custom-shape-divider-top-grey">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="greyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="79%" stop-color="#9E9E9E" />
              <stop offset="100%" stop-color="#B8B8B8" />
            </linearGradient>
          </defs>
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill-grey"
          ></path>
        </svg>
      </div>
      {/* First Wave (Yellow) */}
      <div className="custom-shape-divider-top-1723907173">
        <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="77%" stop-color="#F9A510" />
                <stop offset="100%" stop-color="#FFAC39" />
              </linearGradient>
            </defs>
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="shape-fill"
            ></path>
          </svg>
      </div>
      <div className="footer-content">
        <div className="logo-holder">
        <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="logo-container"
          >
            <img src={Logo} alt={isArabic ? "شعار النعماني اللوجستية" : "AlNaamani Logistics Logo"} />
            <span className="logo-text">{isArabic ? "النعماني اللوجستية" : "AL NAAMANI LOGISTICS"}</span>
          </Link>
        </div>
        <div className="contactInfo">
          <div className="info">
            <div className="upper-section">
              <div className="contentHeader">
                <span className="contentText">{isArabic ? "العنوان" : "Address"}</span>
                <div className="details">
                  <img src={locationIcon} alt="locationIcon" />
                  <span>
                  {isArabic
                      ? "رقم السجل التجاري 1307593، صندوق بريد: 1286، ص.ب 111، سلطنة عمان"
                      : "C.R. No. 1307593, P.O Box: 1286, P. C 111, Sultanate of Oman"}
                  </span>
                </div>
              </div>
              <div className="contentHeader">
                <span className="contentText">{isArabic ? "رقم الهاتف الرئيسي" : "Primary"}</span>
                <div className="details-primary">
                  <img src={phoneIcon} alt="phoneIcon" />
                  <span>+968 24272714</span>
                </div>
              </div>
            </div>
            <div className="bottom-section">
              <div className="contentHeader">
                <span className="contentText">{isArabic ? "البريد الإلكتروني" : "Email"}</span>
                <div className="details">
                  <img src={mailIcon} alt="mailIcon" />
                  <span>alnaamanilogistics@gmail.com</span>
                </div>
              </div>
              <div>
                <div className="contentHeader">
                  <span className="contentText" >{isArabic ? "رقم الهاتف الثانوي" : "Secondary"}</span>
                  <div className="details">
                    <img src={phoneIcon} alt="phoneIcon" />
                    <span>+968 92543933</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={isArabic ? "copyright-arabic" : "copyright"}>
        {isArabic ? <span className="copyright-text">جميع الحقوق محفوظة &copy; النعماني اللوجستية {year}
          </span> : <span className="copyright-text"> {year} &copy; Al NAAMANI LOGISTICS. All Rights Reserved.
          </span>}
      </div>
    </footer>
  );
}

export default Footer;
