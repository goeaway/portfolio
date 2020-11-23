import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useTheme from "@src/hooks/use-theme";
import { Article } from "@src/types";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import RectangleButton from "./styled/rectangle-button";
import TechIcon from "./tech-icon";
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

    const extra = article.techs?.slice(3).length;

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
            <ContainerLower>
                <TitleLine>
                    <Title>
                        {article.title}
                    </Title>
                    <TechList>
                        <TechListTop>
                            {article.techs?.slice(0, 3).map(t => (
                                <TechIcon key={t.name} name={t.name} icon={t.icon} />
                                ))}
                        </TechListTop>
                        {!!extra && (
                            <Tooltip text={article.techs?.slice(3).map(t => t.name).join("<br />")} html >
                                <ExtraTechs>+ {extra} more</ExtraTechs>
                            </Tooltip>
                        )}
                    </TechList>
                </TitleLine>
                <Description>{article.desc}</Description>
                <RectangleButton onClick={readMoreClickHandler} color={theme.fontDark.one} outline backgroundColor="white">Read More</RectangleButton>
            </ContainerLower>
        </Container>
    );
}

export default FeaturedArticle;

const Container = styled.div`
    border-radius: 4px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin-bottom: 2rem;
    background: #232834;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        display: grid;
        grid-template-columns: 20% auto;
    }
`
    
const ContainerLower = styled.div`
    padding: 1.5rem 2rem;
    padding-bottom: 2rem;
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
    font-size: 30px;
    line-height: 38px;
    font-weight: 700;
`

const Description = styled.p`
    margin: 1rem 0 2rem 0;
`

const TechList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px; 
    
    @media(min-width:${p => p.theme.breakpoints.md}px) {
        align-items: flex-end;
    }
`

const TechListTop = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`

const ExtraTechs = styled.span`
    font-size: 12px;
    line-height: 18px;
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
`