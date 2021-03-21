import React from 'react';
import { HeroContainer, HeroVideo, HeroBG, HeroContent, HeroTitle, HeroSubtitle } from './hero.styles.js';
import Video from '../../videos/video1.mp4';

const Hero = () => {
    return (
            <HeroContainer>
                <HeroVideo>
                    <HeroBG autoPlay loop muted src={Video} type="video/mp4"></HeroBG>
                </HeroVideo>
                <HeroContent>
                    <HeroTitle>GERALD JOVE</HeroTitle>
                    <HeroSubtitle>Freelance Digital Media Producer</HeroSubtitle>
                </HeroContent>
            </HeroContainer>
    )
}

export default Hero
