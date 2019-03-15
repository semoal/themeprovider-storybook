import { configure } from "@storybook/react";

function loadStories() {
  const req = require.context("..", true, /\.stories\.tsx$/);
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
