import styled from 'styled-components';
import { Link } from 'react-scroll';

export const Nav = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100vw;
    height: 50px;
    background-color: black;
    position: sticky;
    top: 0;
    z-index: 10;
`

export const NavbarContainer = styled.div `
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

export const NavbarMenu = styled.ul `
    list-style-type: none;
    margin-right: 25px;
`

export const NavItem = styled.li `
    display: inline;
`

export const NavLink = styled(Link) `
    text-decoration: none;
    padding: 10px;
    color: white;
    cursor: pointer;
`

export const NavLogo = styled(Link) `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 0 0;
    margin-left: 25px;
    color: white;
    cursor: pointer;
    font-weight: 500;
    font-size: 2rem;
`