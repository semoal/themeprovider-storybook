import React from "react";
import styled from "styled-components";

const StyledSvg = styled.svg`
  width: 15px;
  height: 15px;
  z-index: 999;
  margin-left: 1em;
  svg {
    height: 15px;
    width: 15px;
  }
`;

// @ts-ignore 
const svgReference = <svg viewBox="0 0 1024 1024"><path d="M184 393c66.274 0 120 53.73 120 120s-53.726 120-120 120c-66.286 0-120-53.73-120-120s53.714-120 120-120zM512 393c66.272 0 120 53.73 120 120s-53.728 120-120 120c-66.286 0-120-53.73-120-120s53.714-120 120-120zM840 393c66.272 0 120 53.73 120 120s-53.728 120-120 120c-66.286 0-120-53.73-120-120s53.714-120 120-120z" class="css-kqzqgg"></path></svg>;

export const PlusInfo = ({ style, onClick, ...props }: { style?: object; onClick?: () => void }) => {
  return (
    <StyledSvg {...props} style={style} onClick={onClick}>
      {svgReference}
    </StyledSvg>
  )
}
