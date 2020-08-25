import { mount } from 'enzyme';
import * as React from "react";
import { spy } from "sinon";
import { Themes } from "../Themes";

describe("Themes spec", () => {
  it("Should render proper", () => {
    const channel = {
      emit: spy(),
      on: spy(),
      removeListener: spy(),
    };

    const component = mount(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Themes channel={channel} active={true} theme={{ someTheme: {} }} />,
    );

    expect(component.debug()).toMatchSnapshot();
    expect(channel.on.called).toBeTruthy();
    expect(channel.emit.notCalled).toBeTruthy();

    component.unmount();
    expect(channel.removeListener.called).toBeTruthy();
  });
});
