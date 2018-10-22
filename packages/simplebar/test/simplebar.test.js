import SimpleBar from '../src/simplebar';

beforeEach(() => {
  jest.resetModules();

  // Set up our document body
  document.body.innerHTML = '<div id="simplebar"></div>';
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
