import styled from 'styled-components';
import { Link } from 'react-scroll';
export const FooterContainer = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 600px;
    background: black;
`

export const FooterWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1080px;
    height: 300px;
`

export const FooterLinkContainer = styled.div `
display: flex;
justify-content: space-between;
width: 100%;
`

export const FooterLinkMenu = styled.ul `
display: flex;
justify-content: center;
padding: 0;
`

export const FooterLinkItems = styled.li `
padding: 10px;
list-style-type: none;
`

export const FooterLinkTitle = styled.h3 `
list-style-type: none;
color: white;
`

export const FooterLink = styled(Link) `
text-decoration: none;
color: white;
padding-left: 10px;
cursor: pointer;
`

export const FooterHyperLink = styled.a `
text-decoration: none;
color: white;
padding-left: 10px;
cursor: pointer;
`

export const FooterP = styled.p `
color: white;
padding-left: 10px;
`