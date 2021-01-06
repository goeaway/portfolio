import { faGit, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkSquareAlt, faSadCry, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArticlesService from "@src/hooks/use-articles-service";
import useMenuSpeed from "@src/hooks/use-menu-speed";
import useTheme from "@src/hooks/use-theme";
import { Article } from "@src/types";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory, useParams } from "react-router";
import styled, { css } from "styled-components";
import RectangleLink from "../styled/rectangle-link";
import TechList from "../tech-list";

interface ParamTypes {
    id: string;
}

const ArticlePage = () => {
    const { setSpeed } = useMenuSpeed();
    const { get } = useArticlesService();
    const { id } = useParams<ParamTypes>();
    const { push } = useHistory();
    const [article, setArticle] = useState<Article>();
    const [contentReady, setContentReady] = useState(false);
    const [content, setContent] = useState<string>("");
    const theme = useTheme();
    const titleRef = useRef<HTMLDivElement>(null);
    const [fixedHeader, setFixedHeader] = useState(false);

    useEffect(() => {
        // set speed to nothing so we don't accidently see featured image!!
        setSpeed(0);
        
        return () => {
            setSpeed(300);
        }
    }, []);
    
    useEffect(() => {
        if(article) {
            document.title = `Joe Thompson-Murdoch | ${(article.title)}`;
        }
    }, [article]);

    useEffect(() => {
        if(id) {
            get(id).then(a => {
                if(a) {
                    setArticle(a);

                    if(a.content) {
                        fetch(a.content)
                            .then(response => response.text()
                                .then(data => {
                                    setContent(data);
                                    setContentReady(true);
                                }));
                    } else {
                        setContentReady(true);
                    }
                } else {
                    push("/notfound");
                }
            })
        }
    }, [id]);

    useLayoutEffect(() => {
        const resizeHandler = () => {
            // if part of article header is behind navbar or off screen
            // we should change the state of the article header so it becomes a fixed 
            // element
            if(titleRef.current) {
                const { scrollTop } = document.documentElement;
                // provide a slight buffer so it doesn't constantly switch between them if scrolled just to right amount
                setFixedHeader(fixed => scrollTop >= (fixed ? 50 : 60));
            }
        }

        resizeHandler();

        window.addEventListener("scroll", resizeHandler);

        return () => {
            window.removeEventListener("scroll", resizeHandler);
        }
    }, [titleRef]);

    return (
        <Container 
            initial={{y: "50%"}}
            transition={{type:"spring",stiffness: 50}}
            animate={{y: "0%"}}
        >
            <ArticleContainer>
                {!article && (
                    <FlexCentre>
                    <FontAwesomeIcon 
                        className="fa-spin" 
                        color={theme.background.three}
                        icon={faSpinner} 
                        size="9x" />
                    </FlexCentre>
                )}
                {article && (
                    <>
                        <ArticleHeader fixedMode={fixedHeader}>
                            <ArticleHeaderLeft>
                                <ArticleTitle ref={titleRef} fixedMode={fixedHeader}>
                                    {article.title}
                                </ArticleTitle>
                                <ArticleDesc fixedMode={fixedHeader}>
                                    {article.desc}
                                </ArticleDesc>
                            </ArticleHeaderLeft>
                            <ArticleHeaderRight>
                                <HideFixedModeTechList fixedMode={fixedHeader} >
                                    <TechList 
                                        techs={article.techs} 
                                        maxDisplay={fixedHeader ? 3 : 10} />
                                </HideFixedModeTechList>
                                <ButtonContainer>
                                    {article.liveLink && (
                                        <RectangleLink
                                            color={theme.fontDark.one} 
                                            backgroundColor="white"
                                            href={article.liveLink}
                                        >
                                            <HiddenXsSm>View&nbsp;</HiddenXsSm>Live<HiddenXsSm></HiddenXsSm>
                                        </RectangleLink>
                                    )}
                                    {article.githubLink && (
                                        <RectangleLink 
                                            color={theme.fontDark.one} 
                                            outline
                                            href={article.githubLink}
                                            backgroundColor="white"
                                        >
                                                <HiddenXsSm>View on&nbsp;</HiddenXsSm>Github
                                        </RectangleLink>
                                    )}
                                </ButtonContainer>
                            </ArticleHeaderRight>
                        </ArticleHeader>
                        <ArticleBody>
                            {!contentReady && (
                                <FlexCentre>
                                    <FontAwesomeIcon 
                                        className="fa-spin" 
                                        color={theme.background.three}
                                        icon={faSpinner} 
                                        size="9x" />
                                </FlexCentre>
                            )}
                            {contentReady && content && (
                                <>
                                    {/* Featured image */}
                                    {article.featuredImage && (
                                        <FlexCentre>
                                            <FeaturedImage srcSet={article.featuredImage} alt="Featured Image" />
                                        </FlexCentre>
                                    )}
                                    {/* markdown */}
                                    <ReactMarkdown>
                                        {content}
                                    </ReactMarkdown>
                                </>
                            )}
                            {contentReady && !content && (
                                <EmptyContent>
                                    <FontAwesomeIcon icon={faSadCry} color={theme.background.three} size="9x" />
                                    <EmptyContentText>No Content!</EmptyContentText>
                                </EmptyContent>
                            )}
                        </ArticleBody>
                    </>
                )}
            </ArticleContainer>
        </Container>
    );
}

