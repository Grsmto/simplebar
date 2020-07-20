import SimpleBar from '../src';

beforeEach(() => {
  jest.resetModules();

  // Set up our document body
  document.body.innerHTML =
    '<div id="simplebar" data-simplebar-auto-hide="true"></div>';
});

test('should return the element options', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  expect(SimpleBar.getOptions(simpleBar.el.attributes)).toEqual({
    autoHide: true,
  });
});

test('unmount on node removed from DOM', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  SimpleBar.handleMutations([
    {
      addedNodes: [],
      removedNodes: [simpleBar.el],
    },
  ]);

  expect(SimpleBar.instances.get(simpleBar.el)).toBeUndefined();
});
