# Storybook SC ThemeProvider

![GitHub package.json version](https://img.shields.io/github/package-json/v/semoal/themeprovider-storybook.svg)
![CircleCI (all branches)](https://img.shields.io/circleci/project/github/semoal/themeprovider-storybook.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/semoal/themeprovider-storybook.svg)
![npm](https://img.shields.io/npm/dy/themeprovider-storybook.svg)
![GitHub](https://img.shields.io/github/license/semoal/themeprovider-storybook.svg)
![BundleSize](https://img.shields.io/bundlephobia/min/themeprovider-storybook)
[![Semantic Release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](semanticrelease)

This addon helps you to display a Styled-Components ThemeProvider or a custom one in your [Storybook](https://storybook.js.org).

- Works on Storybook 5.x.x and 6.x.x (latest release)
- Switches background color.
- Works on iframes or visual regression testing.
- Allows passing a custom implementation of your own theme provider.
- Displays a popup with all the current keys of the theme. [If you want, you can disable it](#disable-popup)
- You can copy individually a value from the theme.

![Screenshot](https://i.imgur.com/y1Je5xR.gif)

## Getting Started

First, install the addon

```sh
yarn add themeprovider-storybook --dev
npm install --save-dev themeprovider-storybook
```

Add this line to your addons array inside `main.js` file (create this file inside your storybook config directory if needed).

```js
module.exports = {
  addons: [
    "themeprovider-storybook/register"
  ]
}
```

### Set options globally

Import and use the `withThemesProvider` function in your `preview.js` file.

```js
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

export const decorators = [withThemesProvider(themes)];
```

### Examples

| version | documentation |
|----------|:-------------:|
| For Storybook v5.x.x  | [OLD readme](./v5_example/README.md) |
| For Storybook v6.x.x  | [Current readme](./README.md) |


### Disable popup

```jsx
export const decorators = [withThemesProvider(themes, { disableThemePreview: true })];
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
import { DEFAULT_SETTINGS } from "themeprovider-storybook"
import { SomeCustomImplementationOfThemeProvider } from "src/app/CustomThemeProvider.jsx"

addDecorator(
  withThemesProvider(
    themes,
    DEFAULT_SETTINGS,
    SomeCustomImplementationOfThemeProvider
  )
);
```

also you can pass inside settings object the custom implementation of your theme provider.

```jsx
import { SomeCustomImplementationOfThemeProvider } from "src/app/CustomThemeProvider.jsx"

addDecorator(
  withThemesProvider(
    themes,
    { customThemeProvider: SomeCustomImplementationOfThemeProvider },
  )
);
```

`SomeCustomImplementationOfThemeProvider` must admit a `theme` as prop.
