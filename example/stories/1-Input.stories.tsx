import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  border-radius: 10px;
  border-width: 0px;
  box-sizing: border-box;
  max-width: 22.5em;
  height: 3em;
  width: 100%;
  min-width: 4em;
  outline: 0;
  font-size: 16px;
  margin: 0;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${({ theme }) => theme?.palette?.TextField?.fontColor};
  background-color: ${({ theme }) => theme?.palette?.TextField?.backgroundColor};
  box-shadow: 0 0 0 1px ${({ theme }) => theme?.palette?.TextField?.backgroundColor};
  &::placeholder {
    color: ${({ theme }) => theme?.palette?.TextField?.placeholderColor};
  }
  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme?.palette?.TextField?.borderColor};
  }
`;

export default {
  title: 'Input',
  component: Input,
};

export const InputBase = () => <Input />;
export const InputWithPlaceholder = () => <Input placeholder="a common placeholder..." />;
