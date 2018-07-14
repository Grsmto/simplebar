import scrollbarWidth from 'scrollbarwidth';
import throttle from 'lodash.throttle';
import ResizeObserver from 'resize-observer-polyfill';

export default class SimpleBar {
  constructor(element, options) {
    this.el = element;
    this.flashTimeout;
    this.contentEl;
    this.scrollContentEl;
    this.dragOffset = { x: 0, y: 0 };
    this.isEnabled = { x: true, y: true };
    this.isVisible = { x: false, y: false };
    this.scrollOffsetAttr = { x: 'scrollLeft', y: 'scrollTop' };
    this.sizeAttr = { x: 'offsetWidth', y: 'offsetHeight' };
    this.scrollSizeAttr = { x: 'scrollWidth', y: 'scrollHeight' };
    this.offsetAttr = { x: 'left', y: 'top' };
    this.globalObserver;
    this.mutationObserver;
    this.resizeObserver;
    this.currentAxis;
    this.scrollbarWidth;
    this.options = Object.assign({}, SimpleBar.defaultOptions, options);
    this.isRtl = this.options.direction === 'rtl';
    this.classNames = this.options.classNames;
    this.offsetSize = 20;

    this.recalculate = throttle(this.recalculate.bind(this), 1000);

    this.init();
  }

  static get defaultOptions() {
    return {
      autoHide: true,
      forceVisible: false,
      classNames: {
        content: 'simplebar-content',
        scrollContent: 'simplebar-scroll-content',
        scrollbar: 'simplebar-scrollbar',
        track: 'simplebar-track'
      },
      scrollbarMinSize: 25,
      scrollbarMaxSize: 0,
      direction: 'ltr',
      timeout: 1000
    };
  }

