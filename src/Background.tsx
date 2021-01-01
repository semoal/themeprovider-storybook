import addons from "@storybook/addons";
import * as React from "react";
import ReactJson from "react-json-view";
import { Modal } from "./components/Modal";
import { Theme } from "./types/Theme";

export interface ThemesProviderProps {
  themes: Array<Theme>;
  children: React.ReactChild;
}

export const BackgroundHelper: React.FunctionComponent<ThemesProviderProps> = ({ children, themes }) => {
  const [theme, setTheme] = React.useState<{ name: string} | null>(null);
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

  return(
    <>
      {theme && (
        <Modal isOpen={isOpen} toggleModal={toggleModal} headerTitle={theme.name}>
          <ReactJson src={theme} displayObjectSize={false} indentWidth={2} />
        </Modal>
      )}
      {children}
    </>
  )
};
