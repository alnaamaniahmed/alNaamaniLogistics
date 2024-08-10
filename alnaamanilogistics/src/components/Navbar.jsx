import '../styles/Navbar.css';
import Logo from '../images/logo.png';
import React from 'react';
import {Link} from  'react-scroll';

function Navbar(){
    return (
        <nav className='navbar'>
            {/* Logo */}
            <div className='logo'>
                <img src={Logo} alt='AlNaamani Logistics Logo'/>
                <span className='logo-text'>AL NAAMANI LOGISTICS</span>
            </div>

             {/* Navigation Links */}
             <ul className='navbar-links'>
                <li><Link activeClass="active" to="home" spy={true} smooth={true} offset={-70} duration={500}>Home</Link></li>
                <li><Link activeClass="active" to="services" spy={true} smooth={true} offset={-70} duration={500}>Our Services</Link></li>
                <li><Link activeClass="active" to="about" spy={true} smooth={true} offset={-70} duration={500}>About Us</Link></li>
                <li><Link activeClass="active" to="contact" spy={true} smooth={true} offset={-70} duration={500}>Contact Us</Link></li>
             </ul>
        </nav>
    );
}

export default Navbar;