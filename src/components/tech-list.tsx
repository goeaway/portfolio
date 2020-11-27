import { Technology } from "@src/types";
import React from "react";
import styled, { css } from "styled-components";
import TechIcon from "./tech-icon";
import Tooltip from "./tooltip";

export interface TechListProps {
    techs: Array<Technology>;
    maxDisplay?: number;
    flexEnd?: boolean;
}

const TechList : React.FC<TechListProps> = ({techs, maxDisplay, flexEnd}) => {

    const extra = techs?.slice(maxDisplay).length;

    return (
        <Container flexEnd={flexEnd}>
            <TechListTop>
                {techs?.slice(0, maxDisplay).map(t => (
                    <TechIcon key={t.name} name={t.name} icon={t.icon} />
                    ))}
            </TechListTop>
            {!!extra && (
                <Tooltip text={techs?.slice(3).map(t => t.name).join("<br />")} html >
                    <ExtraTechs>+ {extra} more</ExtraTechs>
                </Tooltip>
            )}
        </Container>
    )
}

export default TechList;

interface ContainerProps {
    flexEnd?: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px; 

    ${(p: ContainerProps) => p.flexEnd && css`
        @media(min-width:${p => p.theme.breakpoints.md}px) {
            align-items: flex-end;
        }
    `}
`

const TechListTop = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const ExtraTechs = styled.span`
    font-size: 12px;
    line-height: 18px;
    cursor: pointer;
`