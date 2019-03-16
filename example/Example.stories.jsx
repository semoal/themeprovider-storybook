import { storiesOf } from "@storybook/react";
import React from "react";
import styled, { css } from "styled-components";

const Button = styled.button`
  background: #fff;
  color: ${({ theme }) => theme.palette.blueOcean};
  font-size: 1em;
  outline: 0;
  margin: 1em;
  padding: 0.25em 1em;
  border: ${({ theme }) => `2px solid ${theme.palette.greenOl}` };
  border-radius: 3px;
`;

storiesOf("Button", module)
  .add("with text", () => <Button>Hello Button</Button>)
  .add("with emoji", () => (
    <Button>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
