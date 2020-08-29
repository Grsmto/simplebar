// Project: https://github.com/Grsmto/simplebar, https://grsmto.github.io/simplebar
// TypeScript Version: 3.9

export as namespace SimpleBar;
export default SimpleBar;

declare class SimpleBar {
  static removeObserver(): void;

  constructor(element: HTMLElement, options?: SimpleBar.Options);

  recalculate(): void;
  getScrollElement(): Element;
  getContentElement(): Element;
}

declare namespace SimpleBar {
  interface Options {
    forceVisible?: boolean;
    clickOnTrack?: boolean;
    scrollbarMinSize?: number;
    scrollbarMaxSize?: number;
  }
}
