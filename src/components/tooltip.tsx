import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

export interface TooltipProps {
    text: string;
    html?: boolean;
}



const Tooltip : React.FC<TooltipProps> = ({children, text, html}) => {
    const [open,setOpen] = useState(false);

    const onMouseEnter = () => {
        setOpen(true);
    }

    const onMouseLeave = () => {
        setOpen(false);
    }

    const variants = {
        open: { opacity: 1, display: "block" },
        closed: { opacity: 0, display: "none" }
    };

    return (
        <Container>
            <Content 
                animate={open ? "open" : "closed"}
                initial="closed"
                variants={variants}>
                {html ? <span dangerouslySetInnerHTML={{__html: text}}></span> : text}
            </Content>
            <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {children}
            </div>
        </Container>
    )
};

export default Tooltip;

const Container = styled.div`
    position: relative;
`

const Content = styled(motion.div)`
    position: absolute;
    background: ${p => p.theme.background.three};
    padding: .3rem .5rem;
    font-size: 12px;
    line-height: 18px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    bottom: 110%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
`