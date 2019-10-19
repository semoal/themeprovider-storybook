import addons from "@storybook/addons";
import { List} from "immutable";
import * as React from "react";
import ReactJson from "react-json-view";
import styled from "styled-components";
import { Modal } from "./components/Modal";
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
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  React.useEffect(() => {
    let channel = addons.getChannel();
    channel.on("selectTheme", setTheme);
    channel.emit("setThemes", themes);
    return () => {
      channel = addons.getChannel();
      channel.removeListener("selectTheme", setTheme);
    };
  }, [themes, children]);

  React.useEffect(() => {
    let channel = addons.getChannel();
    channel.on("openModal", toggleModal);
    return () => {
      channel = addons.getChannel();
      channel.removeListener("openModal", setTheme);
    };
  }, []);

  return theme ? (
    <BaseComponent theme={theme}>
      <>
      <Modal isOpen={isOpen} toggleModal={toggleModal} headerTitle={theme.name}>
        <ReactJson src={theme} displayObjectSize={false} indentWidth={2} />
      </Modal>
      {children}
      </>
    </BaseComponent>
  ) : (
    null
  );
};
