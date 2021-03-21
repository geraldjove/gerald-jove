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
 import Image from '../images/svg-2.svg';

const Section = ({id, lightBg, lightTxt, imgStart, description, description2, img, alt}) => {
    return (
        <SectionContainer id="skills" lightBg={!lightBg}>
            <SectionWrapper>
                <SectionContent imgStart={imgStart}>
                    <SectionCol1>
                        <SectionTextWrapper>
                            <SectionTopLine lightTxt={lightTxt}>GERALD JOVE</SectionTopLine>
                            <SectionTitle lightTxt={lightTxt}>SKILLS</SectionTitle>
                            <SectionP lightTxt={lightTxt}>
                            <strong>Creative Skills</strong>
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            <li>Graphic Design (Adobe Illustrator, Adobe Photoshop)</li>
                            <li>Video Editing (Adobe After Effects, Adobe Premiere)</li>
                            <li>3D/CGI (Autodesk Maya, Blender)</li>
                            <li>Web Design (SublimeText, VS Code)</li>
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            <strong>Technical Skills</strong>
                            </SectionP>
                            <SectionP lightTxt={lightTxt}>
                            <li>Front-End Web Development (React, HTML, CSS, Javascript)</li>
                            <li>Back-End Web Development (PostgresSQL, Node.js)</li>
                            <li>Copywriting</li>
                            <li>Sales & Marketing</li>
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
