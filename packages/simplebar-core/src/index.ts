import type { DebouncedFunc } from 'lodash-es';
import { debounce, throttle } from 'lodash-es';
import canUseDOM from 'can-use-dom';
import * as helpers from './helpers';

interface Options {
  forceVisible: boolean | Axis;
  clickOnTrack: boolean;
  scrollbarMinSize: number;
  scrollbarMaxSize: number;
  classNames: Partial<ClassNames>;
  ariaLabel: string;
  scrollableNode: HTMLElement | null;
  contentNode: HTMLElement | null;
  autoHide: boolean;
}

export interface SimpleBarOptions extends Partial<Options> {}

export type ClassNames = {
  contentEl: string;
  contentWrapper: string;
  wrapper: string;
  scrollbar: string;
  track: string;
  visible: string;
  horizontal: string;
  vertical: string;
  hover: string;
  dragging: string;
  scrolling: string;
  scrollable: string;
  mouseEntered: string;
};

type Axis = 'x' | 'y';
type AxisProps = {
  scrollOffsetAttr: 'scrollLeft' | 'scrollTop';
  sizeAttr: 'width' | 'height';
  scrollSizeAttr: 'scrollWidth' | 'scrollHeight';
  offsetSizeAttr: 'offsetWidth' | 'offsetHeight';
  offsetAttr: 'left' | 'top';
  overflowAttr: 'overflowX' | 'overflowY';
  dragOffset: number;
  isOverflowing: boolean;
  forceVisible: boolean;
  track: {
    size: any;
    el: HTMLElement | null;
    rect: DOMRect | null;
    isVisible: boolean;
  };
  scrollbar: {
    size: any;
    el: HTMLElement | null;
    rect: DOMRect | null;
    isVisible: boolean;
  };
};
type RtlHelpers = {
  // determines if the scrolling is responding with negative values
  isScrollOriginAtZero: boolean;
  // determines if the origin scrollbar position is inverted or not (positioned on left or right)
  isScrollingToNegative: boolean;
} | null;
type DefaultOptions = Options & typeof SimpleBarCore.defaultOptions;

const {
  getElementWindow,
  getElementDocument,
  getOffset,
  getOptions,
  addClasses,
  removeClasses,
  classNamesToQuery,
  mergeClassNames,
} = helpers;

export default class SimpleBarCore {
  el: HTMLElement;
  options: DefaultOptions;
  classNames: ClassNames;
  axis: {
    x: AxisProps;
    y: AxisProps;
  };
  draggedAxis?: Axis;
  removePreventClickId: null | number = null;
  minScrollbarWidth = 20;
  stopScrollDelay = 175;
  isScrolling = false;
  isMouseEntering = false;
  scrollXTicking = false;
  scrollYTicking = false;
  wrapperEl: HTMLElement | null = null;
  contentEl: HTMLElement | null = null;
  scrollableEl: HTMLElement | null = null;
  rtlHelpers: RtlHelpers = null;
  resizeObserver: ResizeObserver | null = null;
  mutationObserver: MutationObserver | null = null;
  elStyles: CSSStyleDeclaration | null = null;
  isRtl: boolean | null = null;
  mouseX: number = 0;
  mouseY: number = 0;
  onMouseMove: DebouncedFunc<any> | (() => void) = () => null;
  onStopScrolling: DebouncedFunc<any> | (() => void) = () => null;
  onMouseEntered: DebouncedFunc<any> | (() => void) = () => null;
  cache: WeakMap<HTMLElement, any> = new WeakMap();

  static rtlHelpers: RtlHelpers = null;

  static defaultOptions: Options = {
    forceVisible: false,
    clickOnTrack: true,
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0,
    ariaLabel: 'scrollable content',
    classNames: {
      contentEl: 'simplebar-content',
      contentWrapper: 'simplebar-content-wrapper',
      wrapper: 'simplebar-wrapper',
      scrollbar: 'simplebar-scrollbar',
      track: 'simplebar-track',
      visible: 'simplebar-visible',
      horizontal: 'simplebar-horizontal',
      vertical: 'simplebar-vertical',
      hover: 'simplebar-hover',
      dragging: 'simplebar-dragging',
      scrolling: 'simplebar-scrolling',
      scrollable: 'simplebar-scrollable',
      mouseEntered: 'simplebar-mouse-entered',
    },
    scrollableNode: null,
    autoHide: true,
  };

