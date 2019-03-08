import { addDecorator, configure } from "@storybook/react";
import { withThemesProvider } from "../src";

const defaultTheme = {
  backgroundColor: "azure",
  borderRadius: "30px",
  name: "DEFAULT",
  textColor: "dimgrey",
};

const darkTheme = {
  backgroundColor: "black",
  borderRadius: "100px",
  name: "DARK",
  textColor: "seashell",
};

export const getAllThemes = () => {
  return [defaultTheme, darkTheme];
};

addDecorator(withThemesProvider(getAllThemes()));

// @ts-ignore
const req = require.context("../", true, /.stories.tsx/);
function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
