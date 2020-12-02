import useMenuSpeed from "@src/hooks/use-menu-speed";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundPage = () => {
    useEffect(() => {
        document.title = "Joe Thompson-Murdoch | Not Found";
    }, []);

    return (
        <Container>
            <TextContainer>
                <BigText>
                    Not Found
                </BigText>
                <SmallText>
                    <HomeLink to="/">Click here</HomeLink> to get back to safety
                </SmallText>
            </TextContainer>
            <John 
                initial={{bottom: "-50%"}}
                transition={{delay:.3}}
                animate={{bottom: "0%"}}
                srcSet="/assets/siteimages/notfound.gif" 
                alt="We couldn't even find this image!" />
        </Container>
    );
}

export default NotFoundPage;

const Container = styled.div`
    position: relative;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`
    
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 5rem;
    
    align-items: flex-end;
`

const BigText = styled.span`
    font-size: 90px;
    line-height: 100px;
    font-weight: 700;
`

const SmallText = styled.span`
    font-size: 16px;
    line-height: 22px;
`

const HomeLink = styled(Link)`
    color: ${p => p.theme.fontLight.one};
    transition: color 300ms;

    &:hover {
        color: ${p => p.theme.fontLight.two};
    }
`

const John = styled(motion.img)`
    position: absolute;
    transition: left 300ms ease;
    bottom: 0;
    left: 0;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        left: 20%;
    }
`