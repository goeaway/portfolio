import styled from "styled-components";

const CircularIconButton = styled.button`
    border-radius: 50%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${p => p.theme.fontLight.one};
    border: none;
    outline: none;
    width: 35px;
    height: 35px;
    transition: background 300ms ease;
    cursor: pointer;

    &:hover {
        background: rgba(0,0,0,0.5);
    }
`

export default CircularIconButton;