import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import CircularIconButton from "./styled/circular-icon-button";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Theme } from "@src/types";
import useOnClickOutside from "@src/hooks/use-on-click-outside";

const Menu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [hasBackground, setHasBackground] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const loc = useLocation();
    useOnClickOutside(containerRef, () => setMenuOpen(false));

    useEffect(() => {
        const scrollHandler = () => {
            // if current scroll is more than x and hasbackground is false, set to true
            // if current scroll is less than x and hasBackground is true, set to false
            const scroll = document.documentElement.scrollTop;
            const THRESHOLD = 50;

            if(scroll >= THRESHOLD && !hasBackground) {
                setHasBackground(true);
            } else if (scroll < THRESHOLD && hasBackground) {
                setHasBackground(false);
            }
        }

        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, [hasBackground]);

    const menuExpandClickHandler = () => {
        setMenuOpen(!menuOpen);
    }

    const itemClickHandler = () => {
        setMenuOpen(false);
    }

    return (
        <Container useBackground={hasBackground} open={menuOpen} ref={containerRef}>
            <MenuContainer open={menuOpen}>
                <MenuLink a={(loc.pathname === "/").toString()} onClick={itemClickHandler} to={loc.pathname === "/" ? "#" : "/"}>Home</MenuLink>
                <MenuLink a={(loc.pathname === "/projects").toString()} onClick={itemClickHandler} to={loc.pathname === "/projects" ? "#" : "/projects"}>Projects</MenuLink>
                <MenuLink a={(loc.pathname === "/tutorials").toString()} onClick={itemClickHandler} to={loc.pathname === "/tutorials" ? "#" : "/tutorials"}>Tutorials</MenuLink>
            </MenuContainer>
            <MenuExpand onClick={menuExpandClickHandler}><FontAwesomeIcon icon={faBars} size="lg" /></MenuExpand>
        </Container>
    );
}

export default Menu;

interface ContainerProps {
    open: boolean;
    useBackground: boolean;
}

const Container = styled.div`
    z-index: 1;
    position: fixed;
    display: flex;
    width: 100%;
    justify-content: space-between;
    transition: background 300ms ease, box-shadow 300ms ease;
    background: ${(p: ContainerProps & { theme: Theme }) => p.open || p.useBackground ? p.theme.background.one : "transparent"};
    box-shadow: ${(p: ContainerProps) => p.open || p.useBackground ? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" : "none"};
    padding: .5rem 1rem;

    @media(min-width: ${p => p.theme.breakpoints.sm}px) {
        justify-content: flex-end;
        background: ${(p: ContainerProps & { theme: Theme }) => p.useBackground ? p.theme.background.one : "transparent"};
        box-shadow: ${(p: ContainerProps) => p.useBackground? "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)" : "none"};
    }
`

interface MenuContainerProps {
    open: boolean;
}

const MenuContainer = styled.div`
    transition: height 300ms ease;
    height: ${(p: MenuContainerProps) => p.open ? "130px": "0"};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;

    @media(min-width: ${p => p.theme.breakpoints.sm}px) {
        height: auto;
        width: auto;
        flex-direction: row;
    }
`

const MenuExpand = styled(CircularIconButton)`
    @media(min-width: ${p => p.theme.breakpoints.sm}px) {
        display: none;
    }
`

interface MenuLinkProps {
    a: string;
}

const MenuLink = styled(Link)`
    text-decoration: none;
    padding: .75rem;
    text-align: center;
    color: ${p => p.theme.fontLight.one};
    transition: color 300ms;

    ${(p: MenuLinkProps) => p.a === "true" && css`
        color: ${p => p.theme.fontLight.two};
        cursor: default;
    `}

    &:hover {
        color: ${p => p.theme.fontLight.two};
    }
`