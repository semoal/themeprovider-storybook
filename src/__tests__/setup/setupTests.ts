import "jest";

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

declare const global: any;

configure({ adapter: new Adapter() });
global.requestAnimationFrame = (callback: any) => {
  setTimeout(callback, 0);
};
