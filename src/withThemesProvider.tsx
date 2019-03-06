import { List } from "immutable";
import * as React from "react";
import { ThemesProvider } from "./ThemesProvider";
import { Theme } from "./types/Theme";

export const withThemesProvider = (themes: Theme[]) => (story: any): JSX.Element => {
    return (
      <ThemesProvider themes={List(themes)}>
        {story()}
      </ThemesProvider>
    );
};
