import React from 'react';

declare module 'simplebar-react' {
  interface Props extends React.HTMLAttributes<HTMLElement> {
    scrollableNodeProps?: object;
    options?: object;
    autoHide?: boolean;
    forceVisible?: string
  }

  export default class SimpleBar extends React.Component<Props> {}
}
