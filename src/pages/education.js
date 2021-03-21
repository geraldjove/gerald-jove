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
        <SectionContainer id="education" lightBg={lightBg}>
            <SectionWrapper>
                <SectionContent imgStart={!imgStart}>
                    <SectionCol1>
                        <SectionTextWrapper>
                            <SectionTopLine lightTxt={!lightTxt}>GERALD JOVE</SectionTopLine>
                            <SectionTitle lightTxt={!lightTxt}>EDUCATION</SectionTitle>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>2021</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>Master Class for the Complete Web Developer</li>
                            <em>- Zero to Mastery (Udemy)</em>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>2018</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>Sales and Marketing</li>
                            <li>Business Entrepreneurship</li>
                            <em>- Filipino Institute (Doha, Qatar)</em>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <strong>2011 - 2017</strong>
                            </SectionP>
                            <SectionP lightTxt={!lightTxt}>
                            <li>BS Multimedia Arts and Science</li>
                            <em>- Mapua University (Manila, Philippines)</em>
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
