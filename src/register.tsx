import addons from "@storybook/addons";
import * as React from "react";
import { Themes } from "./Themes";

addons.register("storybook/themes", (api) => {
  addons.addPanel("storybook/themes/panel", {
    render: ({ active }) => <Themes channel={addons.getChannel()} api={api} active={active} />,
    title: "Themes",
  });
});
