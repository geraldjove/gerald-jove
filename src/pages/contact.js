import React from 'react'
import { 
    SectionContainer, 
    SectionWrapper, 
    SectionContent, 
    SectionCol1, SectionCol2, 
    SectionTitle, 
    SectionTopLine, 
    SectionP, 
    SectionImg,
    SectionTextWrapper,
    SectionImgWrapper
 } from '../components/section/section.styles';
 import Image from '../images/svg-3.svg';

const Section = ({id, lightBg, lightTxt, imgStart, description, description2, img, alt}) => {
    return (
        <SectionContainer id="contact" lightBg={!lightBg}>
            <SectionWrapper>
                <SectionContent imgStart={imgStart}>
                    <SectionCol1>
                        <SectionTextWrapper>
                            <SectionTopLine lightTxt={lightTxt}>GERALD JOVE</SectionTopLine>
                            <SectionTitle lightTxt={lightTxt}>CONTACT</SectionTitle>
                            <SectionP lightTxt={lightTxt}>
                            <strong>Let's Work Together. Get in touch with one of my contact information.</strong>
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            <li><strong>Email:</strong> geraldjove.freeelancer@gmail.com</li>
                            <li><strong>Phone:</strong> +639663310965</li>
                            <li><strong>GitHub:</strong> www.github.com/geraldjove</li>
                            <li><strong>Behance:</strong> www.behance.net/geraldjove</li>
                            </SectionP>
                        </SectionTextWrapper>
                    </SectionCol1>
                    <SectionCol2>
                        <SectionImgWrapper>
                            <SectionImg src={Image} alt={alt}></SectionImg>
                        </SectionImgWrapper>
                    </SectionCol2>
                </SectionContent>
            </SectionWrapper>
        </SectionContainer>
    )
}

export default Section
