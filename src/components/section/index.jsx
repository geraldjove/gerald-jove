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
 } from './section.styles.js';

const Section = ({id, lightBg, lightTxt, imgStart, topLine, headLine, description, description2, img, alt}) => {
    return (
        <SectionContainer id={id} lightBg={lightBg}>
            <SectionWrapper>
                <SectionContent imgStart={imgStart}>
                    <SectionCol1>
                        <SectionTextWrapper>
                            <SectionTopLine lightTxt={lightTxt}>{topLine}</SectionTopLine>
                            <SectionTitle lightTxt={lightTxt}>{headLine}</SectionTitle>
                            <SectionP lightTxt={lightTxt}>{description}</SectionP>
                        </SectionTextWrapper>
                    </SectionCol1>
                    <SectionCol2>
                        <SectionImgWrapper>
                            <SectionImg src={img} alt={alt}></SectionImg>
                        </SectionImgWrapper>
                    </SectionCol2>
                </SectionContent>
            </SectionWrapper>
        </SectionContainer>
    )
}

export default Section
