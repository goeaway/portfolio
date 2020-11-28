import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTheme from "@src/hooks/use-theme";
import { Article } from "@src/types";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import RectangleButton from "./styled/rectangle-button";
import TechIcon from "./tech-icon";
import TechList from "./tech-list";
import Tooltip from "./tooltip";

export interface FeaturedArticleProps {
    article: Article;
}

const FeaturedArticle : React.FC<FeaturedArticleProps> = ({article}) => {
    const { push } = useHistory();
    const theme = useTheme();

    const readMoreClickHandler = () => {
        push(`/article/${article.id}`);
    }

    return (
        <Container>
            <FeaturedImage src={article.featuredImage}>
                {!article.featuredImage && (
                    <>
                        <FontAwesomeIcon size="7x" icon={faSadCry} color={theme.background.three} />
                        <p>Image not found</p>
                    </>
                )}
            </FeaturedImage>
            <ContentMain>
                <TitleLine>
                    <Title>
                        {article.title}
                    </Title>
                        <TechList techs={article.techs} maxDisplay={3} flexEnd />
                </TitleLine>
                <Description>{article.desc}</Description>
                <RectangleButton onClick={readMoreClickHandler} color={theme.fontDark.one} outline backgroundColor="white">Read More</RectangleButton>
            </ContentMain>
        </Container>
    );
}

export default FeaturedArticle;

const Container = styled.div`
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin-bottom: 3rem;
    background: #232834;
    display: flex;
    flex-direction: column;
    
    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        display: grid;
        grid-template-columns: 25% auto;
    }
`
    
const ContentMain = styled.div`
    padding: 2rem;
`

const TitleLine = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media(min-width:${p => p.theme.breakpoints.md}px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`

const Title = styled.span`
    font-size: 40px;
    line-height: 60px;
    font-weight: 700;
    word-wrap: anywhere;
`

const Description = styled.p`
    margin: 2rem 0 3rem 0;
`

interface FeaturedImageProps {
    src: string;
}

const FeaturedImage = styled.div`
    background-image: url(${(p: FeaturedImageProps) => p.src});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${p => p.theme.background.four};
    padding: 1rem;
    padding-top: 2rem;
    min-height: 100px;

    border-top-right-radius: 4px;
    border-top-left-radius: 4px;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        border-top-right-radius: 0;
        border-bottom-left-radius: 4px;
    }
`