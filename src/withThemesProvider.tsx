import * as React from "react";

import { BackgroundHelper } from "./Background";
import { ModalProvider } from "./components/Modal";
import { isReactComponent } from "./react-is";
import { ThemesProvider } from "./ThemesProvider";
import { Theme } from "./types/Theme";

export type CustomThemeProvider = React.ComponentType<{ theme: Theme, children: React.ReactNode }>
export type ThemesProviderSettings = {
  disableThemePreview?: boolean
  CustomThemeProvider?: CustomThemeProvider
}

export const DEFAULT_SETTINGS: ThemesProviderSettings = {
  disableThemePreview: false
}

export const withThemesProvider = (
  themes: Theme[],
  settings: ThemesProviderSettings = DEFAULT_SETTINGS,
  CustomThemeProvider?: CustomThemeProvider,
  ) => (story: any): JSX.Element => {

  // compatibility with breaking change introduced without being deployed as breaking change...
  if (settings !== null && isReactComponent(settings)) {
    CustomThemeProvider = settings as CustomThemeProvider
  } else if (settings !== DEFAULT_SETTINGS) {
    settings = { ...DEFAULT_SETTINGS, ...settings }
  }

  if (settings.CustomThemeProvider) CustomThemeProvider = settings.CustomThemeProvider

  return (
    <ThemesProvider settings={settings} CustomThemeProvider={CustomThemeProvider} story={story} themes={themes}>
      {settings?.disableThemePreview ? (
        <BackgroundHelper themes={themes}>{story()}</BackgroundHelper>
      ): (
        <ModalProvider>
          <BackgroundHelper themes={themes}>{story()}</BackgroundHelper>
        </ModalProvider>
      )}
    </ThemesProvider>
  )
};