  static initHtmlApi() {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

    // MutationObserver is IE11+
    if (typeof MutationObserver !== 'undefined') {
      // Mutation observer to observe dynamically added elements
      this.globalObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          Array.from(mutation.addedNodes).forEach(addedNode => {
            if (addedNode.nodeType === 1) {
              if (addedNode.hasAttribute('data-simplebar')) {
                !addedNode.SimpleBar &&
                  new SimpleBar(addedNode, SimpleBar.getElOptions(addedNode));
              } else {
                Array.from(
                  addedNode.querySelectorAll('[data-simplebar]')
                ).forEach(el => {
                  !el.SimpleBar &&
                    new SimpleBar(el, SimpleBar.getElOptions(el));
                });
              }
            }
          });

          Array.from(mutation.removedNodes).forEach(removedNode => {
            if (removedNode.nodeType === 1) {
              if (removedNode.hasAttribute('data-simplebar')) {
                removedNode.SimpleBar && removedNode.SimpleBar.unMount();
              } else {
                Array.from(
                  removedNode.querySelectorAll('[data-simplebar]')
                ).forEach(el => {
                  el.SimpleBar && el.SimpleBar.unMount();
                });
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
      window.setTimeout(this.initDOMLoadedElements.bind(this));
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  }

  // Helper function to retrieve options from element attributes
  static getElOptions(el) {
    const options = Array.from(el.attributes).reduce((acc, attribute) => {
      const option = attribute.name.match(/data-simplebar-(.+)/);
      if (option) {
        const key = option[1].replace(/\W+(.)/g, (x, chr) => chr.toUpperCase());
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
    }, {});
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

    Array.from(document.querySelectorAll('[data-simplebar]')).forEach(el => {
      if (!el.SimpleBar) new SimpleBar(el, SimpleBar.getElOptions(el));
    });
  }

  init() {
    // Save a reference to the instance, so we know this DOM node has already been instancied
    this.el.SimpleBar = this;

    this.initDOM();

    // Calculate content size
    this.hideNativeScrollbar();
    this.render();

    this.initListeners();
  }

  initDOM() {
    // make sure this element doesn't have the elements yet
    if (
      Array.from(this.el.children).filter(child =>
        child.classList.contains(this.classNames.scrollContent)
      ).length
    ) {
      // assume that element has his DOM already initiated
      this.trackX = this.el.querySelector(
        `.${this.classNames.track}.horizontal`
      );
      this.trackY = this.el.querySelector(`.${this.classNames.track}.vertical`);
      this.scrollContentEl = this.el.querySelector(
        `.${this.classNames.scrollContent}`
      );
      this.contentEl = this.el.querySelector(`.${this.classNames.content}`);
    } else {
      // Prepare DOM
      this.scrollContentEl = document.createElement('div');
      this.contentEl = document.createElement('div');

      this.scrollContentEl.classList.add(this.classNames.scrollContent);
      this.contentEl.classList.add(this.classNames.content);

      while (this.el.firstChild) this.contentEl.appendChild(this.el.firstChild);

      this.scrollContentEl.appendChild(this.contentEl);
      this.el.appendChild(this.scrollContentEl);
    }

    if (!this.trackX || !this.trackY) {
      const track = document.createElement('div');
      const scrollbar = document.createElement('div');

      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);

      if (!this.options.autoHide) {
        scrollbar.classList.add('visible');
      }

      track.appendChild(scrollbar);

      this.trackX = track.cloneNode(true);
      this.trackX.classList.add('horizontal');

      this.trackY = track.cloneNode(true);
      this.trackY.classList.add('vertical');

      this.el.insertBefore(this.trackX, this.el.firstChild);
      this.el.insertBefore(this.trackY, this.el.firstChild);
    }

    this.scrollbarX = this.trackX.querySelector(
      `.${this.classNames.scrollbar}`
    );
    this.scrollbarY = this.trackY.querySelector(
      `.${this.classNames.scrollbar}`
    );

    this.el.setAttribute('data-simplebar', 'init');
  }

  initListeners() {
    // Event listeners
    if (this.options.autoHide) {
      this.el.addEventListener('mouseenter', this.onMouseEnter);
    }

    this.el.addEventListener('mousedown', this.onMouseDown);

    this.contentEl.addEventListener('scroll', this.onScrollX);
    this.scrollContentEl.addEventListener('scroll', this.onScrollY);

    // Browser zoom triggers a window resize
    window.addEventListener('resize', this.onWindowResize);

    // MutationObserver is IE11+
    if (typeof MutationObserver !== 'undefined') {
      // create an observer instance
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (this.isChildNode(mutation.target) || mutation.addedNodes.length) {
            this.recalculate();
          }
        });
      });

      // pass in the target node, as well as the observer options
      this.mutationObserver.observe(this.el, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
      });
    }

    this.resizeObserver = new ResizeObserver(this.recalculate);
    this.resizeObserver.observe(this.el);
  }

  /**
   * Recalculate scrollbar
   */
  recalculate() {
    this.render();
  }

  render() {
    this.contentSizeX = this.contentEl[this.scrollSizeAttr['x']];
    this.contentSizeY =
      this.contentEl[this.scrollSizeAttr['y']] -
      (this.scrollbarWidth || this.offsetSize);
    this.trackXSize = this.trackX[this.sizeAttr['x']];
    this.trackYSize = this.trackY[this.sizeAttr['y']];

    // Set isEnabled to false if scrollbar is not necessary (content is shorter than wrapper)
    this.isEnabled['x'] = this.trackXSize < this.contentSizeX;
    this.isEnabled['y'] = this.trackYSize < this.contentSizeY;

    this.resizeScrollbar('x');
    this.resizeScrollbar('y');

    this.positionScrollbar('x');
    this.positionScrollbar('y');

    this.toggleTrackVisibility('x');
    this.toggleTrackVisibility('y');
  }

