import React from 'react';

declare module 'simplebar-react' {
  interface Props extends React.HTMLAttributes<HTMLElement> {
    scrollableNodeProps?: object;
    options?: object;
    autoHide?: boolean;
    forceVisible?: string;
    direction?: string;
    timeout?: number;
    clickOnTrack?: boolean
    scrollbarMinSize?: number;
    scrollbarMaxSize?: number;
    classNames?: {
      contentEl?: string,
      contentWrapper?: string,
      offset?: string,
      mask?: string,
      wrapper?: string,
      placeholder?: string,
      scrollbar?: string,
      track?: string,
      heightAutoObserverWrapperEl?: string,
      heightAutoObserverEl?: string,
      visible?: string,
      horizontal?: string,
      vertical?: string,
      hover?: string,
      dragging?: string,
    }
  }
  export default class SimpleBar extends React.Component<Props> {}
}
