import addons from "@storybook/addons";
import { List} from "immutable";
import * as React from "react";
import styled from "styled-components";
import { Theme } from "./types/Theme";

export interface IThemesProviderProps {
  themes: List<Theme>;
  children: React.ReactChild;
}

interface IThemesProvider {
  children: React.ReactChild;
  theme: Theme;
}

type BaseComponentProps = IThemesProvider;

const BackgroundContainer = styled.div<{ backgroundColor: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor || "#fff"};
  height: 100vh;
  margin: 0;
  padding: 0.25em;
` as React.FunctionComponent<{ backgroundColor: string }>;

const BaseComponent: React.FunctionComponent<BaseComponentProps> = ({
  theme,
  children,
}) => (
  <BackgroundContainer backgroundColor={theme.backgroundColor}>
    {children}
  </BackgroundContainer>
);

export const BackgroundHelper: React.FunctionComponent<IThemesProviderProps> = ({ children, themes }) => {
  const [theme, setTheme] = React.useState(null);

  React.useEffect(() => {
    let channel = addons.getChannel();
    channel.on("selectTheme", setTheme);
    channel.emit("setThemes", themes);
    return () => {
      channel = addons.getChannel();
      channel.removeListener("selectTheme", setTheme);
    };
  }, [themes, children]);

  return theme ? (
    <BaseComponent theme={theme}>{children}</BaseComponent>
  ) : (
    null
  );
};
