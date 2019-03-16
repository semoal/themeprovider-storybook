import { addDecorator, configure } from "@storybook/react";
import { withThemesProvider } from "../../src"

function loadStories() {
  const req = require.context("..", true, /\.stories\.jsx$/);
  req.keys().forEach((filename) => req(filename));
}

const themes = [
  {
    name: 'Light',
    backgroundColor: '#fff',
    palette: {
      TextField: {
        backgroundColor: '#f3f3f3',
        fontColor: '#212e45',
        borderColor: '#e2e6f3',
        placeholderColor: '#999999',
        opacityDisabled: 0.25,
        borderError: '#e25a66',
      },
    }
  },
  {
    name: 'Dark',
    backgroundColor: '#121833',
    palette: {
      TextField: {
        backgroundColor: '#1a213f',
        fontColor: '#808ab1',
        borderColor: '#808ab1',
        placeholderColor: '#808ab1',
        opacityDisabled: 0.45,
        borderError: '#e25a66'
      },
    }
  },
]

addDecorator(withThemesProvider(themes));

configure(loadStories, module);
