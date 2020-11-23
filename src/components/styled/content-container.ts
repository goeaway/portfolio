import styled, { css } from "styled-components";

export interface ContentContainerProps {
    background?: string;
}

const ContentContainer = styled.div`
    overflow-x: hidden;
    padding: 2rem;
    transition: padding 300ms;
    ${(p: ContentContainerProps) => p.background && css`
        background: ${(p: ContentContainerProps) => p.background};
    `}

    @media(min-width: ${p => p.theme.breakpoints.xs}px) {
        padding: 2rem 5rem;
    }

    @media(min-width: ${p => p.theme.breakpoints.sm}px) {
        padding: 2rem 8rem;
    }

    @media(min-width:${p => p.theme.breakpoints.md}px) {
        padding: 2rem 14rem;
    }

    @media(min-width:${p => p.theme.breakpoints.lg}px) {
        padding: 2rem 18rem;
    }

    @media(min-width:${p => p.theme.breakpoints.xl}px) {
        padding: 2rem 28rem;
    }
`

export default ContentContainer;