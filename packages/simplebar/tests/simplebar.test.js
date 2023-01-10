import { waitFor, waitForElementToBeRemoved } from '@testing-library/dom';

let SimpleBar;

beforeEach(() => {
  jest.isolateModules(() => {
    SimpleBar = require('../src').default;
  });

  // Set up our document body
  document.body.innerHTML =
    '<div id="simplebar" data-simplebar-auto-hide="true"></div>';
});

test('should return the element options', async () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));
  await new Promise(process.nextTick);
  expect(SimpleBar.getOptions(simpleBar.el.attributes)).toEqual({
    autoHide: true,
  });
});

test('unmount on node removed from DOM', async () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  await waitFor(() =>
    expect(
      document.getElementById('simplebar').getAttribute('data-simplebar')
    ).toEqual('init')
  );

  waitForElementToBeRemoved(document.getElementById('simplebar')).then(() => {
    expect(SimpleBar.instances.get(simpleBar.el)).toBeUndefined();
  });

  document.getElementById('simplebar').remove();
});