  constructor(element: HTMLElement, options: Partial<Options> = {}) {
    this.el = element;
    this.options = { ...SimpleBarCore.defaultOptions, ...options };
    this.classNames = mergeClassNames(
      SimpleBarCore.defaultOptions.classNames as ClassNames,
      options.classNames
    );
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetSizeAttr: 'offsetWidth',
        offsetAttr: 'left',
        overflowAttr: 'overflowX',
        dragOffset: 0,
        isOverflowing: true,
        forceVisible: false,
        track: { size: null, el: null, rect: null, isVisible: false },
        scrollbar: { size: null, el: null, rect: null, isVisible: false },
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetSizeAttr: 'offsetHeight',
        offsetAttr: 'top',
        overflowAttr: 'overflowY',
        dragOffset: 0,
        isOverflowing: true,
        forceVisible: false,
        track: { size: null, el: null, rect: null, isVisible: false },
        scrollbar: { size: null, el: null, rect: null, isVisible: false },
      },
    };

    if (typeof this.el !== 'object' || !this.el.nodeName) {
      throw new Error(
        `Argument passed to SimpleBar must be an HTML element instead of ${this.el}`
      );
    }

    this.onMouseMove = throttle(this._onMouseMove, 64);
    this.onStopScrolling = debounce(
      this._onStopScrolling,
      this.stopScrollDelay
    );
    this.onMouseEntered = debounce(this._onMouseEntered, this.stopScrollDelay);

    this.init();
  }

  /**
   * Static functions
   */

  static getOptions = getOptions;
  static helpers = helpers;

  /**
   * Helper to fix browsers inconsistency on RTL:
   *  - Firefox inverts the scrollbar initial position
   *  - IE11 inverts both scrollbar position and scrolling offset
   */
  static getRtlHelpers(): RtlHelpers {
    if (SimpleBarCore.rtlHelpers) {
      return SimpleBarCore.rtlHelpers;
    }

    const dummyDiv = document.createElement('div');
    dummyDiv.innerHTML =
      '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';

    const scrollbarDummyEl = dummyDiv.firstElementChild;
    const dummyChild = scrollbarDummyEl?.firstElementChild;

    if (!dummyChild) return null;

    document.body.appendChild(scrollbarDummyEl);

    scrollbarDummyEl.scrollLeft = 0;

    const dummyContainerOffset = getOffset(scrollbarDummyEl);
    const dummyChildOffset = getOffset(dummyChild);

    scrollbarDummyEl.scrollLeft = -999;
    const dummyChildOffsetAfterScroll = getOffset(dummyChild);

    document.body.removeChild(scrollbarDummyEl);

    SimpleBarCore.rtlHelpers = {
      // determines if the scrolling is responding with negative values
      isScrollOriginAtZero: dummyContainerOffset.left !== dummyChildOffset.left,
      // determines if the origin scrollbar position is inverted or not (positioned on left or right)
      isScrollingToNegative:
        dummyChildOffset.left !== dummyChildOffsetAfterScroll.left,
    };

    return SimpleBarCore.rtlHelpers;
  }

  init(): void {
    // We stop here on server-side
    if (canUseDOM) {
      this.initDOM();

      this.rtlHelpers = SimpleBarCore.getRtlHelpers();

      this.recalculate();

      this.initListeners();
    }
  }

  initDOM(): void {
    // assume that element has his DOM already initiated
    this.wrapperEl = this.el.querySelector(
      classNamesToQuery(this.classNames.wrapper)
    );
    this.scrollableEl =
      this.options.scrollableNode ||
      this.el.querySelector(classNamesToQuery(this.classNames.contentWrapper));
    this.contentEl =
      this.options.contentNode ||
      this.el.querySelector(classNamesToQuery(this.classNames.contentEl));

    this.axis.x.track.el = this.findChild(
      this.wrapperEl,
      `${classNamesToQuery(this.classNames.track)}${classNamesToQuery(
        this.classNames.horizontal
      )}`
    );
    this.axis.y.track.el = this.findChild(
      this.wrapperEl,
      `${classNamesToQuery(this.classNames.track)}${classNamesToQuery(
        this.classNames.vertical
      )}`
    );

    this.axis.x.scrollbar.el =
      this.axis.x.track.el?.querySelector(
        classNamesToQuery(this.classNames.scrollbar)
      ) || null;
    this.axis.y.scrollbar.el =
      this.axis.y.track.el?.querySelector(
        classNamesToQuery(this.classNames.scrollbar)
      ) || null;

    if (!this.options.autoHide) {
      this.showScrollbar('x');
      this.showScrollbar('y');
    }
  }

  initListeners(): void {
    const elWindow = getElementWindow(this.el);
    // Event listeners

    this.el.addEventListener('mouseenter', this.onMouseEnter);

    this.el.addEventListener('pointerdown', this.onPointerEvent, true);

    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);

    this.scrollableEl?.addEventListener('scroll', this.onScroll);

    if (!this.scrollableEl) return;

    if (window.ResizeObserver) {
      // Hack for https://github.com/WICG/ResizeObserver/issues/38
      let resizeObserverStarted = false;
      const resizeObserver = elWindow.ResizeObserver || ResizeObserver;
      this.resizeObserver = new resizeObserver(() => {
        if (!resizeObserverStarted) return;

        elWindow.requestAnimationFrame(() => {
          this.recalculate();
        });
      });

      this.resizeObserver.observe(this.el);
      this.resizeObserver.observe(this.contentEl);

      elWindow.requestAnimationFrame(() => {
        resizeObserverStarted = true;
      });
    }

    // This is required to detect horizontal scroll. Vertical scroll only needs the resizeObserver.
    this.mutationObserver = new elWindow.MutationObserver(() => {
      elWindow.requestAnimationFrame(() => {
        this.recalculate();
      });
    });

    this.mutationObserver.observe(this.scrollableEl, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  recalculate(): void {
    if (!this.contentEl || !this.scrollableEl || !this.wrapperEl) return;
    this.clearCache();

    const elWindow = getElementWindow(this.el);
    this.elStyles = elWindow.getComputedStyle(this.el);
    this.isRtl = this.elStyles.direction === 'rtl';

    const elOverflowX = this.elStyles.overflowX;
    const elOverflowY = this.elStyles.overflowY;

    const scrollHeight = this.scrollableEl.scrollHeight;
    const scrollWidth = this.scrollableEl.scrollWidth;
    const scrollableElOffsetHeight = this.scrollableEl.offsetHeight;
    const scrollableElOffsetWidth = this.scrollableEl.offsetWidth;

    if (this.isRtl) addClasses(this.el, this.classNames.rtl);

    this.contentEl.style.padding = `${this.elStyles.paddingTop} ${this.elStyles.paddingRight} ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`;
    this.wrapperEl.style.margin = `-${this.elStyles.paddingTop} -${this.elStyles.paddingRight} -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;

    // Set isOverflowing to false if user explicitely set hidden overflow
    this.axis.x.isOverflowing =
      elOverflowX === 'hidden' ? false : this.axis.x.isOverflowing;
    this.axis.y.isOverflowing =
      elOverflowY === 'hidden' ? false : this.axis.y.isOverflowing;

    this.axis.x.forceVisible =
      this.options.forceVisible === 'x' || this.options.forceVisible === true;
    this.axis.y.forceVisible =
      this.options.forceVisible === 'y' || this.options.forceVisible === true;

    // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)
    this.axis.x.isOverflowing = scrollWidth > scrollableElOffsetWidth;

    this.axis.y.isOverflowing = scrollHeight > scrollableElOffsetHeight;

    this.axis.x.scrollbar.size = this.getScrollbarSize('x');
    this.axis.y.scrollbar.size = this.getScrollbarSize('y');

    if (this.axis.x.scrollbar.el)
      this.axis.x.scrollbar.el.style.width = `${this.axis.x.scrollbar.size}px`;
    if (this.axis.y.scrollbar.el)
      this.axis.y.scrollbar.el.style.height = `${this.axis.y.scrollbar.size}px`;

    this.positionScrollbar('x');
    this.positionScrollbar('y');

    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }

  /**
   * Calculate scrollbar size
   */
  getScrollbarSize(axis: Axis = 'y'): number {
    if (!this.axis[axis].isOverflowing || !this.contentEl) {
      return 0;
    }

    const contentSize =
    const trackSize =
      this.axis[axis].track.el?.[this.axis[axis].offsetSizeAttr] ?? 0;
    const scrollbarRatio = trackSize / contentSize;

    let scrollbarSize;

    // Calculate new height/position of drag handle.
    scrollbarSize = Math.max(
      ~~(scrollbarRatio * trackSize),
      this.options.scrollbarMinSize
    );

    if (this.options.scrollbarMaxSize) {
      scrollbarSize = Math.min(scrollbarSize, this.options.scrollbarMaxSize);
    }

    return scrollbarSize;
  }

  positionScrollbar(axis: Axis = 'y'): void {
    const scrollbar = this.axis[axis].scrollbar;
    const bothAxis = this.axis.x.isOverflowing && this.axis.y.isOverflowing;
    const offset =
      (bothAxis &&
        this.axis[axis].track.rect?.[
          axis === 'x' ? this.axis.y.sizeAttr : this.axis.x.sizeAttr
        ]) ||
      0;

    if (
      !this.axis[axis].isOverflowing ||
      !this.contentEl ||
      !this.scrollableEl ||
      !scrollbar.el ||
      !this.elStyles
    ) {
      return;
    }

    const contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    const trackSize =
      this.getCachedValue(
        this.axis[axis].track.el,
        this.axis[axis].offsetSizeAttr
      ) || 0;
    const hostSize =
      this.getCachedValue(this.scrollableEl, this.axis[axis].offsetSizeAttr) ||
      0;

    let scrollOffset = this.scrollableEl[this.axis[axis].scrollOffsetAttr];

    if (axis === 'x' && this.isRtl) {
      scrollOffset = SimpleBarCore.getRtlHelpers()?.isScrollingToNegative
        ? scrollOffset
        : -scrollOffset;
    }

    const scrollPourcent = scrollOffset / (contentSize - hostSize);

    let handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);

    if (this.isRtl) {
      handleOffset =
        axis === 'x'
          ? Math.max(-(trackSize - scrollbar.size) + offset, handleOffset)
          : handleOffset;
      handleOffset =
        axis === 'y' ? Math.max(0, handleOffset - offset) : handleOffset;
    } else {
      handleOffset = Math.max(0, handleOffset - offset);
    }

    scrollbar.el.style.transform =
      axis === 'x'
        ? `translate3d(${handleOffset}px, 0, 0)`
        : `translate3d(0, ${handleOffset}px, 0)`;
  }

  toggleTrackVisibility(axis: Axis = 'y'): void {
    const track = this.axis[axis].track.el;
    const scrollbar = this.axis[axis].scrollbar.el;

    if (!track || !scrollbar || !this.scrollableEl) return;

    if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
      this.scrollableEl.style[this.axis[axis].overflowAttr] = 'scroll';
      this.el.classList.add(`${this.classNames.scrollable}-${axis}`);
    } else {
      this.scrollableEl.style[this.axis[axis].overflowAttr] = 'hidden';
      this.el.classList.remove(`${this.classNames.scrollable}-${axis}`);
    }

    // Even if forceVisible is enabled, scrollbar itself should be hidden
    if (this.axis[axis].isOverflowing) {
      scrollbar.style.display = 'block';
    } else {
      scrollbar.style.display = 'none';
    }
  }

  showScrollbar(axis: Axis = 'y'): void {
    if (this.axis[axis].isOverflowing && !this.axis[axis].scrollbar.isVisible) {
      addClasses(this.axis[axis].track.el, this.classNames.visible);
      addClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
      this.axis[axis].scrollbar.isVisible = true;
    }
  }

  hideScrollbar(axis: Axis = 'y'): void {
    if (this.axis[axis].isOverflowing && this.axis[axis].scrollbar.isVisible) {
      removeClasses(this.axis[axis].track.el, this.classNames.visible);
      removeClasses(this.axis[axis].scrollbar.el, this.classNames.visible);
      this.axis[axis].scrollbar.isVisible = false;
    }
  }

  /**
   * On scroll event handling
   */
  onScroll = () => {
    const elWindow = getElementWindow(this.el);

    if (!this.scrollXTicking) {
      elWindow.requestAnimationFrame(this.scrollX);
      this.scrollXTicking = true;
    }

    if (!this.scrollYTicking) {
      elWindow.requestAnimationFrame(this.scrollY);
      this.scrollYTicking = true;
    }

    if (!this.isScrolling) {
      this.isScrolling = true;
      addClasses(this.el, this.classNames.scrolling);
    }

    this.showScrollbar('x');
    this.showScrollbar('y');

    this.onStopScrolling();
  };

  scrollX = () => {
    if (this.axis.x.isOverflowing) {
      this.positionScrollbar('x');
    }

    this.scrollXTicking = false;
  };

  scrollY = () => {
    if (this.axis.y.isOverflowing) {
      this.positionScrollbar('y');
    }

    this.scrollYTicking = false;
  };

  _onStopScrolling = () => {
    removeClasses(this.el, this.classNames.scrolling);
    if (this.options.autoHide) {
      this.hideScrollbar('x');
      this.hideScrollbar('y');
    }
    this.isScrolling = false;
  };

  onMouseEnter = () => {
    if (!this.isMouseEntering) {
      addClasses(this.el, this.classNames.mouseEntered);
      this.showScrollbar('x');
      this.showScrollbar('y');
      this.isMouseEntering = true;
    }
    this.onMouseEntered();
  };

  _onMouseEntered = () => {
    removeClasses(this.el, this.classNames.mouseEntered);
    if (this.options.autoHide) {
      this.hideScrollbar('x');
      this.hideScrollbar('y');
    }
    this.isMouseEntering = false;
  };

  _onMouseMove = (e: any) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      this.onMouseMoveForAxis('x');
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      this.onMouseMoveForAxis('y');
    }
  };

  onMouseMoveForAxis(axis: Axis = 'y'): void {
    const currentAxis = this.axis[axis];
    if (!currentAxis.track.el || !currentAxis.scrollbar.el) return;

    currentAxis.track.rect = currentAxis.track.el.getBoundingClientRect();
    currentAxis.scrollbar.rect =
      currentAxis.scrollbar.el.getBoundingClientRect();

    if (this.isWithinBounds(currentAxis.track.rect)) {
      this.showScrollbar(axis);
      addClasses(currentAxis.track.el, this.classNames.hover);

      if (this.isWithinBounds(currentAxis.scrollbar.rect)) {
        addClasses(currentAxis.scrollbar.el, this.classNames.hover);
      } else {
        removeClasses(currentAxis.scrollbar.el, this.classNames.hover);
      }
    } else {
      removeClasses(currentAxis.track.el, this.classNames.hover);
      if (this.options.autoHide) {
        this.hideScrollbar(axis);
      }
    }
  }

  onMouseLeave = () => {
    (this.onMouseMove as DebouncedFunc<any>).cancel();

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      this.onMouseLeaveForAxis('x');
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      this.onMouseLeaveForAxis('y');
    }

    this.mouseX = -1;
    this.mouseY = -1;
  };

  onMouseLeaveForAxis(axis: Axis = 'y'): void {
    removeClasses(this.axis[axis].track.el, this.classNames.hover);
    removeClasses(this.axis[axis].scrollbar.el, this.classNames.hover);
    if (this.options.autoHide) {
      this.hideScrollbar(axis);
    }
  }

  onPointerEvent = (e: any) => {
    if (
      !this.axis.x.track.el ||
      !this.axis.y.track.el ||
      !this.axis.x.scrollbar.el ||
      !this.axis.y.scrollbar.el
    )
      return;

    let isWithinTrackXBounds, isWithinTrackYBounds;

    this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
    this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      isWithinTrackXBounds = this.isWithinBounds(this.axis.x.track.rect);
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      isWithinTrackYBounds = this.isWithinBounds(this.axis.y.track.rect);
    }

    // If any pointer event is called on the scrollbar
    if (isWithinTrackXBounds || isWithinTrackYBounds) {
      // Prevent event leaking
      e.stopPropagation();

      if (e.type === 'pointerdown' && e.pointerType !== 'touch') {
        if (isWithinTrackXBounds) {
          this.axis.x.scrollbar.rect =
            this.axis.x.scrollbar.el.getBoundingClientRect();

          if (this.isWithinBounds(this.axis.x.scrollbar.rect)) {
            this.onDragStart(e, 'x');
          } else {
            this.onTrackClick(e, 'x');
          }
        }

        if (isWithinTrackYBounds) {
          this.axis.y.scrollbar.rect =
            this.axis.y.scrollbar.el.getBoundingClientRect();

          if (this.isWithinBounds(this.axis.y.scrollbar.rect)) {
            this.onDragStart(e, 'y');
          } else {
            this.onTrackClick(e, 'y');
          }
        }
      }
    }
  };

  /**
   * on scrollbar handle drag movement starts
   */
  onDragStart(e: any, axis: Axis = 'y'): void {
    const elDocument = getElementDocument(this.el);
    const elWindow = getElementWindow(this.el);
    const scrollbar = this.axis[axis].scrollbar;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = axis === 'y' ? e.pageY : e.pageX;
    this.axis[axis].dragOffset =
      eventOffset - (scrollbar.rect?.[this.axis[axis].offsetAttr] || 0);
    this.draggedAxis = axis;

    addClasses(this.el, this.classNames.dragging);

    elDocument.addEventListener('mousemove', this.drag, true);
    elDocument.addEventListener('mouseup', this.onEndDrag, true);
    if (this.removePreventClickId === null) {
      elDocument.addEventListener('click', this.preventClick, true);
      elDocument.addEventListener('dblclick', this.preventClick, true);
    } else {
      elWindow.clearTimeout(this.removePreventClickId);
      this.removePreventClickId = null;
    }
  }

  /**
   * Drag scrollbar handle
   */
  drag = (e: any) => {
    if (!this.draggedAxis || !this.scrollableEl) return;

    let eventOffset;
    const track = this.axis[this.draggedAxis].track;
    const trackSize = track.rect?.[this.axis[this.draggedAxis].sizeAttr] ?? 0;
    const scrollbar = this.axis[this.draggedAxis].scrollbar;
    const contentSize =
      this.scrollableEl?.[this.axis[this.draggedAxis].scrollSizeAttr] ?? 0;
    const hostSize =
      this.getCachedValue(
        this.scrollableEl,
        this.axis[this.draggedAxis].offsetSizeAttr
      ) || 0;

    e.preventDefault();
    e.stopPropagation();

    if (this.draggedAxis === 'y') {
      eventOffset = e.pageY;
    } else {
      eventOffset = e.pageX;
    }

    // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
    let dragPos =
      eventOffset -
      (track.rect?.[this.axis[this.draggedAxis].offsetAttr] ?? 0) -
      this.axis[this.draggedAxis].dragOffset;
    dragPos = this.isRtl
      ? (track.rect?.[this.axis[this.draggedAxis].sizeAttr] ?? 0) -
        scrollbar.size -
        dragPos
      : dragPos;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    const dragPerc = dragPos / (trackSize - scrollbar.size);

    // Scroll the content by the same percentage.
    let scrollPos = dragPerc * (contentSize - hostSize);

    // Fix browsers inconsistency on RTL
    if (this.draggedAxis === 'x' && this.isRtl) {
      scrollPos = SimpleBarCore.getRtlHelpers()?.isScrollingToNegative
        ? -scrollPos
        : scrollPos;
    }

    this.scrollableEl[this.axis[this.draggedAxis].scrollOffsetAttr] = scrollPos;
  };

  /**
   * End scroll handle drag
   */
  onEndDrag = (e: any) => {
    const elDocument = getElementDocument(this.el);
    const elWindow = getElementWindow(this.el);
    e.preventDefault();
    e.stopPropagation();

    removeClasses(this.el, this.classNames.dragging);

    elDocument.removeEventListener('mousemove', this.drag, true);
    elDocument.removeEventListener('mouseup', this.onEndDrag, true);
    this.removePreventClickId = elWindow.setTimeout(() => {
      // Remove these asynchronously so we still suppress click events
      // generated simultaneously with mouseup.
      elDocument.removeEventListener('click', this.preventClick, true);
      elDocument.removeEventListener('dblclick', this.preventClick, true);
      this.removePreventClickId = null;
    });
  };

  /**
   * Handler to ignore click events during drag
   */
  preventClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
  };

  onTrackClick(e: any, axis: Axis = 'y'): void {
    const currentAxis = this.axis[axis];
    if (
      !this.options.clickOnTrack ||
      !currentAxis.scrollbar.el ||
      !this.scrollableEl
    )
      return;

    // Preventing the event's default to trigger click underneath
    e.preventDefault();

    const elWindow = getElementWindow(this.el);
    this.axis[axis].scrollbar.rect =
      currentAxis.scrollbar.el.getBoundingClientRect();
    const scrollbar = this.axis[axis].scrollbar;
    const scrollbarOffset = scrollbar.rect?.[this.axis[axis].offsetAttr] ?? 0;
    const hostSize =
      this.getCachedValue(this.scrollableEl, this.axis[axis].offsetSizeAttr) ||
      0;
    let scrolled = this.scrollableEl[this.axis[axis].scrollOffsetAttr];
    const t =
      axis === 'y'
        ? this.mouseY - scrollbarOffset
        : this.mouseX - scrollbarOffset;
    const dir = t < 0 ? -1 : 1;
    const scrollSize = dir === -1 ? scrolled - hostSize : scrolled + hostSize;
    const speed = 40;

    const scrollTo = () => {
      if (!this.scrollableEl) return;
      if (dir === -1) {
        if (scrolled > scrollSize) {
          scrolled -= speed;
          this.scrollableEl[this.axis[axis].scrollOffsetAttr] = scrolled;
          elWindow.requestAnimationFrame(scrollTo);
        }
      } else {
        if (scrolled < scrollSize) {
          scrolled += speed;
          this.scrollableEl[this.axis[axis].scrollOffsetAttr] = scrolled;
          elWindow.requestAnimationFrame(scrollTo);
        }
      }
    };

    scrollTo();
  }

  /**
   * Getter for content element
   */
  getContentElement(): HTMLElement | null {
    return this.getScrollElement();
  }

  /**
   * Getter for original scrolling element
   */
  getScrollElement(): HTMLElement | null {
    return this.scrollableEl;
  }

  removeListeners(): void {
    // Event listeners
    this.el.removeEventListener('mouseenter', this.onMouseEnter);

    this.el.removeEventListener('pointerdown', this.onPointerEvent, true);

    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);

    if (this.scrollableEl) {
      this.scrollableEl.removeEventListener('scroll', this.onScroll);
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Cancel all debounced functions
    (this.onMouseMove as DebouncedFunc<any>).cancel();
    (this.onStopScrolling as DebouncedFunc<any>).cancel();
    (this.onMouseEntered as DebouncedFunc<any>).cancel();
  }

  /**
   * Remove all listeners from DOM nodes
   */
  unMount(): void {
    this.removeListeners();
  }

  /**
   * Check if mouse is within bounds
   */
  isWithinBounds(bbox: DOMRect): boolean {
    return (
      this.mouseX >= bbox.left &&
      this.mouseX <= bbox.left + bbox.width &&
      this.mouseY >= bbox.top &&
      this.mouseY <= bbox.top + bbox.height
    );
  }

  /**
   * Find element child that matches the provided query
   * @param el element to search child for
   * @param query query to match
   * @returns matched element
   */
  findChild(el: any, query: any): HTMLElement {
    const matches =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;
    return Array.prototype.filter.call(el.children, (child) =>
      matches.call(child, query)
    )[0];
  }

  getCachedValue(el: HTMLElement | null, attribute: keyof HTMLElement): any {
    if (!el) return null;

    const cachedValue = this.cache.get(el);

    if (!cachedValue) {
      this.cache.set(el, { [attribute]: el[attribute] });
      return el[attribute];
    }

    if (!cachedValue[attribute]) {
      this.cache.set(el, { ...cachedValue, [attribute]: el[attribute] });
      return el[attribute];
    }

    return cachedValue[attribute];
  }

  clearCache(): any {
    this.cache = new WeakMap();
  }
}
