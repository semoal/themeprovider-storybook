import { List } from "immutable";
import * as React from "react";

import { BackgroundHelper } from "./Background";
import { ModalProvider } from "./components/Modal";
import { ThemesProvider } from "./ThemesProvider";
import { Theme } from "./types/Theme";

export const withThemesProvider = (themes: Theme[], CustomThemeProvider?: React.ComponentType<{ theme: Theme }>) => (story: any): JSX.Element => {
  return (
    <ThemesProvider CustomThemeProvider={CustomThemeProvider} story={story} themes={List(themes)}>
      <ModalProvider>
        <BackgroundHelper themes={List(themes)}>{story()}</BackgroundHelper>
      </ModalProvider>
    </ThemesProvider>
  )
};
