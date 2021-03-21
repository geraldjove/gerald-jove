import React from 'react'
import {
    FooterContainer,
    FooterWrapper,
    FooterLinkContainer,
    FooterLinkMenu,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink,
    FooterP,
    FooterHyperLink,
} from './footer.styles.js';
import { animateScroll as scroll } from 'react-scroll';

const Footer = () => {

    
const toggleHome = () => {
    scroll.scrollToTop();
}

    return (
        <FooterContainer>
            <FooterWrapper>
                <FooterLinkContainer>
                    <FooterLinkMenu>
                        <FooterLinkItems>
                            <FooterLinkTitle>Navigation</FooterLinkTitle>
                            <FooterLinkItems>
                                <FooterLink to="/" onClick={toggleHome} spy={true} smooth={true} offset={-100} duration={500}>Home</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLink to="experience" spy={true} smooth={true} offset={-100} duration={500}>Experiences</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLink to="skills" spy={true} smooth={true} offset={-100} duration={500}>Skills</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLink to="education" spy={true} smooth={true} offset={-100} duration={500}>Education</FooterLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterLink to="contact" spy={true} smooth={true} offset={-100} duration={500}>Contact</FooterLink>
                            </FooterLinkItems>
                        </FooterLinkItems>
                    </FooterLinkMenu>
                    <FooterLinkMenu>
                        <FooterLinkItems>
                                <FooterLinkTitle>Contact</FooterLinkTitle>
                                <FooterLinkItems>
                                    <FooterP>Email: geraldjove.freelancer@gmail.com</FooterP>
                                    <FooterP>Phone: +639663310965</FooterP>
                                </FooterLinkItems>
                        </FooterLinkItems>
                    </FooterLinkMenu>
                    <FooterLinkMenu>
                        <FooterLinkItems>
                            <FooterLinkTitle>Websites</FooterLinkTitle>
                            <FooterLinkItems>
                                <FooterHyperLink href="http://www.github.com/geraldjove" target="_blank">GitHub Page</FooterHyperLink>
                            </FooterLinkItems>
                            <FooterLinkItems>
                                <FooterHyperLink href="http://www.behance.net/geraldjove" target="_blank">Behance Page</FooterHyperLink>
                            </FooterLinkItems>
                        </FooterLinkItems>
                    </FooterLinkMenu>
                </FooterLinkContainer>
            </FooterWrapper>
        </FooterContainer>
    )
}

export default Footer
