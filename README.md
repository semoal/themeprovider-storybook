# Storybook SC ThemeProvider

![GitHub package.json version](https://img.shields.io/github/package-json/v/semoal/themeprovider-storybook.svg)
![CircleCI (all branches)](https://img.shields.io/circleci/project/github/semoal/themeprovider-storybook.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/semoal/themeprovider-storybook.svg)
![npm](https://img.shields.io/npm/dy/themeprovider-storybook.svg)
![GitHub](https://img.shields.io/github/license/semoal/themeprovider-storybook.svg)
[![Greenkeeper badge](https://badges.greenkeeper.io/semoal/themeprovider-storybook.svg)](https://greenkeeper.io/)

## Added new features
⚠️ v1.2.0 - Added preview of the theme selected ⚠️

---

The ThemeProvider storybook addon let's you show your Styled-Components theme on your favourite [Storybook](https://storybook.js.org) UI at runtime.

![Screenshot](https://i.imgur.com/y1Je5xR.gif)

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
