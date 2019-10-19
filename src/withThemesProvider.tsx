import { List } from "immutable";
import * as React from "react";

import { BackgroundHelper } from "./Background";
import { ThemesProvider } from "./ThemesProvider";
import { Theme } from "./types/Theme";
import { ModalProvider } from "./components/Modal";

export const withThemesProvider = (themes: Theme[]) => (story: any): JSX.Element => (
  <ThemesProvider themes={List(themes)}>
    <ModalProvider>
      <BackgroundHelper themes={List(themes)}>{story()}</BackgroundHelper>
    </ModalProvider>
  </ThemesProvider>
);