export default ArticlePage;

const Container = styled(motion.div)`
    display: flex;
    justify-content: center;
    padding: 2rem;
    padding-top: 6rem;
    transition: padding 300ms ease;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        padding-left: 5rem;
        padding-right: 5rem;
    }

    @media(min-width:${p => p.theme.breakpoints.md}px) {
        padding-left: 8rem;
        padding-right: 8rem;
    }

    @media(min-width:${p => p.theme.breakpoints.lg}px) {
        padding-left: 10rem;
        padding-right: 10rem;
    }

    @media(min-width:${p => p.theme.breakpoints.xl}px) {
        padding-left: 30rem;
        padding-right: 30rem;
    }
`

const ArticleContainer = styled.div`
    background: ${p => p.theme.background.two};
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-radius: 4px;
    width: 100%;
    position: relative;
    margin-bottom: 140px;
`

interface FixedModeProps {
    fixedMode: boolean;
}

const ArticleHeader = styled.div`
    padding: 1rem 2rem 2rem 2rem;
    border-bottom: 2px solid ${p => p.theme.background.one};
    display: flex;
    flex-direction: column;
    background: ${p => p.theme.background.two};
    width: 100%;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    gap: 1rem;
    transition: height 300ms ease;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        gap:0;
        flex-direction: row;
        justify-content: space-between;
    }

    ${(p: FixedModeProps) => p.fixedMode && css`
        padding: 1rem 2rem;
        position: sticky;
        top: 51px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
        border-top-right-radius: 0;
        border-top-left-radius: 0;

        @media(min-width:${p => p.theme.breakpoints.sm}px) {
            top: 60px;
        }
    `}
`

const ArticleHeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const ArticleHeaderRight = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        justify-content: center;
        align-items: flex-end;
    }
`

const ArticleTitle = styled.span`
    font-size: 40px;
    line-height: 55px;
    font-weight: 700;
    transition: font-size 300ms ease, line-height 300ms ease;
    padding-right: 2rem;
    word-wrap: anywhere;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        font-size: ${(p: FixedModeProps) => p.fixedMode ? "40px" : "70px"};
        line-height: ${(p: FixedModeProps) => p.fixedMode ? "55px" : "90px"};;
    }
`

const ArticleDesc = styled.span`
    font-size: 14px;
    padding-right: 2rem;

    ${(p: FixedModeProps) => p.fixedMode && css`
        display: none;
    `}
`

const ArticleBody = styled.div`
    padding: 2rem;

    *:first-child {
        margin-top: 0;
    }

    p, li {
        font-size: 14px;
        line-height: 20px;
    }

    a {
        color: ${p => p.theme.fontLight.one};
        transition: color 300ms ease;

        &:hover {
            color: ${p => p.theme.fontLight.two};
        }
    }

    pre {
        padding: 1rem;
        border-radius: 4px;
        background: ${p => p.theme.background.three};
        overflow-x: auto;
    }

    code {
        padding: .2rem;
        border-radius: 4px;
        background: ${p => p.theme.background.three};
    }

    img {
        margin: 1.5rem auto;
        border-radius: 6px;
        max-width: 100%;
        display: block;
    }

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        img {
            max-width: 90%;
        }
    }

    @media(min-width:${p => p.theme.breakpoints.md}px) {
        img {
            max-width: 80%;
        }
    }
`

const FlexCentre = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const EmptyContent = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const FeaturedImage = styled.img`
    max-width: 100%;
    max-height: 400px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const EmptyContentText = styled.p`
    color: ${p => p.theme.background.four};
`

const HideFixedModeTechList = styled.div`
    ${(p: FixedModeProps) => p.fixedMode && css`
        display: none !important;
    `}
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
`

const HiddenXsSm = styled.span`
    display: none;

    @media(min-width:${p => p.theme.breakpoints.md}px) {
        display: inline-block;
    }
`