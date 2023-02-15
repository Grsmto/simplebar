import React, { FC } from 'react';
import type { StoryFn } from '@storybook/react';

import SimpleBarReact from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import './SimpleBar.css';

const SimpleBar: FC<{
  className: string;
  height: number | string;
}> = ({ className, height }) => {
  return (
    <div className={`SnapCarousel-story ${className}`}>
      <SimpleBarReact style={{ height }}>
        {Array.from(Array(6)).map((x, i) => (
          <p key={i} className="odd">
            Some content
          </p>
        ))}
      </SimpleBarReact>
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: SimpleBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<any> = (args) => <SimpleBar {...args} />;

export const FullWidth = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
FullWidth.args = {
  primary: true,
  className: 'fixed-height',
  height: 200,
};
