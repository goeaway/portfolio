import { faSadCry, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useArticlesService from "@src/hooks/use-articles-service";
import useMenuSpeed from "@src/hooks/use-menu-speed";
import useTheme from "@src/hooks/use-theme";
import { Article, ArticleType } from "@src/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FeaturedArticle from "../featured-article";
import ContentContainer from "../styled/content-container";
import PadTop from "../styled/pad-top";

export interface ArticlesPageProps {
    type: ArticleType;
}

const ArticlesPage : React.FC<ArticlesPageProps> = ({type}) => {
    const { query } = useArticlesService();
    const [term, setTerm] = useState("");
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [ready, setReady] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        query({
            term,
            type
        })
        .then(p => {
            setArticles(p);
            setReady(true);
        });
    }, [term]);

    const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    }

    return (
        <>
            <PadTop amount={4} />
            <ContentContainer>
                <SearchContainer>
                    <Search name="search" placeholder="Search by technology, e.g. React..." type="text" value={term} autoFocus onChange={searchHandler} />
                </SearchContainer>
                {articles.map(p=> (
                    <motion.div 
                        initial={{x: "-50%"}}
                        animate={{x: "0"}}
                    >
                        <FeaturedArticle key={p.id} article={p} />
                    </motion.div>
                ))}
                {ready && articles.length === 0 && (
                    <EmptyState>
                        <FontAwesomeIcon size="9x" icon={faSadCry} color={theme.background.three} />
                        <p>No {type === ArticleType.project ? "projects" : type === ArticleType.tutorial ? "tutorials" : ""} found!</p>
                    </EmptyState>
                )}
                {!ready && (
                    <EmptyState>
                        <FontAwesomeIcon size="9x" className="fa-spin" icon={faSpinner} color={theme.background.three} />
                        <p>Loading...</p>
                    </EmptyState>
                )}
            </ContentContainer>
        </>
    );
}

export default ArticlesPage;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
`

const Search = styled.input`
    padding: .75rem;
    font-size: 16px;
    border-radius: 2px;
    border: none;
    width: 100%;
    outline: none;
    background: ${p => p.theme.background.three};
    color: ${p => p.theme.fontLight.one};
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
        width: 55%;
    }
`

const EmptyState = styled.div`
    color: ${p => p.theme.background.four};
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
`