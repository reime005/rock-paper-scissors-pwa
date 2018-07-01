import { App } from "../js/index";
import { initialState } from "../js/initialState";

describe('Rendering of UI component', () => {
  it('testObject works correctly', () => {
    //TODO:
    const div = document.getElementById("test");
    expect(div.innerHTML).toEqual(initialState.test);
  });
});
  