import styled, { css } from "styled-components";

export interface RectangleLinkProps {
    outline?: boolean;
    backgroundColor: string;
    color?: string;
};

const RectangleLink = styled.a`
    background: ${(p: RectangleLinkProps) => p.outline ? "transparent" : p.backgroundColor};
    outline: none;
    border: 2px solid ${(p: RectangleLinkProps) => p.backgroundColor};
    color: ${(p: RectangleLinkProps) => p.outline ? p.backgroundColor : p.color};
    padding: .5rem .75rem;
    font-weight: 600;    
    border-radius: 1px;
    cursor:pointer;
    transition: opacity 300ms ease, background 300ms ease;
    font-size: 12px;
    text-decoration: none;
    text-align: center;

    &:hover {
        ${(p: RectangleLinkProps) => p.outline ? css`
            background: ${(p: RectangleLinkProps) => p.backgroundColor};
            color: ${(p: RectangleLinkProps) => p.color};
        ` : css`
            opacity: .8;
        `}
    }
`

export default RectangleLink;