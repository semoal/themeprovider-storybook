import addons from "@storybook/addons";
import { List } from "immutable";
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "./types/Theme";

export interface ThemesProviderProps {
  themes: List<Theme>;
  story?: any;
  children: React.ReactChild;
}

interface ThemesProvider {
  children: React.ReactChild;
  theme: Theme;
}

export const ThemesProvider: React.FunctionComponent<ThemesProviderProps> = ({ story, children, themes }) => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    const channel = addons.getChannel();
    channel.on("selectTheme", setTheme);
    channel.emit("setThemes", themes);
    return () => {
      const channelUnmount = addons.getChannel();
      channelUnmount.removeListener("selectTheme", setTheme);
    };
  }, [themes, children]);

  if (!theme && story) return <ThemeProvider theme={themes.first()}>{story()}</ThemeProvider>
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
};
