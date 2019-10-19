import styled, { css } from "styled-components";

interface IStyledButton {
  children: any;
  isSelected: boolean;
  key: number;
  onClick: () => void;
}

const Row = styled.div`
  display: flex;
  height: auto;
  padding: 15px;
`;

const Button = styled.button<IStyledButton>`
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: all 150ms ease-out;
  transform: translate3d(0, 0, 0);
  vertical-align: top;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  user-select: none;
  opacity: 1;
  margin: 0 1em 0 0;
  max-height: 3em;
  outline: none;
  font-family: inherit;
  font-size: inherit;
  box-sizing: border-box;
  background: transparent;
  font-weight: 700;
  line-height: 1;
  box-shadow: rgba(51, 51, 51, 0.2) 0 0 0 1px inset;
  color: rgba(51, 51, 51, 0.7);

  &:hover {
    box-shadow: rgba(51, 51, 51, 0.5) 0 0 0 1px inset;
  }

  ${({ isSelected }) => isSelected && css`
    background: #1ea7fd;
    color: #fcfcfc;
    box-shadow: #2795ee 0 0 0 1px inset;
  `}
` as React.FunctionComponent<IStyledButton>;

export {
  Row,
  Button,
};
