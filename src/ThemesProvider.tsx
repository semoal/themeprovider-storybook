import addons from "@storybook/addons";
import * as React from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "./types/Theme";
import { ThemesProviderSettings } from "./withThemesProvider";
import { useEffect } from ".pnpm/@storybook+addons@5.3.21_a6719548f2de806ac36be576bff5ec40/node_modules/@storybook/addons";

export interface ThemesProviderProps {
  themes: Array<Theme>;
  settings: ThemesProviderSettings;
  CustomThemeProvider?: React.ComponentType<{ theme: Theme }>;
  story?: any;
  children: React.ReactChild;
}

interface ThemesProvider {
  children: React.ReactChild;
  theme: Theme;
}

export const ThemesProvider: React.FunctionComponent<ThemesProviderProps> = ({
  settings,
  story,
  children,
  themes,
  CustomThemeProvider,
}) => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    const channel = addons.getChannel();
    channel.on("selectTheme", setTheme);
    channel.emit("setThemes", themes);
    channel.emit("setSettings", settings);
    return () => {
      const channelUnmount = addons.getChannel();
      channelUnmount.removeListener("selectTheme", setTheme);
    };
  }, []);

  if (CustomThemeProvider) {
    if (!theme && story)
      return (
        <CustomThemeProvider theme={themes[0]}>{children}</CustomThemeProvider>
      );
    return <CustomThemeProvider theme={theme}>{children}</CustomThemeProvider>;
  }

  if (!theme && story)
    return <ThemeProvider theme={themes[0]}>{children}</ThemeProvider>;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