  /**
   * Resize scrollbar
   */
  resizeScrollbar(axis = 'y') {
    let scrollbar;
    let contentSize;
    let trackSize;

    if (!this.isEnabled[axis] && !this.options.forceVisible) {
      return;
    }

    if (axis === 'x') {
      scrollbar = this.scrollbarX;
      contentSize = this.contentSizeX;
      trackSize = this.trackXSize;
    } else {
      // 'y'
      scrollbar = this.scrollbarY;
      contentSize = this.contentSizeY;
      trackSize = this.trackYSize;
    }

    let scrollbarRatio = trackSize / contentSize;

    // Calculate new height/position of drag handle.
    this.handleSize = Math.max(
      ~~(scrollbarRatio * trackSize),
      this.options.scrollbarMinSize
    );

    if (this.options.scrollbarMaxSize) {
      this.handleSize = Math.min(
        this.handleSize,
        this.options.scrollbarMaxSize
      );
    }

    if (axis === 'x') {
      scrollbar.style.width = `${this.handleSize}px`;
    } else {
      scrollbar.style.height = `${this.handleSize}px`;
    }
  }

  positionScrollbar(axis = 'y') {
    let scrollbar;
    let scrollOffset;
    let contentSize;
    let trackSize;

    if (axis === 'x') {
      scrollbar = this.scrollbarX;
      scrollOffset = this.contentEl[this.scrollOffsetAttr[axis]]; // Either scrollTop() or scrollLeft().
      contentSize = this.contentSizeX;
      trackSize = this.trackXSize;
    } else {
      // 'y'
      scrollbar = this.scrollbarY;
      scrollOffset = this.scrollContentEl[this.scrollOffsetAttr[axis]]; // Either scrollTop() or scrollLeft().
      contentSize = this.contentSizeY;
      trackSize = this.trackYSize;
    }

    let scrollPourcent = scrollOffset / (contentSize - trackSize);
    let handleOffset = ~~((trackSize - this.handleSize) * scrollPourcent);

    if (this.isEnabled[axis] || this.options.forceVisible) {
      if (axis === 'x') {
        scrollbar.style.transform = `translate3d(${handleOffset}px, 0, 0)`;
      } else {
        scrollbar.style.transform = `translate3d(0, ${handleOffset}px, 0)`;
      }
    }
  }

  toggleTrackVisibility(axis = 'y') {
    let track = axis === 'y' ? this.trackY : this.trackX;
    let scrollbar = axis === 'y' ? this.scrollbarY : this.scrollbarX;

    if (this.isEnabled[axis] || this.options.forceVisible) {
      track.style.visibility = 'visible';
    } else {
      track.style.visibility = 'hidden';
    }

    // Even if forceVisible is enabled, scrollbar itself should be hidden
    if (this.options.forceVisible) {
      if (this.isEnabled[axis]) {
        scrollbar.style.visibility = 'visible';
      } else {
        scrollbar.style.visibility = 'hidden';
      }
    }
  }

  hideNativeScrollbar() {
    // Recalculate scrollbarWidth in case it's a zoom
    this.scrollbarWidth = scrollbarWidth();

    this.scrollContentEl.style[
      this.isRtl ? 'paddingLeft' : 'paddingRight'
    ] = `${this.scrollbarWidth || this.offsetSize}px`;
    this.scrollContentEl.style.marginBottom = `-${this.scrollbarWidth * 2 ||
      this.offsetSize}px`;
    this.contentEl.style.paddingBottom = `${this.scrollbarWidth ||
      this.offsetSize}px`;

    if (this.scrollbarWidth !== 0) {
      this.contentEl.style[this.isRtl ? 'marginLeft' : 'marginRight'] = `-${
        this.scrollbarWidth
      }px`;
    }
  }

  /**
   * On scroll event handling
   */
  onScrollX = () => {
    if (!this.scrollXTicking) {
      window.requestAnimationFrame(this.scrollX);
      this.scrollXTicking = true;
    }
  }

  onScrollY = () => {
    if (!this.scrollYTicking) {
      window.requestAnimationFrame(this.scrollY);
      this.scrollYTicking = true;
    }
  }

  scrollX = () => {
    this.showScrollbar('x');
    this.positionScrollbar('x');
    this.scrollXTicking = false;
  }

  scrollY = () => {
    this.showScrollbar('y');
    this.positionScrollbar('y');
    this.scrollYTicking = false;
  }

