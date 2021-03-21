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
 import Image from '../images/svg-1.svg';

const Section = ({id, lightBg, lightTxt, imgStart, description, description2, img, alt}) => {
    return (
        <SectionContainer id="experience" lightBg={lightBg}>
            <SectionWrapper>
                <SectionContent imgStart={!imgStart}>
                    <SectionCol1>
                        <SectionTextWrapper>
                            <SectionTopLine lightTxt={!lightTxt}>GERALD JOVE</SectionTopLine>
                            <SectionTitle lightTxt={!lightTxt}>EXPERIENCE</SectionTitle>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>Freelancer | September 2019 - Present</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>Digital Media Producer</li>
                            <li>Video Editor</li>
                            <li>Full-Stack Web Developer</li>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>Junior Multimedia Artist | July 2018 - June 2019</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>Versalife Innovations International, Inc. | Quezon City, Philippines</li>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>Videographer/Video Editor | March 2018 - April 2018</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>Al Rawi Media Corporation | Doha, Qatar</li>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>3D/CGI Artist | October 2015 - April 2016</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>Snipple Animation Studios | Manila, Philippines</li>
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
