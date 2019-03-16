import addons from "@storybook/addons";
import { List } from "immutable";
import * as React from "react";
import {
  branch,
  compose,
  lifecycle,
  renderNothing,
  withState,
} from "recompose";
import styled from "styled-components";
import { Theme } from "./types/Theme";

export interface IThemesProviderProps {
  themes: List<Theme>;
}

interface IThemesProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

interface IThemesProviderState {
  children: React.ReactChild;
}

type BaseComponentProps = IThemesProviderProps &
  IThemesProviderState &
  IThemesProviderState;

const BackgroundContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || "#fff"};
  height: 100vh;
  margin: 0;
  padding: 0;
` as React.FunctionComponent<{ backgroundColor: string }>;

const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({
  theme,
  children,
}) => (
  <BackgroundContainer backgroundColor={theme.backgroundColor}>
    {children}
  </BackgroundContainer>
);

export const BackgroundHelper = compose<BaseComponentProps, IThemesProviderProps>(
  withState("theme", "setTheme", null),
  lifecycle<BaseComponentProps, BaseComponentProps>({
    componentDidMount() {
      const { setTheme, themes } = this.props;
      const channel = addons.getChannel();
      channel.on("selectTheme", setTheme);
      channel.emit("setThemes", themes);
    },
    componentWillUnmount() {
      const { setTheme } = this.props;
      const channel = addons.getChannel();
      channel.removeListener("selectTheme", setTheme);
    },
  }),
  branch<BaseComponentProps>((props) => !props.theme, renderNothing),
)(BaseComponent);
