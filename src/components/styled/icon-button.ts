import styled from "styled-components";

const IconButton = styled.button`
    color: ${p => p.theme.fontLight.one};
    transition: color 300ms ease;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        color: ${p => p.theme.fontLight.two};
    }
`

export default IconButton;