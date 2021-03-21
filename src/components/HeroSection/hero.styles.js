import styled from 'styled-components';

export const HeroContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
    position: relative;
    background: red;
    z-index: 1;

    :before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%), linear-gradient(180deg, rgba(0,0,0,0.2) 100%, rgba(0,0,0,0.6) 100%, transparent);  
    }
`

export const HeroBG = styled.video `
    width: 100%;
    height: 100%;
    overflow: hidden;
    -web-object-fit: cover;
    object-fit: cover;
`

export const HeroVideo = styled.div `
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
`

export const HeroContent = styled.div `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index:3;
`

export const HeroTitle = styled.h1 `
    margin: 0;
    font-size: 8rem;
    color: white;
`

export const HeroSubtitle = styled.p `
    font-size: 2rem;
    color: white;
`