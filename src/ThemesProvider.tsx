import addons from "@storybook/addons";
import { List } from "immutable";
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "./types/Theme";

export interface ThemesProviderProps {
  themes: List<Theme>;
  children: React.ReactChild;
}

interface ThemesProvider {
  children: React.ReactChild;
  theme: Theme;
}

type BaseComponentProps = ThemesProvider;

const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({
  theme,
  children,
}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;

export const ThemesProvider: React.FunctionComponent<ThemesProviderProps> = ({ children, themes }) => {
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

  return theme ? (
    <BaseComponent theme={theme}>{children}</BaseComponent>
  ) : (
    null
  );
};
