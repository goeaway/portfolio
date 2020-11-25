import Dark from "@src/themes/dark";
import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import HomePage from "./pages/home-page";
import NotFoundPage from "./pages/not-found-page";
import ArticlePage from "./pages/article-page";
import ArticlesPage from "./pages/articles-page";
import ArticlesServiceContext, { Service } from "@src/contexts/articles-service-context";
import Menu from "./menu";
import { ArticleType } from "@src/types";
import AnimatedSwitch from "./routes/animated-switch";
import AnimatedRoute from "./routes/animated-route";

const App = () => {
    return (
        <ThemeProvider theme={Dark}>
            <AppContainer>
                <ArticlesServiceContext.Provider value={Service}>
                    <Router>
                        <Menu />
                        <ContentContainer>
                            <AnimatedSwitch>
                                <AnimatedRoute path="/article/:id" component={ArticlePage} />
                                <AnimatedRoute path="/projects" component={() => <ArticlesPage type={ArticleType.project} />} />
                                <AnimatedRoute path="/tutorials" component={() => <ArticlesPage type={ArticleType.tutorial} />} />
                                <AnimatedRoute exact path="/" component={HomePage} />
                                <AnimatedRoute component={NotFoundPage} />
                            </AnimatedSwitch>
                        </ContentContainer>
                    </Router>
                </ArticlesServiceContext.Provider>
            </AppContainer>
        </ThemeProvider>
    );
}

export default App;

const AppContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${p => p.theme.background.one};
    color: ${p => p.theme.fontLight.one};
    position: relative;
`

const ContentContainer = styled.div`
    background
`