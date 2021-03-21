import styled from 'styled-components';

export const SectionContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 800px;
    background: ${({lightBg}) => (lightBg ? 'white' : 'black')};
`

export const SectionWrapper = styled.div `
    display: grid;
    justify-content: center;
    align-items: center;
    height: 800px;
    width: 1080px;
    max-width: 100vw;
    margin-right: auto;
    margin-left: auto;
    pading: 0 25px;
    z-index: 1;
`

export const SectionContent = styled.div `
    display: grid;
    grid-template-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};
    
`

export const SectionCol1 = styled.div `
    margin-bottom: 15px;
    padding: 0 25px;
    grid-area: col1;
`

export const SectionCol2 = styled.div `
    margin-bottom: 15px;
    padding: 0 25px;
    grid-area: col2;

`

export const SectionTitle = styled.h1 `
    margin-top: 0;
    margin-bottom: 0;
    color: ${({lightTxt}) => (lightTxt ? 'white' : 'black')}
`

export const SectionP = styled.p `
    margin-top: 25px;
    margin-bottom: 0;
    color: ${({lightTxt}) => (lightTxt ? 'white' : 'black')}
`

export const SectionTopLine = styled.h3 `
    margin-top: 0;
    margin-bottom: 0;
    color: ${({lightTxt}) => (lightTxt ? 'white' : 'black')}
`

export const SectionImg = styled.img `
    width: 400px;
    height: 100%;
    padding: 0 25px;
    cursor: pointer;
    transition: 
`

export const SectionTextWrapper = styled.div `
    max-width: 450px;
`

export const SectionImgWrapper = styled.div `
    max-width: 450px;
`