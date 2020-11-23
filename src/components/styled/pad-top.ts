import styled from "styled-components";

export interface PadTopProps {
    amount?: number;
}

const PadTop = styled.div`
    padding-top: ${(p: PadTopProps) => p.amount + "rem" || "2rem"};
`

export default PadTop;