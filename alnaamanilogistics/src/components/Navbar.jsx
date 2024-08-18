import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import Logo from '../images/logo.png';
import { Link } from 'react-scroll';

function Navbar() {
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

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }

    return (
        <nav className={navbarClasses.join(' ')}>
            {/* Logo */}
            <div className='logo'>
                <img src={Logo} alt='AlNaamani Logistics Logo' />
                <span className='logo-text'>AL NAAMANI LOGISTICS</span>
            </div>
            {/* Hamburger Menu */}
            <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            {/* Navigation Links */}
            <ul className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <li><Link activeClass="active" to="home" spy={true} smooth={true} offset={-70} duration={500}>Home</Link></li>
                <li><Link activeClass="active" to="services" spy={true} smooth={true} offset={-70} duration={500}>Services</Link></li>
                <li><Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={500}>About</Link></li>
                <li><Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={500}>Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;