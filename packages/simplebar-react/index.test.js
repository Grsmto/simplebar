import React from 'react';
import renderer from 'react-test-renderer';

import SimpleBar from './index';

test('renders without crashing', () => {
  const component = renderer.create(
    <SimpleBar>
      {[...Array(5)].map((x, i) =>
        <p key={i}>Some content</p>
      )}
    </SimpleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders with options', () => {
  const component = renderer.create(
    <SimpleBar data-simplebar-auto-hide="false">
      {[...Array(5)].map((x, i) =>
        <p key={i}>Some content</p>
      )}
    </SimpleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
