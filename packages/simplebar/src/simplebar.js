import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import memoize from 'lodash.memoize';
import ResizeObserver from 'resize-observer-polyfill';
import canUseDOM from 'can-use-dom';
import scrollbarWidth from './scrollbar-width';

export default class SimpleBar {
  constructor(element, options) {
    this.el = element;
    this.flashTimeout;
    this.contentEl;
    this.contentWrapperEl;
    this.offsetEl;
    this.maskEl;
    this.globalObserver;
    this.mutationObserver;
    this.resizeObserver;
    this.scrollbarWidth;
    this.minScrollbarWidth = 20;
    this.options = { ...SimpleBar.defaultOptions, ...options };
    this.classNames = {
      ...SimpleBar.defaultOptions.classNames,
      ...this.options.classNames
    };
    this.isRtl;
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetAttr: 'left',
        overflowAttr: 'overflowX',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetAttr: 'top',
        overflowAttr: 'overflowY',
        dragOffset: 0,
        isOverflowing: true,
        isVisible: false,
        forceVisible: false,
        track: {},
        scrollbar: {}
      }
    };
    this.removePreventClickId = null;

    // Don't re-instantiate over an existing one
    if (this.el.SimpleBar) {
      return;
    }

    this.recalculate = throttle(this.recalculate.bind(this), 64);
    this.onMouseMove = throttle(this.onMouseMove.bind(this), 64);
    this.hideScrollbars = debounce(
      this.hideScrollbars.bind(this),
      this.options.timeout
    );
    this.onWindowResize = debounce(this.onWindowResize.bind(this), 64, {
      leading: true
    });

    SimpleBar.getRtlHelpers = memoize(SimpleBar.getRtlHelpers);

    this.init();
  }

  /**
   * Static properties
   */

  /**
   * Helper to fix browsers inconsistency on RTL:
   *  - Firefox inverts the scrollbar initial position
   *  - IE11 inverts both scrollbar position and scrolling offset
   * Directly inspired by @KingSora's OverlayScrollbars https://github.com/KingSora/OverlayScrollbars/blob/master/js/OverlayScrollbars.js#L1634
   */
  static getRtlHelpers() {
    const dummyDiv = document.createElement('div');
    dummyDiv.innerHTML =
      '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
    const scrollbarDummyEl = dummyDiv.firstElementChild;
    document.body.appendChild(scrollbarDummyEl);
    const dummyContainerChild = scrollbarDummyEl.firstElementChild;
    scrollbarDummyEl.scrollLeft = 0;
    const dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
    const dummyContainerChildOffset = SimpleBar.getOffset(dummyContainerChild);
    scrollbarDummyEl.scrollLeft = 999;
    const dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(
      dummyContainerChild
    );

    return {
      // determines if the scrolling is responding with negative values
      isRtlScrollingInverted:
        dummyContainerOffset.left !== dummyContainerChildOffset.left &&
        dummyContainerChildOffset.left -
          dummyContainerScrollOffsetAfterScroll.left !==
          0,
      // determines if the origin scrollbar position is inverted or not (positioned on left or right)
      isRtlScrollbarInverted:
        dummyContainerOffset.left !== dummyContainerChildOffset.left
    };
  }

  static defaultOptions = {
    autoHide: true,
    forceVisible: false,
    classNames: {
      contentEl: 'simplebar-content',
      contentWrapper: 'simplebar-content-wrapper',
      offset: 'simplebar-offset',
      mask: 'simplebar-mask',
      wrapper: 'simplebar-wrapper',
      placeholder: 'simplebar-placeholder',
      scrollbar: 'simplebar-scrollbar',
      track: 'simplebar-track',
      heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
      heightAutoObserverEl: 'simplebar-height-auto-observer',
      visible: 'simplebar-visible',
      horizontal: 'simplebar-horizontal',
      vertical: 'simplebar-vertical',
      hover: 'simplebar-hover',
      dragging: 'simplebar-dragging'
    },
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0,
    timeout: 1000
  };

  static initHtmlApi() {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

    // MutationObserver is IE11+
    if (typeof MutationObserver !== 'undefined') {
      // Mutation observer to observe dynamically added elements
      this.globalObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          Array.prototype.forEach.call(mutation.addedNodes, addedNode => {
            if (addedNode.nodeType === 1) {
              if (addedNode.hasAttribute('data-simplebar')) {
                !addedNode.SimpleBar &&
                  new SimpleBar(addedNode, SimpleBar.getElOptions(addedNode));
              } else {
                Array.prototype.forEach.call(
                  addedNode.querySelectorAll('[data-simplebar]'),
                  el => {
                    !el.SimpleBar &&
                      new SimpleBar(el, SimpleBar.getElOptions(el));
                  }
                );
              }
            }
          });

          Array.prototype.forEach.call(mutation.removedNodes, removedNode => {
            if (removedNode.nodeType === 1) {
              if (removedNode.hasAttribute('data-simplebar')) {
                removedNode.SimpleBar && removedNode.SimpleBar.unMount();
              } else {
                Array.prototype.forEach.call(
                  removedNode.querySelectorAll('[data-simplebar]'),
                  el => {
                    el.SimpleBar && el.SimpleBar.unMount();
                  }
                );
              }
            }
          });
        });
      });

      this.globalObserver.observe(document, { childList: true, subtree: true });
    }

    // Taken from jQuery `ready` function
    // Instantiate elements already present on the page
    if (
      document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  }

  // Helper function to retrieve options from element attributes
  static getElOptions(el) {
    const options = Array.prototype.reduce.call(
      el.attributes,
      (acc, attribute) => {
        const option = attribute.name.match(/data-simplebar-(.+)/);
        if (option) {
          const key = option[1].replace(/\W+(.)/g, (x, chr) =>
            chr.toUpperCase()
          );
          switch (attribute.value) {
            case 'true':
              acc[key] = true;
              break;
            case 'false':
              acc[key] = false;
              break;
            case undefined:
              acc[key] = true;
              break;
            default:
              acc[key] = attribute.value;
          }
        }
        return acc;
      },
      {}
    );
    return options;
  }

  static removeObserver() {
    this.globalObserver.disconnect();
  }

  static initDOMLoadedElements() {
    document.removeEventListener(
      'DOMContentLoaded',
      this.initDOMLoadedElements
    );
    window.removeEventListener('load', this.initDOMLoadedElements);

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-simplebar]'),
      el => {
        if (!el.SimpleBar) new SimpleBar(el, SimpleBar.getElOptions(el));
      }
    );
  }

  static getOffset(el) {
    const rect = el.getBoundingClientRect();

    return {
      top:
        rect.top + (window.pageYOffset || document.documentElement.scrollTop),
      left:
        rect.left + (window.pageXOffset || document.documentElement.scrollLeft)
    };
  }

  init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    this.el.SimpleBar = this;

    // We stop here on server-side
    if (canUseDOM) {
      this.initDOM();

      this.scrollbarWidth = scrollbarWidth();

      this.recalculate();

      this.initListeners();
    }
  }

  initDOM() {
    // make sure this element doesn't have the elements yet
    if (
      Array.prototype.filter.call(this.el.children, child =>
        child.classList.contains(this.classNames.wrapper)
      ).length
    ) {
      // assume that element has his DOM already initiated
      this.wrapperEl = this.el.querySelector(`.${this.classNames.wrapper}`);
      this.contentWrapperEl = this.el.querySelector(
        `.${this.classNames.contentWrapper}`
      );
      this.offsetEl = this.el.querySelector(`.${this.classNames.offset}`);
      this.maskEl = this.el.querySelector(`.${this.classNames.mask}`);
      this.contentEl = this.el.querySelector(`.${this.classNames.contentEl}`);
      this.placeholderEl = this.el.querySelector(
        `.${this.classNames.placeholder}`
      );
      this.heightAutoObserverWrapperEl = this.el.querySelector(
        `.${this.classNames.heightAutoObserverWrapperEl}`
      );
      this.heightAutoObserverEl = this.el.querySelector(
        `.${this.classNames.heightAutoObserverEl}`
      );
      this.axis.x.track.el = this.el.querySelector(
        `.${this.classNames.track}.${this.classNames.horizontal}`
      );
      this.axis.y.track.el = this.el.querySelector(
        `.${this.classNames.track}.${this.classNames.vertical}`
      );
    } else {
      // Prepare DOM
      this.wrapperEl = document.createElement('div');
      this.contentWrapperEl = document.createElement('div');
      this.offsetEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.contentEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.heightAutoObserverWrapperEl = document.createElement('div');
      this.heightAutoObserverEl = document.createElement('div');

      this.wrapperEl.classList.add(this.classNames.wrapper);
      this.contentWrapperEl.classList.add(this.classNames.contentWrapper);
      this.offsetEl.classList.add(this.classNames.offset);
      this.maskEl.classList.add(this.classNames.mask);
      this.contentEl.classList.add(this.classNames.contentEl);
      this.placeholderEl.classList.add(this.classNames.placeholder);
      this.heightAutoObserverWrapperEl.classList.add(
        this.classNames.heightAutoObserverWrapperEl
      );
      this.heightAutoObserverEl.classList.add(
        this.classNames.heightAutoObserverEl
      );

      while (this.el.firstChild) {
        this.contentEl.appendChild(this.el.firstChild);
      }

      this.contentWrapperEl.appendChild(this.contentEl);
      this.offsetEl.appendChild(this.contentWrapperEl);
      this.maskEl.appendChild(this.offsetEl);
      this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl);
      this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
      this.wrapperEl.appendChild(this.maskEl);
      this.wrapperEl.appendChild(this.placeholderEl);
      this.el.appendChild(this.wrapperEl);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      const track = document.createElement('div');
      const scrollbar = document.createElement('div');

      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);

      track.appendChild(scrollbar);

      this.axis.x.track.el = track.cloneNode(true);
      this.axis.x.track.el.classList.add(this.classNames.horizontal);

      this.axis.y.track.el = track.cloneNode(true);
      this.axis.y.track.el.classList.add(this.classNames.vertical);

      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
      `.${this.classNames.scrollbar}`
    );
    this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
      `.${this.classNames.scrollbar}`
    );

    if (!this.options.autoHide) {
      this.axis.x.scrollbar.el.classList.add(this.classNames.visible);
      this.axis.y.scrollbar.el.classList.add(this.classNames.visible);
    }

    this.el.setAttribute('data-simplebar', 'init');
  }

  initListeners() {
    // Event listeners
    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    [
      'mousedown',
      'click',
      'dblclick',
      'touchstart',
      'touchend',
      'touchmove'
    ].forEach(e => {
      this.el.addEventListener(e, this.onPointerEvent, true);
    });
    this.el.addEventListener('mousemove', this.onMouseMove);
    this.el.addEventListener('mouseleave', this.onMouseLeave);

    this.contentWrapperEl.addEventListener('scroll', this.onScroll);

    // Browser zoom triggers a window resize
    window.addEventListener('resize', this.onWindowResize);

    this.resizeObserver = new ResizeObserver(this.recalculate);
    this.resizeObserver.observe(this.el);
    this.resizeObserver.observe(this.contentEl);
  }

  recalculate() {
    const isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
    const isWidthAuto = this.heightAutoObserverEl.offsetWidth <= 1;

    this.elStyles = window.getComputedStyle(this.el);
    this.isRtl = this.elStyles.direction === 'rtl';

    this.contentEl.style.padding = `${this.elStyles.paddingTop} ${
      this.elStyles.paddingRight
    } ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`;

    this.wrapperEl.style.margin = `-${this.elStyles.paddingTop} -${
      this.elStyles.paddingRight
    } -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;

    this.contentWrapperEl.style.height = isHeightAuto ? 'auto' : '100%';

    // Determine placeholder size
    this.placeholderEl.style.width = isWidthAuto
      ? `${this.contentEl.offsetWidth}px`
      : 'auto';
    this.placeholderEl.style.height = `${this.contentEl.scrollHeight}px`;

    // Set isOverflowing to false if scrollbar is not necessary (content is shorter than offset)
    this.axis.x.isOverflowing =
      this.contentWrapperEl.scrollWidth > this.contentWrapperEl.offsetWidth;
    this.axis.y.isOverflowing =
      this.contentWrapperEl.scrollHeight > this.contentWrapperEl.offsetHeight;

    // Set isOverflowing to false if user explicitely set hidden overflow
    this.axis.x.isOverflowing =
      this.elStyles.overflowX === 'hidden' ? false : this.axis.x.isOverflowing;
    this.axis.y.isOverflowing =
      this.elStyles.overflowY === 'hidden' ? false : this.axis.y.isOverflowing;

    this.axis.x.forceVisible =
      this.options.forceVisible === 'x' || this.options.forceVisible === true;
    this.axis.y.forceVisible =
      this.options.forceVisible === 'y' || this.options.forceVisible === true;

    this.hideNativeScrollbar();

    this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
    this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

    this.axis.x.scrollbar.size = this.getScrollbarSize('x');
    this.axis.y.scrollbar.size = this.getScrollbarSize('y');

    this.axis.x.scrollbar.el.style.width = `${this.axis.x.scrollbar.size}px`;
    this.axis.y.scrollbar.el.style.height = `${this.axis.y.scrollbar.size}px`;

    this.positionScrollbar('x');
    this.positionScrollbar('y');

    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }

  /**
   * Calculate scrollbar size
   */
  getScrollbarSize(axis = 'y') {
    const contentSize = this.scrollbarWidth
      ? this.contentWrapperEl[this.axis[axis].scrollSizeAttr]
      : this.contentWrapperEl[this.axis[axis].scrollSizeAttr] -
        this.minScrollbarWidth;
    const trackSize = this.axis[axis].track.rect[this.axis[axis].sizeAttr];
    let scrollbarSize;

    if (!this.axis[axis].isOverflowing) {
      return;
    }

    let scrollbarRatio = trackSize / contentSize;

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

  positionScrollbar(axis = 'y') {
    const contentSize = this.contentWrapperEl[this.axis[axis].scrollSizeAttr];
    const trackSize = this.axis[axis].track.rect[this.axis[axis].sizeAttr];
    const hostSize = parseInt(this.elStyles[this.axis[axis].sizeAttr], 10);
    const scrollbar = this.axis[axis].scrollbar;

    let scrollOffset = this.contentWrapperEl[this.axis[axis].scrollOffsetAttr];
    scrollOffset =
      axis === 'x' &&
      this.isRtl &&
      SimpleBar.getRtlHelpers().isRtlScrollingInverted
        ? -scrollOffset
        : scrollOffset;
    let scrollPourcent = scrollOffset / (contentSize - hostSize);

    let handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);
    handleOffset =
      axis === 'x' &&
      this.isRtl &&
      SimpleBar.getRtlHelpers().isRtlScrollbarInverted
        ? handleOffset + (trackSize - scrollbar.size)
        : handleOffset;

    scrollbar.el.style.transform =
      axis === 'x'
        ? `translate3d(${handleOffset}px, 0, 0)`
        : `translate3d(0, ${handleOffset}px, 0)`;
  }

  toggleTrackVisibility(axis = 'y') {
    const track = this.axis[axis].track.el;
    const scrollbar = this.axis[axis].scrollbar.el;

    if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
      track.style.visibility = 'visible';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'scroll';
    } else {
      track.style.visibility = 'hidden';
      this.contentWrapperEl.style[this.axis[axis].overflowAttr] = 'hidden';
    }

    // Even if forceVisible is enabled, scrollbar itself should be hidden
    if (this.axis[axis].isOverflowing) {
      scrollbar.style.display = 'block';
    } else {
      scrollbar.style.display = 'none';
    }
  }

  hideNativeScrollbar() {
    this.offsetEl.style[this.isRtl ? 'left' : 'right'] =
      this.axis.y.isOverflowing || this.axis.y.forceVisible
        ? `-${this.scrollbarWidth || this.minScrollbarWidth}px`
        : 0;
    this.offsetEl.style.bottom =
      this.axis.x.isOverflowing || this.axis.x.forceVisible
        ? `-${this.scrollbarWidth || this.minScrollbarWidth}px`
        : 0;

    // If floating scrollbar
    if (!this.scrollbarWidth) {
      const paddingDirection = [this.isRtl ? 'paddingLeft' : 'paddingRight'];
      this.contentWrapperEl.style[paddingDirection] =
        this.axis.y.isOverflowing || this.axis.y.forceVisible
          ? `${this.minScrollbarWidth}px`
          : 0;
      this.contentWrapperEl.style.paddingBottom =
        this.axis.x.isOverflowing || this.axis.x.forceVisible
          ? `${this.minScrollbarWidth}px`
          : 0;
    }
  }

  /**
   * On scroll event handling
   */
  onScroll = () => {
    if (!this.scrollXTicking) {
      window.requestAnimationFrame(this.scrollX);
      this.scrollXTicking = true;
    }

    if (!this.scrollYTicking) {
      window.requestAnimationFrame(this.scrollY);
      this.scrollYTicking = true;
    }
  };

  scrollX = () => {
    if (this.axis.x.isOverflowing) {
      this.showScrollbar('x');
      this.positionScrollbar('x');
    }

    this.scrollXTicking = false;
  };

  scrollY = () => {
    if (this.axis.y.isOverflowing) {
      this.showScrollbar('y');
      this.positionScrollbar('y');
    }

    this.scrollYTicking = false;
  };

  onMouseEnter = () => {
    this.showScrollbar('x');
    this.showScrollbar('y');
  };

  onMouseMove = e => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      this.onMouseMoveForAxis('x');
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      this.onMouseMoveForAxis('y');
    }
  };

  onMouseMoveForAxis(axis = 'y') {
    this.axis[axis].track.rect = this.axis[
      axis
    ].track.el.getBoundingClientRect();
    this.axis[axis].scrollbar.rect = this.axis[
      axis
    ].scrollbar.el.getBoundingClientRect();

    const isWithinScrollbarBoundsX = this.isWithinBounds(
      this.axis[axis].scrollbar.rect
    );

    if (isWithinScrollbarBoundsX) {
      this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
    }

    if (this.isWithinBounds(this.axis[axis].track.rect)) {
      this.showScrollbar(axis);
      this.axis[axis].track.el.classList.add(this.classNames.hover);
    } else {
      this.axis[axis].track.el.classList.remove(this.classNames.hover);
    }
  }

  onMouseLeave = () => {
    this.onMouseMove.cancel();

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      this.onMouseLeaveForAxis('x');
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      this.onMouseLeaveForAxis('y');
    }

    this.mouseX = -1;
    this.mouseY = -1;
  };

  onMouseLeaveForAxis(axis = 'y') {
    this.axis[axis].track.el.classList.remove(this.classNames.hover);
    this.axis[axis].scrollbar.el.classList.remove(this.classNames.hover);
  }

  onWindowResize = () => {
    // Recalculate scrollbarWidth in case it's a zoom
    this.scrollbarWidth = scrollbarWidth();

    this.hideNativeScrollbar();
  };

  /**
   * Show scrollbar
   */
  showScrollbar(axis = 'y') {
    let scrollbar = this.axis[axis].scrollbar.el;

    if (!this.axis[axis].isVisible) {
      scrollbar.classList.add(this.classNames.visible);
      this.axis[axis].isVisible = true;
    }

    if (this.options.autoHide) {
      this.hideScrollbars();
    }
  }

  /**
   * Hide Scrollbar
   */
  hideScrollbars = () => {
    this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
    this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

    if (!this.isWithinBounds(this.axis.y.track.rect)) {
      this.axis.y.scrollbar.el.classList.remove(this.classNames.visible);
      this.axis.y.isVisible = false;
    }

    if (!this.isWithinBounds(this.axis.x.track.rect)) {
      this.axis.x.scrollbar.el.classList.remove(this.classNames.visible);
      this.axis.x.isVisible = false;
    }
  };

  onPointerEvent = e => {
    let isWithinBoundsY, isWithinBoundsX;
    this.axis.x.scrollbar.rect = this.axis.x.scrollbar.el.getBoundingClientRect();
    this.axis.y.scrollbar.rect = this.axis.y.scrollbar.el.getBoundingClientRect();

    if (this.axis.x.isOverflowing || this.axis.x.forceVisible) {
      isWithinBoundsX = this.isWithinBounds(this.axis.x.scrollbar.rect);
    }

    if (this.axis.y.isOverflowing || this.axis.y.forceVisible) {
      isWithinBoundsY = this.isWithinBounds(this.axis.y.scrollbar.rect);
    }

    // If any pointer event is called on the scrollbar
    if (isWithinBoundsY || isWithinBoundsX) {
      // Preventing the event's default action stops text being
      // selectable during the drag.
      e.preventDefault();
      // Prevent event leaking
      e.stopPropagation();

      if (e.type === 'mousedown') {
        if (isWithinBoundsY) {
          this.onDragStart(e, 'y');
        }

        if (isWithinBoundsX) {
          this.onDragStart(e, 'x');
        }
      }
    }
  };

  /**
   * on scrollbar handle drag movement starts
   */
  onDragStart(e, axis = 'y') {
    const scrollbar = this.axis[axis].scrollbar.el;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = axis === 'y' ? e.pageY : e.pageX;
    this.axis[axis].dragOffset =
      eventOffset -
      scrollbar.getBoundingClientRect()[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;

    this.el.classList.add(this.classNames.dragging);

    document.addEventListener('mousemove', this.drag, true);
    document.addEventListener('mouseup', this.onEndDrag, true);
    if (this.removePreventClickId === null) {
      document.addEventListener('click', this.preventClick, true);
      document.addEventListener('dblclick', this.preventClick, true);
    } else {
      window.clearTimeout(this.removePreventClickId);
      this.removePreventClickId = null;
    }
  }

  /**
   * Drag scrollbar handle
   */
  drag = e => {
    let eventOffset;
    let track = this.axis[this.draggedAxis].track;
    const trackSize = track.rect[this.axis[this.draggedAxis].sizeAttr];
    const scrollbar = this.axis[this.draggedAxis].scrollbar;

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
      track.rect[this.axis[this.draggedAxis].offsetAttr] -
      this.axis[this.draggedAxis].dragOffset;
    // Convert the mouse position into a percentage of the scrollbar height/width.
    let dragPerc = dragPos / track.rect[this.axis[this.draggedAxis].sizeAttr];

    // Scroll the content by the same percentage.
    let scrollPos =
      dragPerc *
      this.contentWrapperEl[this.axis[this.draggedAxis].scrollSizeAttr];

    // Fix browsers inconsistency on RTL
    if (this.draggedAxis === 'x') {
      scrollPos =
        this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
          ? scrollPos - (trackSize + scrollbar.size)
          : scrollPos;
      scrollPos =
        this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted
          ? -scrollPos
          : scrollPos;
    }

    this.contentWrapperEl[
      this.axis[this.draggedAxis].scrollOffsetAttr
    ] = scrollPos;
  };

  /**
   * End scroll handle drag
   */
  onEndDrag = e => {
    e.preventDefault();
    e.stopPropagation();

    this.el.classList.remove(this.classNames.dragging);

    document.removeEventListener('mousemove', this.drag, true);
    document.removeEventListener('mouseup', this.onEndDrag, true);
    this.removePreventClickId = window.setTimeout(() => {
      // Remove these asynchronously so we still suppress click events
      // generated simultaneously with mouseup.
      document.removeEventListener('click', this.preventClick, true);
      document.removeEventListener('dblclick', this.preventClick, true);
      this.removePreventClickId = null;
    });
  };

  /**
   * Handler to ignore click events during drag
   */
  preventClick = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Getter for content element
   */
  getContentElement() {
    return this.contentEl;
  }

  /**
   * Getter for original scrolling element
   */
  getScrollElement() {
    return this.contentWrapperEl;
  }

  removeListeners() {
    // Event listeners
    if (this.options.autoHide) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    [
      'mousedown',
      'click',
      'dblclick',
      'touchstart',
      'touchend',
      'touchmove'
    ].forEach(e => {
      this.el.removeEventListener(e, this.onPointerEvent);
    });

    this.el.removeEventListener('mousemove', this.onMouseMove);
    this.el.removeEventListener('mouseleave', this.onMouseLeave);

    this.contentWrapperEl.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onWindowResize);

    this.mutationObserver && this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();

    // Cancel all debounced functions
    this.recalculate.cancel();
    this.onMouseMove.cancel();
    this.hideScrollbars.cancel();
    this.onWindowResize.cancel();
  }

  /**
   * UnMount mutation observer and delete SimpleBar instance from DOM element
   */
  unMount() {
    this.removeListeners();
    this.el.SimpleBar = null;
  }

  /**
   * Recursively walks up the parent nodes looking for this.el
   */
  isChildNode(el) {
    if (el === null) return false;
    if (el === this.el) return true;

    return this.isChildNode(el.parentNode);
  }

  /**
   * Check if mouse is within bounds
   */
  isWithinBounds(bbox) {
    return (
      this.mouseX >= bbox.left &&
      this.mouseX <= bbox.left + bbox.width &&
      this.mouseY >= bbox.top &&
      this.mouseY <= bbox.top + bbox.height
    );
  }
}

/**
 * HTML API
 * Called only in a browser env.
 */
if (canUseDOM) {
  SimpleBar.initHtmlApi();
}
