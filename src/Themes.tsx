import { List } from "immutable";
import * as React from "react";
import { branch, compose, lifecycle, renderNothing, withHandlers, withState } from "recompose";
import styled, { css } from "styled-components";
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

interface IStyledButton {
  children: any;
  isSelected: boolean;
  key: number;
  onClick: () => void;
}

type BaseComponentProps = IThemeProps & IThemeState & IThemeHandler;

const Row = styled.div`
  display: flex;
  height: auto;
  padding: 15px;
`;

const Button = styled.button<IStyledButton>`
    border: 0;
    border-radius: 3em;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 10px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    transition: all 150ms ease-out;
    transform: translate3d(0, 0, 0);
    vertical-align: top;
    white-space: nowrap;
    user-select: none;
    opacity: 1;
    margin: 0 1em 0 0;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    box-sizing: border-box;
    background: transparent;
    font-weight: 700;
    line-height: 1;
    box-shadow: rgba(51, 51, 51, 0.2) 0 0 0 1px inset;
    color: rgba(51, 51, 51, 0.7);

    &:hover {
      box-shadow: rgba(51, 51, 51, 0.5) 0 0 0 1px inset;
    }

    ${({ isSelected }) => isSelected && css`
      background: #1ea7fd;
      color: #fcfcfc;
      box-shadow: #2795ee 0 0 0 1px inset;
    `}
` as React.FunctionComponent<IStyledButton>;

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
