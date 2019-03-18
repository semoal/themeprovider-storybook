import { List } from "immutable";
import * as React from "react";
import { Button, Row } from "./Button";
import { Theme } from "./types/Theme";

export interface IThemeProps {
  channel: any;
  api: any;
  active: boolean;
}

interface IButtonProps {
  onSelectTheme: (theme: Theme) => void;
  theme: Theme;
  themes: List<Theme>;
}

const BaseComponent: React.FunctionComponent<IButtonProps> = ({
  onSelectTheme,
  themes,
  theme,
}) => (
  /* tslint:disable:jsx-no-multiline-js jsx-no-lambda*/
  <Row>
    {themes
      .map((th, i) => (
        <Button
          isSelected={th === theme}
          key={i}
          onClick={() => onSelectTheme(th)}
        >
          {th.name}
        </Button>
      ))
      .toArray()}
  </Row>
);

export const Themes: React.FunctionComponent<IThemeProps> = ({
  channel,
  api,
  active,
}) => {
  const [theme, setTheme] = React.useState(null);
  const [themes, setThemes] = React.useState(List());

  const onReceiveThemes = (newThemes: Theme[]) => {
    // tslint:disable-next-line: no-shadowed-variable
    const themes = List(newThemes);
    const themeName = api.getQueryParam("theme");
    setThemes(themes);
    if (themes.count() > 0) {
      // tslint:disable-next-line: no-shadowed-variable
      const theme =
        themes.find((t) => t.name === themeName) || themes.first();
      setTheme(theme);
      channel.emit("selectTheme", theme);
    }
  };

  const onSelectTheme = (thm: Theme) => {
    setTheme(thm);
    api.setQueryParams({ theme: thm.name });
    channel.emit("selectTheme", thm);
  };

  React.useEffect(() => {
    channel.on("setThemes", onReceiveThemes);
    return () => {
      channel.removeListener("setThemes", onReceiveThemes);
    };
  });

  return theme && active ? (
    <BaseComponent
      onSelectTheme={onSelectTheme}
      themes={themes}
      theme={theme}
    />
  ) : null;
};
