import * as React from "react";
import { Themes } from "./Themes";
import { addons, types } from '@storybook/addons';
import { API } from '@storybook/api';

addons.register("storybook/themes", (api: API) => {
  addons.add("storybook/themes/panel", {
    type: types.PANEL,
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active, key }) => <Themes key={key} channel={addons.getChannel()} api={api} active={active} />,
    title: "Themes",
  });
});
