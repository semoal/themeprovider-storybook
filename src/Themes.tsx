import * as React from "react";
import { Button, Row } from "./components/Button";
import SvgIcon from "./components/SvgIcon";
import { Theme } from "./types/Theme";
import { ThemesProviderSettings } from "./withThemesProvider";
// extrange issue on action file:
// Argument of type '(api: import("/github/workspace/node_modules/@storybook/api/dist/index").API) => void' is not assignable to parameter of type '(api: import("/github/workspace/node_modules/@storybook/addons/node_modules/@storybook/api/dist/index").API) => void'.
// import { Channel } from '@storybook/channels';
// import { API } from '@storybook/api';

export interface ThemeProps {
  channel: any;
  api: any;
  active: boolean;
}

interface ButtonProps {
  onSelectTheme: (theme: Theme) => void;
  theme: Theme;
  onOpenModal: () => void;
  settings: ThemesProviderSettings;
  themes: Array<Theme>;
}

const BaseComponent: React.FunctionComponent<ButtonProps> = ({
  onSelectTheme,
  themes,
  theme,
  settings,
  onOpenModal,
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
          <span>{th.name}</span>
          {!settings.disableThemePreview && <SvgIcon name="info" onClick={() => onOpenModal()} />}
        </Button>
    ))}
  </Row>
);

export const Themes: React.FunctionComponent<ThemeProps> = ({
  channel,
  active,
}) => {
  const [theme, setTheme] = React.useState(null);
  const [settings, setSettings] = React.useState<ThemesProviderSettings>({ disableThemePreview: false });
  const [themes, setThemes] = React.useState([]);

  const onReceiveThemes = (newThemes: Theme[]) => {
    // tslint:disable-next-line: no-shadowed-variable
    const themes = [...newThemes];
    const themeSaved = JSON.parse(localStorage.getItem("themeprovider-storybook-selected-theme") || null);
    setThemes(themes);
    if (themes.length > 0) {
      // tslint:disable-next-line: no-shadowed-variable
      const theme = themes.find((t) => t.name === themeSaved) || themes[0];
      setTheme(theme);

      if (theme.backgroundColor && window?.location?.search.includes("story")) {
        const el: HTMLElement | null = document.getElementById("storybook-preview-iframe");
        if (el) el.style.background = theme.backgroundColor;
      }

      channel.emit("selectTheme", theme);
    }
  };

  const onSelectTheme = (customTheme: Theme) => {
    setTheme(customTheme);

    if (customTheme.backgroundColor && window?.location?.search.includes("story")) {
      const el: HTMLElement | null = document.getElementById("storybook-preview-iframe");
      if (el) el.style.background = customTheme.backgroundColor;
      localStorage.setItem("themeprovider-storybook-selected-theme", JSON.stringify(customTheme.name));
    }

    channel.emit("selectTheme", customTheme);
  };

  const onOpenModal = () => {
    channel.emit("openModal", true);
  };

  const onReceiveSettings = (settings: ThemesProviderSettings) => {
    setSettings(settings);
  }

  // When swiching to docs page we disable background color, because it's a more complex design
  // On a future release of storybook,
  // we hope they enable an internal naming(id, or theme) for setting only the background of each box.
  const onHandleDocsPage = ({ viewMode }: { viewMode: string }) => {
    if (viewMode === "docs") {
      const el: HTMLElement | null = document.getElementById("storybook-preview-iframe");
      if (el) el.style.background = "#FFFFFF";
    }
  }

  React.useEffect(() => {
    channel.on("setThemes", onReceiveThemes);
    channel.on("setSettings", onReceiveSettings)
    channel.on("setCurrentStory", onHandleDocsPage);
    return () => {
      channel.removeListener("setThemes", onReceiveThemes);
      channel.removeListener("setCurrentStory", onHandleDocsPage);
      channel.removeListener("setSettings", onReceiveSettings);
    };
  }, []);

  return theme && active ? (
    <BaseComponent
      onOpenModal={onOpenModal}
      settings={settings}
      onSelectTheme={onSelectTheme}
      themes={themes}
      theme={theme}
    />
  ) : null;
};
