import SimpleBar from '../src/simplebar';

beforeEach(() => {
  jest.resetModules();

  // Set up our document body
  document.body.innerHTML = '<div id="simplebar" data-simplebar-auto-hide="true"></div>';
});

test('should call constructor', () => {
  const SimpleBar = require('../src/simplebar').default;
  jest.mock('../src/simplebar');

  new SimpleBar(document.getElementById('simplebar'));

  expect(SimpleBar).toHaveBeenCalledTimes(1);
});

test('should return the scroll element', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));
  const scrollElement = simpleBar.getScrollElement();

  expect(scrollElement).toBe(simpleBar.contentEl);
});

test("should unmount SimpleBar", () => {
  const simpleBar = new SimpleBar(document.getElementById("simplebar"));

  simpleBar.unMount();

  expect(simpleBar.el.SimpleBar).toBeNull();
});

test("should return the element options", () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  expect(SimpleBar.getElOptions(simpleBar.el)).toEqual({ autoHide: true });
});

test("should know if element is a child node", () => {
  const simpleBar = new SimpleBar(document.getElementById("simplebar"));

  expect(simpleBar.isChildNode(simpleBar.contentEl)).toBeTruthy();
  expect(simpleBar.isChildNode(document.body)).toBeFalsy();
});

test("mouse should be within bounds", () => {
  const simpleBar = new SimpleBar(document.getElementById("simplebar"));

  simpleBar.mouseX = 20;
  simpleBar.mouseY = 20;

  const isWithinBounds = simpleBar.isWithinBounds({
    bottom: 110,
    height: 100,
    left: 10,
    right: 110,
    top: 10,
    width: 100,
    x: 10,
    y: 10,
  });

  expect(isWithinBounds).toBeTruthy();
});
