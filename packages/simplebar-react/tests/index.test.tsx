import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import SimpleBar from '../index';
import SimpleBarCore from 'simplebar-core';

test('renders without crashing', () => {
  const { container } = render(
    <div>
      <SimpleBar>
        {[...Array(5)].map((_, i) => (
          <p key={i}>Some content</p>
        ))}
      </SimpleBar>
    </div>
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

test('renders with object as option', () => {
  const { container } = render(
    <SimpleBar
      classNames={{
        wrapper: 'custom-class',
      }}
    >
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );
  expect(container.firstChild).toMatchSnapshot();

  expect(container.querySelector('.custom-class')).toBeVisible();
});

test('renders with scrollableNodeProps', async () => {
  const { getByTestId } = render(
    <SimpleBar
      scrollableNodeProps={{
        'data-testid': 'scrollable-node-props',
      }}
    >
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  await waitFor(() =>
    // getByTestId throws an error if it cannot find an element
    getByTestId('scrollable-node-props')
  );
});

test('renders with ref', async () => {
  const ref = React.createRef<SimpleBarCore | null>();

  const { unmount } = render(
    <SimpleBar
      ref={(instance) => {
        //
      }}
    >
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  if (!ref.current) return;

  jest.spyOn(ref.current, 'unMount');

  unmount();

  expect(ref.current.unMount).toHaveBeenCalled();
});

test('works on unmount', async () => {
  const ref = React.createRef<any>();

  const { unmount } = render(
    <SimpleBar ref={ref} style={{ maxHeight: 300 }}>
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  jest.spyOn(ref.current, 'unMount');

  unmount();

  expect(ref.current.unMount).toHaveBeenCalled();
});

test('renders with ref callback', async () => {
  const callback = jest.fn((node) => {
    return node;
  });

  const { unmount } = render(
    <SimpleBar ref={callback}>
      {[...Array(5)].map((x, i) => (
        <p key={i}>Some content</p>
      ))}
    </SimpleBar>
  );

  expect(callback).toHaveBeenCalled();
  unmount();
  expect(callback).toHaveBeenCalledWith(null);
});

test('renders with render function', async () => {
  let ref1;
  let ref2;

  render(
    <SimpleBar>
      {({ scrollableNodeRef, contentNodeRef }) => {
        ref1 = scrollableNodeRef;
        ref2 = contentNodeRef;
        return null;
      }}
    </SimpleBar>
  );

  expect(ref1).toBeDefined();
  expect(ref2).toBeDefined();
});
