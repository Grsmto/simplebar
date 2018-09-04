import scrollbarWidth from 'scrollbarwidth';
import throttle from 'lodash.throttle';
import ResizeObserver from 'resize-observer-polyfill';
import canUseDOM from 'can-use-dom';

export default class SimpleBar {
  constructor(element, options) {
    this.el = element;
    this.flashTimeout;
    this.contentEl;
    this.scrollerEl;
    this.maskEl;
    this.globalObserver;
    this.mutationObserver;
    this.resizeObserver;
    this.scrollbarWidth;
    this.options = Object.assign({}, SimpleBar.defaultOptions, options);
    this.isRtl;
    this.classNames = this.options.classNames;
    this.offsetSize = 20;
    this.axis = {
      x: {
        scrollOffsetAttr: 'scrollLeft',
        sizeAttr: 'width',
        scrollSizeAttr: 'scrollWidth',
        offsetAttr: 'left',
        dragOffset: 0,
        isEnabled: true,
        isVisible: false,
        track: {},
        scrollbar: {}
      },
      y: {
        scrollOffsetAttr: 'scrollTop',
        sizeAttr: 'height',
        scrollSizeAttr: 'scrollHeight',
        offsetAttr: 'top',
        dragOffset: 0,
        isEnabled: true,
        isVisible: false,
        track: {},
        scrollbar: {}
      }
    };

    this.recalculate = throttle(this.recalculate.bind(this), 1000);
    this.onMouseMove = throttle(this.onMouseMove.bind(this), 100);

    this.init();
  }

