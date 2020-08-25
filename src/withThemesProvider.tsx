import { List } from "immutable";
import * as React from "react";

import { BackgroundHelper } from "./Background";
import { ModalProvider } from "./components/Modal";
import { ThemesProvider } from "./ThemesProvider";
import { Theme } from "./types/Theme";

type ThemesProviderSettings = {
  disableThemePreview: boolean
}

const DEFAULT_SETTINGS: ThemesProviderSettings = {
  disableThemePreview: false
}

export const withThemesProvider = (
  themes: Theme[],
  settings: ThemesProviderSettings = DEFAULT_SETTINGS,
  CustomThemeProvider?: React.ComponentType<{ theme: Theme }>,
  ) => (story: any): JSX.Element => {

  return (
    <ThemesProvider CustomThemeProvider={CustomThemeProvider} story={story} themes={List(themes)}>
      {settings?.disableThemePreview ? (
        <BackgroundHelper themes={List(themes)}>{story()}</BackgroundHelper>
      ): (
        <ModalProvider>
          <BackgroundHelper themes={List(themes)}>{story()}</BackgroundHelper>
        </ModalProvider>
      )}
    </ThemesProvider>
  )
};
