import React, { FC, useEffect } from 'react';
import type { StoryFn } from '@storybook/react';
import { expect, jest } from '@storybook/jest';
import { waitFor } from '@storybook/testing-library';
import { FixedSizeList as List } from 'react-window';
import { useVirtualizer } from '@tanstack/react-virtual';

import SimpleBar from 'simplebar';
import SimpleBarReact, { Props } from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './SimpleBar.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SimpleBarReact,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<
  {
    className: string;
    style: React.CSSProperties;
  } & Props
> = ({ className = '', style, ...options }) => (
  <div className={`SimpleBar-story ${className}`}>
    <SimpleBarReact style={style} {...options}>
      {Array.from(Array(10)).map((x, i) => (
        <p key={i} className="odd">
          Some content
        </p>
      ))}
    </SimpleBarReact>
  </div>
);

export const FixedHeight = Template.bind({});
FixedHeight.args = {
  ...SimpleBar.defaultOptions,
  style: { height: 200 },
};

export const AutoHeight = Template.bind({});
AutoHeight.args = {
  ...SimpleBar.defaultOptions,
  style: { height: 'auto' },
};

export const WithBorder = Template.bind({});
WithBorder.args = {
  ...SimpleBar.defaultOptions,
  style: { border: '60px solid' },
};

const WithImageTemplate: StoryFn<{
  className: string;
  style: React.CSSProperties;
}> = ({ className = '', style, ...options }) => (
  <div className={`SimpleBar-story ${className}`}>
    <SimpleBarReact style={style} {...options}>
      <img src="https://placekitten.com/2000/3000" />
    </SimpleBarReact>
  </div>
);

export const BothAxis = WithImageTemplate.bind({});
BothAxis.args = {
  ...SimpleBar.defaultOptions,
  className: 'both-axis',
};

export const WithVirtual: FC<{
  className: string;
  style: React.CSSProperties;
}> = ({ className = '', style, ...options }) => {
  const parentRef = React.useRef();

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: 1000,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div className={`SimpleBar-story ${className}`}>
      <SimpleBarReact
        style={style}
        scrollableNodeProps={{ ref: parentRef }}
        {...options}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Only the visible items in the virtualizer, manually positioned to be in view */}
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              Row {virtualItem.index}
            </div>
          ))}
        </div>
      </SimpleBarReact>
    </div>
  );
};

export const WithReactWindow: FC<any> = () => {
  return (
    <div className={`SimpleBar-story with-react-window`}>
      <SimpleBarReact style={{ height: 300 }}>
        {({ scrollableNodeRef }) => (
          <List
            height={300}
            itemCount={1000}
            itemSize={35}
            outerRef={scrollableNodeRef}
            className="simplebar-content-wrapper"
          >
            {({ index, style }) => <div style={style}>Row {index}</div>}
          </List>
        )}
      </SimpleBarReact>
    </div>
  );
};

const WithRefTemplate: StoryFn<
  {
    className: string;
    style: React.CSSProperties;
    onScroll: () => void;
  } & Props
> = ({ className = '', style, onScroll, ...options }) => {
  const scrollableElRef = React.useRef();

  useEffect(() => {
    scrollableElRef.current?.addEventListener('scroll', (e) => {
      console.log('scroll');
      onScroll(e);
    });
  });

  return (
    <div className={`SimpleBar-story ${className}`}>
      <SimpleBarReact
        style={style}
        {...options}
        scrollableNodeProps={{ ref: scrollableElRef }}
      >
        {Array.from(Array(10)).map((x, i) => (
          <p key={i} className="odd">
            Some content
          </p>
        ))}
      </SimpleBarReact>
    </div>
  );
};

export const WithRef = WithRefTemplate.bind({});

WithRef.args = {
  ...SimpleBar.defaultOptions,
  scrollableNodeProps: {},
  // onScroll: jest.fn(),
};

WithRef.play = async ({ args, canvasElement }) => {
  // console.log(args.onScroll);
  // const nextBtn = canvasElement.querySelector('.carousel-nav__btn--next');
  // userEvent.click(nextBtn);
  // await waitFor(() =>
  //   expect(
  //     canvasElement.getElementsByClassName('.carousel-indicator__dot.active')
  //   ).toBeDefined()
  // );
  // expect(args.onScroll).toHaveBeenCalled();
};