  static get defaultOptions() {
    return {
      autoHide: true,
      forceVisible: false,
      classNames: {
        content: 'simplebar-content',
        scroller: 'simplebar-scroller',
        mask: 'simplebar-mask',
        placeholder: 'simplebar-placeholder',
        scrollbar: 'simplebar-scrollbar',
        track: 'simplebar-track',
        sizeAutoObserverWrapperEl: 'simplebar-size-auto-observer-wrapper',
        sizeAutoObserverEl: 'simplebar-size-auto-observer'
      },
      scrollbarMinSize: 25,
      scrollbarMaxSize: 0,
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
      window.setTimeout(this.initDOMLoadedElements);
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

    // We stop here on server-side
    if (canUseDOM) {
      // Recalculate scrollbarWidth in case it's a zoom
      this.scrollbarWidth = scrollbarWidth();
      
      this.hideNativeScrollbar();
      this.render();
  
      this.initListeners();
    }
  }

  initDOM() {
    // make sure this element doesn't have the elements yet
    if (
      Array.from(this.el.children).filter(child =>
        child.classList.contains(this.classNames.scrollContent)
      ).length
    ) {
      // assume that element has his DOM already initiated
      this.contentEl = this.el.querySelector(`.${this.classNames.content}`);
      this.scrollerEl = this.el.querySelector(`.${this.classNames.scroller}`);
      this.maskEl = this.el.querySelector(`.${this.classNames.mask}`);
      this.placeholderEl = this.el.querySelector(`.${this.classNames.placeholder}`);
      this.axis.x.track.el = this.el.querySelector(
        `.${this.classNames.track}.horizontal`
      );
      this.axis.y.track.el = this.el.querySelector(`.${this.classNames.track}.vertical`);
    } else {
      // Prepare DOM
      this.contentEl = document.createElement('div');
      this.scrollerEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.sizeAutoObserverWrapperEl = document.createElement('div');
      this.sizeAutoObserverEl = document.createElement('div');

      this.contentEl.classList.add(this.classNames.content);
      this.scrollerEl.classList.add(this.classNames.scroller);
      this.maskEl.classList.add(this.classNames.mask);
      this.placeholderEl.classList.add(this.classNames.placeholder);
      this.sizeAutoObserverWrapperEl.classList.add(this.classNames.sizeAutoObserverWrapperEl);
      this.sizeAutoObserverEl.classList.add(this.classNames.sizeAutoObserverEl);
      
      while (this.el.firstChild) this.contentEl.appendChild(this.el.firstChild);
      
      this.scrollerEl.appendChild(this.contentEl);
      this.maskEl.appendChild(this.scrollerEl);
      this.sizeAutoObserverWrapperEl.appendChild(this.sizeAutoObserverEl);
      this.el.appendChild(this.sizeAutoObserverWrapperEl);
      this.el.appendChild(this.maskEl);
      this.el.appendChild(this.placeholderEl);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      const track = document.createElement('div');
      const scrollbar = document.createElement('div');

      track.classList.add(this.classNames.track);
      scrollbar.classList.add(this.classNames.scrollbar);

      if (!this.options.autoHide) {
        scrollbar.classList.add('visible');
      }

      track.appendChild(scrollbar);

      this.axis.x.track.el = track.cloneNode(true);
      this.axis.x.track.el.classList.add('horizontal');

      this.axis.y.track.el = track.cloneNode(true);
      this.axis.y.track.el.classList.add('vertical');

      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
      `.${this.classNames.scrollbar}`
    );
    this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
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
    this.el.addEventListener('mousemove', this.onMouseMove);

    this.contentEl.addEventListener('scroll', this.onScroll);

    // Browser zoom triggers a window resize
    window.addEventListener('resize', this.onWindowResize);

    // MutationObserver is IE11+
    if (typeof MutationObserver !== 'undefined') {
      // create an observer instance
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.target !== this.isChildNode(mutation.target) || mutation.addedNodes.length) {
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
    const isSizeAuto = this.sizeAutoObserverEl.offsetHeight === 0;

    this.elStyles = window.getComputedStyle(this.el);

    this.isRtl = this.elStyles.direction === 'rtl';

    this.contentEl.style.padding = `${this.elStyles.paddingTop} ${this.elStyles.paddingRight} ${this.elStyles.paddingBottom} ${this.elStyles.paddingLeft}`;
    this.contentEl.style.height = isSizeAuto ? 'auto' : '100%';

    this.placeholderEl.style.width = `${this.contentEl.scrollWidth}px`;
    this.placeholderEl.style.height = `${this.contentEl.scrollHeight}px`;
    this.placeholderEl.style.margin = `-${this.elStyles.paddingTop} -${this.elStyles.paddingRight} -${this.elStyles.paddingBottom} -${this.elStyles.paddingLeft}`;

    this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
    this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();

    // Set isEnabled to false if scrollbar is not necessary (content is shorter than scroller)
    this.axis.x.isEnabled = this.contentEl.scrollWidth > Math.ceil(this.axis.x.track.rect.width);
    this.axis.y.isEnabled = this.contentEl.scrollHeight > Math.ceil(this.axis.y.track.rect.height);

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
    const contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    const trackSize = this.axis[axis].track.rect[this.axis[axis].sizeAttr];
    let scrollbarSize;
    
    if (!this.axis[axis].isEnabled && !this.options.forceVisible) {
      return;
    }
    
    let scrollbarRatio = trackSize / contentSize;
    
    // Calculate new height/position of drag handle.
    scrollbarSize = Math.max(
      ~~(scrollbarRatio * trackSize),
      this.options.scrollbarMinSize
    );
    
    if (this.options.scrollbarMaxSize) {
      scrollbarSize = Math.min(
        scrollbarSize,
        this.options.scrollbarMaxSize
      );
    }

    return scrollbarSize;
  }

  positionScrollbar(axis = 'y') {
    const contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
    const trackSize = this.axis[axis].track.rect[this.axis[axis].sizeAttr];
    const scrollOffset = this.contentEl[this.axis[axis].scrollOffsetAttr];
    const scrollbar = this.axis[axis].scrollbar;

    let scrollPourcent = scrollOffset / (contentSize - trackSize);
    let handleOffset = ~~((trackSize - scrollbar.size) * scrollPourcent);

    if (this.axis[axis].isEnabled || this.options.forceVisible) {
      scrollbar.el.style.transform = axis === 'x' ? `translate3d(${handleOffset}px, 0, 0)` : `translate3d(0, ${handleOffset}px, 0)`;
    }
  }

  toggleTrackVisibility(axis = 'y') {
    const track = this.axis[axis].track.el;
    const scrollbar = this.axis[axis].scrollbar.el;

    if (this.axis[axis].isEnabled || this.options.forceVisible) {
      track.style.visibility = 'visible';
    } else {
      track.style.visibility = 'hidden';
    }

    // Even if forceVisible is enabled, scrollbar itself should be hidden
    if (this.options.forceVisible) {
      if (this.axis[axis].isEnabled) {
        scrollbar.style.visibility = 'visible';
      } else {
        scrollbar.style.visibility = 'hidden';
      }
    }
  }

  hideNativeScrollbar() {
    this.scrollerEl.style[this.isRtl ? 'left' : 'right'] = `-${this.scrollbarWidth || this.offsetSize}px`;
    this.scrollerEl.style.bottom = `-${this.scrollbarWidth || this.offsetSize}px`;
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

  onMouseEnter = () => {
    this.showScrollbar('x');
    this.showScrollbar('y');
  }

  onMouseMove = (e) => {
    const bboxY = this.axis.y.track.rect;
    const bboxX = this.axis.x.track.rect;

    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    if (this.isWithinBounds(bboxY)) {
      this.showScrollbar('y');
    }

    if (this.isWithinBounds(bboxX)) {
      this.showScrollbar('x');
    }
  }

  onWindowResize = () => {
    // Recalculate scrollbarWidth in case it's a zoom
    this.scrollbarWidth = scrollbarWidth();

    this.hideNativeScrollbar();
  }

  /**
   * Show scrollbar
   */
  showScrollbar(axis = 'y') {
    let scrollbar = this.axis[axis].scrollbar.el;

    // Scrollbar already visible
    if (this.axis[axis].isVisible) {
      return;
    }

    if (this.axis[axis].isEnabled) {
      scrollbar.classList.add('visible');
      this.axis[axis].isVisible = true;
    }

    if (!this.options.autoHide) {
      return;
    }

    // window.clearInterval(this.flashTimeout);
    // this.flashTimeout = window.setInterval(this.hideScrollbars, this.options.timeout);
  }

  /**
   * Hide Scrollbar
   */
  hideScrollbars = () => {
    const bboxY = this.axis.y.track.rect;
    const bboxX = this.axis.x.track.rect;

    if (!this.isWithinBounds(bboxY)) {
      this.axis.y.scrollbar.el.classList.remove('visible');
      this.axis.y.isVisible = false;
    }

    if (!this.isWithinBounds(bboxX)) {
      this.axis.x.scrollbar.el.classList.remove('visible');
      this.axis.x.isVisible = false;
    }
  }

  onMouseDown = (e) => {
    const bboxY = this.axis.y.track.rect;
    const bboxX = this.axis.x.track.rect;

    if (this.isWithinBounds(bboxY)) {
      this.onDragStart(e, 'y');
    }

    if (this.isWithinBounds(bboxX)) {
      this.onDragStart(e, 'x');
    }
  }

  /**
   * on scrollbar handle drag movement starts
   */
  onDragStart(e, axis = 'y') {
    // Preventing the event's default action stops text being
    // selectable during the drag.
    e.preventDefault();
    // Prevent event leaking
    e.stopPropagation();

    const scrollbar = this.axis[axis].scrollbar.el;

    // Measure how far the user's mouse is from the top of the scrollbar drag handle.
    const eventOffset = axis === 'y' ? e.pageY : e.pageX;

    this.axis[axis].dragOffset =
      eventOffset - scrollbar.getBoundingClientRect()[this.axis[axis].offsetAttr];
    this.draggedAxis = axis;

    document.addEventListener('mousemove', this.drag);
    document.addEventListener('mouseup', this.onEndDrag);
  }

  /**
   * Drag scrollbar handle
   */
  drag = (e) => {
    let eventOffset, track;

    e.preventDefault();

    track = this.axis[this.draggedAxis].track;

    if (this.currentAxis === 'y') {
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
    let dragPerc = dragPos / track.rect.width;

    // Scroll the content by the same percentage.
    let scrollPos =
      dragPerc * this.contentEl[this.axis[this.draggedAxis].scrollSizeAttr];

    this.scrollerEl[this.axis[this.draggedAxis].scrollOffsetAttr] = scrollPos;
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

    this.contentEl.removeEventListener('scroll', this.onScroll);

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

  /**
   * Check if mouse is within bounds
   */
  isWithinBounds(bbox) {
    return this.mouseX >= bbox.left && this.mouseX <= bbox.left + bbox.width && this.mouseY >= bbox.top && this.mouseY <= bbox.top + bbox.height;
  }
}

/**
 * HTML API
 * Called only in a browser env.
 */
if (canUseDOM) {
  SimpleBar.initHtmlApi();
}