  /**
   * On mouseenter event handling
   */
  onMouseEnter = () => {
    this.showScrollbar('x');
    this.showScrollbar('y');
  }

  onWindowResize = () => {
    this.hideNativeScrollbar();
  }

  /**
   * Show scrollbar
   */
  showScrollbar(axis = 'y') {
    let scrollbar;

    // Scrollbar already visible
    if (this.isVisible[axis]) {
      return;
    }

    if (axis === 'x') {
      scrollbar = this.scrollbarX;
    } else {
      // 'y'
      scrollbar = this.scrollbarY;
    }

    if (this.isEnabled[axis]) {
      scrollbar.classList.add('visible');
      this.isVisible[axis] = true;
    }

    if (!this.options.autoHide) {
      return;
    }

    this.flashTimeout = window.setTimeout(this.hideScrollbars, this.options.timeout);
  }

  /**
   * Hide Scrollbar
   */
  hideScrollbars = () => {
    this.scrollbarX.classList.remove('visible');
    this.scrollbarY.classList.remove('visible');

    this.isVisible.x = false;
    this.isVisible.y = false;

    window.clearTimeout(this.flashTimeout);
  }

  onMouseDown = (e) => {
    const bbox = this.scrollbarY.getBoundingClientRect();

    if (e.pageX >= bbox.x && e.clientX <= bbox.x + bbox.width && e.clientY >= bbox.y && e.clientY <= bbox.y + bbox.height) {
      e.preventDefault();
      this.onDrag(e, 'y');
    }
  }

  /**
   * on scrollbar handle drag
   */
  onDrag(e, axis = 'y') {
    // Preventing the event's default action stops text being
    // selectable during the drag.
    e.preventDefault();

    const scrollbar = axis === 'y' ? this.scrollbarY : this.scrollbarX;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = axis === 'y' ? e.pageY : e.pageX;

    this.dragOffset[axis] =
      eventOffset - scrollbar.getBoundingClientRect()[this.offsetAttr[axis]];
    this.currentAxis = axis;

    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.onEndDrag);
  }

  /**
   * Drag scrollbar handle
   */
  drag = (e) => {
    let eventOffset, track, scrollEl;

    e.preventDefault();

    if (this.currentAxis === 'y') {
      eventOffset = e.pageY;
      track = this.trackY;
      scrollEl = this.scrollContentEl;
    } else {
      eventOffset = e.pageX;
      track = this.trackX;
      scrollEl = this.contentEl;
    }

    // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
    let dragPos =
      eventOffset -
      track.getBoundingClientRect()[this.offsetAttr[this.currentAxis]] -
      this.dragOffset[this.currentAxis];

    // Convert the mouse position into a percentage of the scrollbar height/width.
    let dragPerc = dragPos / track[this.sizeAttr[this.currentAxis]];

    // Scroll the content by the same percentage.
    let scrollPos =
      dragPerc * this.contentEl[this.scrollSizeAttr[this.currentAxis]];

    scrollEl[this.scrollOffsetAttr[this.currentAxis]] = scrollPos;
  }

  /**
   * End scroll handle drag
   */
  onEndDrag = () => {
    document.removeEventListener('mousemove', this.drag);
    document.removeEventListener('mouseup', this.onEndDrag);
  }

  /**
   * Getter for original scrolling element
   */
  getScrollElement(axis = 'y') {
    return axis === 'y' ? this.scrollContentEl : this.contentEl;
  }

  /**
   * Getter for content element
   */
  getContentElement() {
    return this.contentEl;
  }

  removeListeners() {
    // Event listeners
    if (this.options.autoHide) {
      this.el.removeEventListener('mouseenter', this.onMouseEnter);
    }

    this.scrollContentEl.removeEventListener('scroll', this.onScrollY);
    this.contentEl.removeEventListener('scroll', this.onScrollX);

    this.mutationObserver.disconnect();
    this.resizeObserver.disconnect();
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
}

/**
 * HTML API
 */
SimpleBar.initHtmlApi();
