import React from 'react';
import { Nav, NavbarContainer, NavbarMenu, NavItem, NavLink, NavLogo } from './navbar.styles.js';
import {animateScroll as scroll } from 'react-scroll';

const Navbar = () => {

    const toggleHome = () => {
        scroll.scrollToTop();
    }

    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to="/" onClick={toggleHome}>GERALD JOVE</NavLogo>
                    <NavbarMenu>
                        <NavItem>
                            <NavLink to="/" onClick={toggleHome}>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="about" spy={true} smooth={true} offset={-50} duration={500}>About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="experience" spy={true} smooth={true} offset={-50} duration={500}>Experiences</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="skills" spy={true} smooth={true} offset={-50} duration={500}>Skills</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="education" spy={true} smooth={true} offset={-50} duration={500}>Education</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="contact" spy={true} smooth={true} offset={-50} duration={500}>Contact</NavLink>
                        </NavItem>
                    </NavbarMenu>
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar
