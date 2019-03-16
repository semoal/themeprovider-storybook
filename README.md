# Storybook SC ThemeProvider

[![npm version](https://badge.fury.io/js/themeprovider-storybook.svg)](https://badge.fury.io/js/themeprovider-storybook)

The ThemeProvider storybook addon let's you show your Styled-Components theme on your favourite [Storybook](https://storybook.js.org) UI at runtime.

![Screenshot](https://j.gifs.com/BNLlLo.gif)

## Getting Started

First, install the addon

```sh
yarn add themeprovider-storybook --dev
npm install --save-dev themeprovider-storybook
```

Add this line to your `addons.js` file (create this file inside your storybook config directory if needed).

```js
import 'themeprovider-storybook/register';
```

### Set options globally

Import and use the `addDecorator` in your `config.js` file.

```js
import { addDecorator, configure } from '@storybook/react';
import { withThemesProvider } from "themeprovider-storybook";

// Options:
const themes = [
  {
    name: 'Theme1' // Required it's used for displaying the button label,
    backgroundColor: '#fff' // Optional, it's used for setting dynamic background color on storybook
    ..., // Your theme keys (Check example if you need some help)
  },
  {
    name: 'Theme2' // Required it's used for displaying the button label,
    backgroundColor: '#000'// Optional, it's used for setting dynamic background color on storybook
    ..., // Your theme keys (Check example if you need some help)
  }
]
addDecorator(withThemesProvider(themes));

configure(() => require('./stories'), module);
```
