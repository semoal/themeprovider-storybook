import { storiesOf } from "@storybook/react";
import * as React from "react";
import styled from "styled-components";

const Button = styled("button")<{ primary?: boolean }>`
  background: ${({ primary }) => (primary ? "palevioletred" : "white")};
  color: ${({ primary }) => (primary ? "white" : "palevioletred")};
  font-size: 1em;
  outline: 0;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
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
