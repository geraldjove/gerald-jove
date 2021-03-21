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
 import Image from '../images/profilepicture.jpg';

const Section = ({id, lightBg, lightTxt, imgStart, description, description2, img, alt}) => {
    return (
        <SectionContainer id="about" lightBg={!lightBg}>
            <SectionWrapper>
                <SectionContent imgStart={imgStart}>
                    <SectionCol1>
                        <SectionTextWrapper>
                            <SectionTopLine lightTxt={lightTxt}>ABOUT</SectionTopLine>
                            <SectionTitle lightTxt={lightTxt}>GERALD JOVE</SectionTitle>
                            <SectionP lightTxt={lightTxt}>
                            My name is Gerald Jove. I’m a full-time, freelance Digital Media Producer that focuses on digital advertising and marketing.
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            My experience consists of working with small to medium businesses from local to foreign companies in the advertising and marketing scene. I mainly provide video editing services as a solo freelancer, and as a producer, make sure the delivered output project is a high-quality standard, on-time, and meets the client’s expectations and demands.
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            My aim as a Digital Media Producer is to help you grow your business in digital media. These digital media can be through Facebook, Instagram, YouTube, Snapchat, or any digital platforms that we can get our hands-on.
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            I’ll work to deliver the digital contents that you need for your marketing purposes while you focus on running your business. These digital contents can be graphic design, video advertisements, or even web development if you need a new website or update your existing one.
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
