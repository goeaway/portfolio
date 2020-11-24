import { faSadCry, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArticlesService from "@src/hooks/use-articles-service";
import useTheme from "@src/hooks/use-theme";
import { Article } from "@src/types";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import TechList from "../tech-list";

interface ParamTypes {
    id: string;
}

const ArticlePage = () => {
    const { get } = useArticlesService();
    const { id } = useParams<ParamTypes>();
    const { push } = useHistory();
    const [article, setArticle] = useState<Article>();
    const [contentReady, setContentReady] = useState(false);
    const [content, setContent] = useState<string>("");
    const theme = useTheme();

    // create mount effect that queries the context for articles to find the specified one,
    // if not found redirect to the not found page (or articles page?)
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

    return (
        <Container 
            initial={{y: "50%"}}
            transition={{type:"spring",stiffness: 50}}
            animate={{y: "0%"}}
        >
            <ArticleContainer>
                {!article && (
                    <span>loading</span>
                )}
                {article && (
                    <>
                        <ArticleHeader>
                            <ArticleTitle>
                                {article.title}
                            </ArticleTitle>
                            <ArticleDesc>
                                {article.desc}
                            </ArticleDesc>
                            <TechList techs={article.techs} maxDisplay={10} />
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
    padding-top: 8rem;
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
        padding-left: 25rem;
        padding-right: 25rem;
    }
`

const ArticleContainer = styled.div`
    background: ${p => p.theme.background.two};
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    border-radius: 4px;
    width: 100%;
`

const ArticleHeader = styled.div`
    padding: 2rem;
    border-bottom: 2px solid ${p => p.theme.background.one};
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const ArticleTitle = styled.span`
    font-size: 70px;
    line-height: 90px;
    font-weight: 700;
`

const ArticleDesc = styled.span`
    font-size: 14px;
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