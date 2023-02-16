import React, { FC } from 'react';
import type { StoryFn } from '@storybook/react';
import { FixedSizeList as List } from 'react-window';
import { useVirtualizer } from '@tanstack/react-virtual';

import SimpleBar from 'simplebar';
import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './SimpleBar.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SimpleBarReact,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<{
  className: string;
  style: React.CSSProperties;
}> = ({ className = '', style, ...options }) => (
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
