import "jest";

import { configure } from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";

declare const global: any;

configure({ adapter: new Adapter() });
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};

const matchMedia = () => {
  return {
    addListener: null,
    matches: false,
    removeListener: null,
  };
};

global.matchMedia = global.matchMedia || matchMedia;
