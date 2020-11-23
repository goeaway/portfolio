import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArticlesService from "@src/hooks/use-articles-service";
import { Article } from "@src/types";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import CircularIconButton from "../styled/circular-icon-button";
import RectangleButton from "../styled/rectangle-button";
import useTheme from "@src/hooks/use-theme";
import { useHistory } from "react-router";
import FeaturedArticle from "../featured-article";
import ContentContainer from "../styled/content-container";
import useElementInViewport from "@src/hooks/use-element-in-viewport";
import { motion } from "framer-motion";

const iamaChoices = [
    "React Developer.",
    "TypeScript Developer.",
    "Front End Developer.",
    ".NET Developer.",
    "Back End Developer.",
    "SQL Developer.",
    "Full Stack Developer.",
    "Raspberry Pi Tinkerer.",
    "Docker Enthusiast."
];

const HomePage = () => {
    const theme = useTheme();
    const [featured, setFeatured] = useState<Array<Article>>([]);
    const { query } = useArticlesService();
    const [iamaIndex, setIamaIndex] = useState(0);
    const [iama, setIama] = useState(iamaChoices[0]);
    // false to remove, true to type
    const [typeState, setTypeState] = useState(false);
    const { push } = useHistory();

    const heroRef = useRef<HTMLDivElement>(null);
    const heroInViewport = useElementInViewport(heroRef, true);

    const aboutRef = useRef<HTMLDivElement>(null);
    const aboutInViewport = useElementInViewport(aboutRef, true);

    const featuredRef = useRef<HTMLDivElement>(null);
    const featuredInViewport = useElementInViewport(featuredRef, true);

    useEffect(() => {
        query({
            featured: true
        })
        .then(articles => setFeatured(articles));
    }, []);

    useEffect(() => {
        // type out a new choice into the iama
        if(typeState) {
            // get next choice
            const nextIndex = iamaIndex + 1 === iamaChoices.length ? 0 : iamaIndex + 1;
            const choice = iamaChoices[nextIndex];
            let localTypeIndex = 0;

            const typingInterval = setInterval(() => {
                if(localTypeIndex !== choice.length) {
                    setIama(i => choice.substring(0, ++localTypeIndex));
                } else {
                    setIamaIndex(nextIndex);
                    setTypeState(false);
                    clearInterval(typingInterval);
                }
            }, 75);

            return () => {
                clearInterval(typingInterval);
            }

        } else { // remove one character at a time from the iama
            let removingInterval;
            setTimeout(() => {
                let localTypeIndex = iama.length;
                removingInterval = setInterval(() => {
                    if(localTypeIndex) {
                        setIama(i => i.substr(0, --localTypeIndex));
                    } else {
                        setTypeState(true);
                        clearInterval(removingInterval);
                    }
                }, 75);
            }, 1500);

            return () => {
                if(removingInterval) {
                    clearInterval(removingInterval);
                }
            }
        }
    }, [typeState]);

    const gitHubClickHandler = () => {
        var tab = window.open("https://github.com/goeaway", "_blank");
        tab.focus();
    }

    const linkedinClickHandler = () => {
        var tab = window.open("https://www.linkedin.com/in/joe-thompson-murdoch-41b4b2158/", "_blank");
        tab.focus();
    }

    const readMoreClickHandler = () => {
        // target - 60 (for navbar height)
        const target = aboutRef.current.offsetTop - 60;

        const scrollTo = (element: HTMLElement, to: number, duration: number) => {
            if (duration <= 0) {
                return;
            }

            const difference = to - element.scrollTop;
            const perTick = difference / duration * 10;
        
            setTimeout(function() {
                element.scrollTop = element.scrollTop + perTick;
                if (element.scrollTop === to) {
                    return;
                }
                
                scrollTo(element, to, duration - 10);
            }, 10);
        }

        scrollTo(document.documentElement, target, 300);
    }

    const contactMeClickHandler = () => {
        push("/contact");
    }

    return (
        <>
            <Hero ref={heroRef}>
                <motion.div
                    initial={{y: "-100%"}}
                    animate={aboutInViewport ? {y: "0"} : {y: "-100%"}}
                >
                    <MainTag>Hi, I'm <Highlighted>Joe Thompson.</Highlighted></MainTag>
                    <SecondaryTag>I'm a <Highlighted>{iama}</Highlighted></SecondaryTag>
                    <TertiaryTag>
                        Welcome to my portfolio! Take a look at some of the personal projects I've worked on.
                    </TertiaryTag>
                    <ButtonRow>
                        <CircularIconButton onClick={gitHubClickHandler}><FontAwesomeIcon icon={faGithub} size="lg" /></CircularIconButton>
                        <CircularIconButton onClick={linkedinClickHandler}><FontAwesomeIcon icon={faLinkedin} size="lg" /></CircularIconButton>    
                    </ButtonRow>
                    <ButtonRow>
                        <RectangleButton onClick={readMoreClickHandler} color={theme.fontDark.one} backgroundColor="white">Read More</RectangleButton>
                        <RectangleButton onClick={contactMeClickHandler} outline backgroundColor="white" color={theme.fontDark.one}>Contact Me</RectangleButton>
                    </ButtonRow>
                </motion.div>
            </Hero>     
            <ContentContainer background={theme.background.two} ref={aboutRef}>
                <motion.div
                    initial={{x: "50%"}}
                    animate={aboutInViewport ? {x: "0"} : {x: "50%"}}
                >
                    <FeaturedTitle>
                        <Highlighted>
                            About Me
                        </Highlighted>
                    </FeaturedTitle>
                    <p>
                        Hi I'm Joe, I'm a 24 year old Full Stack Developer based in London. I'm currently working for Spotler UK, a marketing automation company. 
                    </p>
                    <p>
                        I spend a lot of my time working with .Net, TypeScript and React but have dabbled in some really cool technology like Docker, SignalR and Raspberry Pis when I get the time.
                    </p>
                    <p>
                        Take a look around at some of the personal projects I've worked on or feel free to get in touch if you'd like to talk about programming!
                    </p>
                </motion.div>
            </ContentContainer>   
                <ContentContainer ref={featuredRef}>
                <motion.div
                    initial={{x: "-50%"}}
                    animate={featuredInViewport ? {x: "0"} : {x: "-50%"}}
                >
                    <FeaturedTitle>
                        <Highlighted>
                            Featured Projects
                        </Highlighted>
                    </FeaturedTitle>
                    {featured.map(f => <FeaturedArticle key={f.id} article={f} />)}
                </motion.div>
            </ContentContainer>
        </>
    );
}

export default HomePage;

const MainTag = styled.span`
    font-size: 36px;
    line-height: 60px;
    display: block;
`

const FeaturedTitle = styled.span`
    font-size: 32px;
    line-height: 56px;
    display: block;
    margin-bottom: 1rem;
`

const SecondaryTag = styled.span`
    font-size: 24px;
    line-height: 40px;
    display: block;
`

const TertiaryTag = styled.span`
    display: block;
    padding-top: 1rem;
    font-size: 14px;
`

const Hero = styled.div`
    padding: 10rem 2rem;
    transition: padding 300ms;
    display: flex;
    flex-direction: column;

    background-image: url(${p => p.theme.heroSrc});
    background-repeat: no-repeat;
    background-size: cover;

    @media(min-width:${p => p.theme.breakpoints.xs}px) {
        padding-left: 5rem;
        padding-right: 5rem;
    }

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        padding-left: 8rem;
        padding-right: 8rem;
    }

    @media(min-width:1600px) {
        padding-top: 20rem;
        padding-bottom: 15rem;
    }
`

const ButtonRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 1rem;
`

const Highlighted = styled.span`
    font-weight: 700;
`
