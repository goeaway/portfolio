import styled, { css } from "styled-components";

export interface RectangleButtonProps {
    outline?: boolean;
    backgroundColor: string;
    color?: string;
};

const RectangleButton = styled.button`
    background: ${(p: RectangleButtonProps) => p.outline ? "transparent" : p.backgroundColor};
    outline: none;
    border: 2px solid ${(p: RectangleButtonProps) => p.backgroundColor};
    color: ${(p: RectangleButtonProps) => p.outline ? p.backgroundColor : p.color};
    padding: .5rem .75rem;
    font-weight: 600;    
    border-radius: 1px;
    cursor:pointer;
    transition: opacity 300ms ease, background 300ms ease;
    font-family: "Oxygen", sans-serif;

    &:hover {
        ${(p: RectangleButtonProps) => p.outline ? css`
            background: ${(p: RectangleButtonProps) => p.backgroundColor};
            color: ${(p: RectangleButtonProps) => p.color};
        ` : css`
            opacity: .8;
        `}
    }
`

export default RectangleButton;