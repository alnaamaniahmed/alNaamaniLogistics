import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import Logo from "../images/logo.png";
import { Link } from "react-scroll";
import Switch from "./Switch";

function Navbar({ isArabic, onSwitchChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  const navbarClasses = ["navbar"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }
  if(isArabic){
    navbarClasses.push("arabic");
  }

  return (
    <nav className={navbarClasses.join(" ")}>
      {/* Logo */}
      <Link
        to="home"
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        onClick={closeMenu}
        className="logo"
      >
        <img src={Logo} alt="AlNaamani Logistics Logo" />
        <span className="logo-text" style={{ direction: isArabic ? "rtl" : "ltr" }}>{isArabic ? "النعماني اللوجستية" : "AL NAAMANI LOGISTICS"}</span>
      </Link>
      {/* Hamburger Menu */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      {/* Navigation Links */}
      <ul className={`navbar-links ${isOpen ? "active" : ""} ${isArabic ? "arabic" : "english"}`}>
        <li>
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            onClick={closeMenu}
          >
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="services"
            spy={true}
            smooth={true}
            offset={-250}
            duration={500}
            onClick={closeMenu}
          >
            {isArabic ? "الخدمات" : "Services"}
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="about"
            spy={true}
            smooth={true}
            offset={-200}
            duration={500}
            onClick={closeMenu}
          >
            {isArabic ? "من نحن" : "About"}
          </Link>
        </li>
        <li>
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={-150}
            duration={500}
            onClick={closeMenu}
          >
            {isArabic ? "تواصل معنا" : "Contact"}
          </Link>
        </li>
        <li>
          <Switch isToggled={isArabic} onToggle={onSwitchChange} /> {/* Pass state and handler */}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;