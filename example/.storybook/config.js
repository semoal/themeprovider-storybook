import { addDecorator, configure } from "@storybook/react";
import { withThemesProvider } from "../../src"

function loadStories() {
  const req = require.context("..", true, /\.stories\.jsx$/);
  req.keys().forEach((filename) => req(filename));
}

const themes = [
  {
    name: 'Light',
    backgroundColor: '#dad4da',
    palette: {
      blueOcean: '#2288a8',
      greenOl: '#6d8836'
    }
  },
  {
    name: 'Dark',
    backgroundColor: '#736056',
    palette: {
      blueOcean: '#6d8836',
      greenOl: '#2288a8'
    }
  },
]

addDecorator(withThemesProvider(themes));

configure(loadStories, module);
