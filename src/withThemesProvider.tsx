import * as React from "react";
import { BackgroundHelper } from "./Background";
import { ThemesProvider } from "./ThemesProvider";
import { Theme } from "./types/Theme";
import { List } from "immutable";

export const withThemesProvider = (themes: Theme[]) => (
  story: any,
): JSX.Element => {
  return (
    <ThemesProvider themes={List(themes)}>
      <BackgroundHelper themes={List(themes)}>{story()}</BackgroundHelper>
    </ThemesProvider>
  );
};
