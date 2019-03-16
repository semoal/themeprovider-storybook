import { List } from "immutable";
import * as React from "react";
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from "recompose";
import { Button, Row } from "./Button";
import { Theme } from "./types/Theme";

export interface IThemeProps {
    channel: any;
    api: any;
    active: boolean;
}

interface IThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    themes: List<Theme>;
    setThemes: (themes: List<Theme>) => void;
}

interface IThemeHandler {
    onSelectTheme: (theme: Theme) => void;
    onReceiveThemes: (theme: Theme[]) => void;
}

type BaseComponentProps = IThemeProps & IThemeState & IThemeHandler;

const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({ onSelectTheme, themes, theme }) => (
    /* tslint:disable:jsx-no-multiline-js jsx-no-lambda*/
    <Row>
      {
        themes.map((th, i) => (
          <Button isSelected={th === theme} key={i} onClick={() => onSelectTheme(th)}>
            {th.name}
          </Button>
        )).toArray()
      }
    </Row>
);

export const Themes = compose<BaseComponentProps, IThemeProps>(
    withState("theme", "setTheme", null),
    withState("themes", "setThemes", List()),
    withHandlers<IThemeProps & IThemeState, IThemeHandler>({
        onReceiveThemes: ({ setTheme, setThemes, channel, api }) => (newThemes: Theme[]) => {
            const themes = List(newThemes);
            const themeName = api.getQueryParam("theme");
            setThemes(List(themes));
            if (themes.count() > 0) {
              const theme = themes.find((t) => t.name === themeName) || themes.first();
              setTheme(theme);
              channel.emit("selectTheme", theme);
            }
        },
        onSelectTheme: ({ channel, setTheme, api }) => (theme) => {
          setTheme(theme);
          api.setQueryParams({ theme: theme.name });
          channel.emit("selectTheme", theme);
      },
    }),
    lifecycle<BaseComponentProps, BaseComponentProps>({
        componentDidMount() {
          const { channel, onReceiveThemes } = this.props;
          channel.on("setThemes", onReceiveThemes);
        },
        componentWillUnmount() {
          const { channel, onReceiveThemes } = this.props;
          channel.removeListener("setThemes", onReceiveThemes);
        },
    }),
    branch<BaseComponentProps>(
        ({ theme, active }) => !theme || !active,
        renderNothing,
    ),
)(BaseComponent);
