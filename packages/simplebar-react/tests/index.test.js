import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import SimpleBar from '../dist/simplebar-react';

test('renders without crashing', () => {
  const { container } = render(
    <SimpleBar>
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('renders with options', () => {
  const { container } = render(
    <SimpleBar forceVisible="y">
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );
  expect(container.firstChild).toMatchSnapshot();

  expect(
    container.querySelector('.simplebar-track.simplebar-vertical')
  ).toBeVisible();
});

test('works with deprecated options', () => {
  const { container } = render(
    <SimpleBar data-simplebar-force-visible="y">
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  expect(
    container.querySelector('.simplebar-track.simplebar-vertical')
  ).toBeVisible();
});

test('renders with scrollableNodeProps', async () => {
  const { getByTestId } = render(
    <SimpleBar
      scrollableNodeProps={{
        'data-testid': 'scrollable-node-props'
      }}
    >
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  await waitForElement(() =>
    // getByTestId throws an error if it cannot find an element
    getByTestId('scrollable-node-props')
  );
});

test('renders with ref', async () => {
  const ref = React.createRef();

  render(
    <SimpleBar ref={ref}>
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  expect(ref.current).toBeDefined();
});

test('works on unmount', async () => {
  const ref = React.createRef();

  const { unmount } = render(
    <SimpleBar ref={ref}>
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  jest.spyOn(ref.current, 'unMount');

  unmount();

  expect(ref.current.unMount).toHaveBeenCalled();
});
