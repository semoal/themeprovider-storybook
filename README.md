# Storybook SC ThemeProvider

![GitHub package.json version](https://img.shields.io/github/package-json/v/semoal/themeprovider-storybook.svg)
![CircleCI (all branches)](https://img.shields.io/circleci/project/github/semoal/themeprovider-storybook.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/semoal/themeprovider-storybook.svg)
![npm](https://img.shields.io/npm/dy/themeprovider-storybook.svg)
![GitHub](https://img.shields.io/github/license/semoal/themeprovider-storybook.svg)
![BundleSize](https://img.shields.io/bundlephobia/min/themeprovider-storybook)
[![Greenkeeper badge](https://badges.greenkeeper.io/semoal/themeprovider-storybook.svg)](https://greenkeeper.io/)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](semanticrelease)

This addon helps you to display a Styled-Components ThemeProvider or a custom one in your [Storybook](https://storybook.js.org).

- Switches background color.
- Works on iframes or visual regression testing.
- Allows passing a custom implementation of your own theme provider.
- Displays a popup with all the current keys of the theme.
- You can copy individually a value from the theme.

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

### How to use your own implementation of ThemeProvider

Thanks to @ckknight suggestion, you can easily use your own context for themeprovider.

> This is just an example of a custom theme provider, probably this is not a working, just for suggesting purposes.
```jsx
const ThemeContext: Context<Theme | void> = React.createContext();
const ThemeConsumer = ThemeContext.Consumer;

export default function SomeCustomImplementationOfThemeProvider(props: Props) {
  const outerTheme = useContext(ThemeContext);
  const themeContext = useMemo(() => mergeTheme(props.theme, outerTheme), [
    props.theme,
    outerTheme,
  ]);

  if (!props.children) {
    return null;
  }

  return <ThemeContext.Provider value={themeContext}>{props.children}</ThemeContext.Provider>;
}
```

On config.js file of Storybook, just pass a `CustomThemeProvider`
```jsx
import { SomeCustomImplementationOfThemeProvider } from "src/app/CustomThemeProvider.jsx"

addDecorator(
  withThemesProvider(themes),
  SomeCustomImplementationOfThemeProvider
);
```

`SomeCustomImplementationOfThemeProvider` must admit a `theme` as prop.