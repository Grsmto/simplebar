import canUseDOM from 'can-use-dom';
import SimpleBarCore from 'simplebar-core';

const { getOptions, addClasses } = SimpleBarCore.helpers;

export default class SimpleBar extends SimpleBarCore {
  static globalObserver: MutationObserver;

  static instances = new WeakMap();

  constructor(...args: ConstructorParameters<typeof SimpleBarCore>) {
    super(...args);

    // // Save a reference to the instance, so we know this DOM node has already been instancied
    SimpleBar.instances.set(args[0], this);
  }

  static initDOMLoadedElements() {
    document.removeEventListener(
      'DOMContentLoaded',
      this.initDOMLoadedElements
    );
    window.removeEventListener('load', this.initDOMLoadedElements);

    Array.prototype.forEach.call(
      document.querySelectorAll('[data-simplebar]'),
      (el) => {
        if (
          el.getAttribute('data-simplebar') !== 'init' &&
          !SimpleBar.instances.has(el)
        )
          new SimpleBar(el, getOptions(el.attributes));
      }
    );
  }

  static removeObserver() {
    SimpleBar.globalObserver?.disconnect();
  }

  initDOM() {
    // make sure this element doesn't have the elements yet
    if (
      !Array.prototype.filter.call(this.el.children, (child) =>
        child.classList.contains(this.classNames.wrapper)
      ).length
    ) {
      // Prepare DOM
      this.wrapperEl = document.createElement('div');
      this.contentWrapperEl = document.createElement('div');
      this.offsetEl = document.createElement('div');
      this.maskEl = document.createElement('div');
      this.contentEl = document.createElement('div');
      this.placeholderEl = document.createElement('div');
      this.heightAutoObserverWrapperEl = document.createElement('div');
      this.heightAutoObserverEl = document.createElement('div');
      addClasses(this.wrapperEl, this.classNames.wrapper);
      addClasses(this.contentWrapperEl, this.classNames.contentWrapper);
      addClasses(this.offsetEl, this.classNames.offset);
      addClasses(this.maskEl, this.classNames.mask);
      addClasses(this.contentEl, this.classNames.contentEl);
      addClasses(this.placeholderEl, this.classNames.placeholder);
      addClasses(
        this.heightAutoObserverWrapperEl,
        this.classNames.heightAutoObserverWrapperEl
      );
      addClasses(
        this.heightAutoObserverEl,
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

      this.contentWrapperEl?.setAttribute('tabindex', '0');
      this.contentWrapperEl?.setAttribute('role', 'region');
      this.contentWrapperEl?.setAttribute('aria-label', this.options.ariaLabel);
    }

    if (!this.axis.x.track.el || !this.axis.y.track.el) {
      const track = document.createElement('div');
      const scrollbar = document.createElement('div');

      addClasses(track, this.classNames.track);
      addClasses(scrollbar, this.classNames.scrollbar);

      track.appendChild(scrollbar);

      this.axis.x.track.el = track.cloneNode(true) as HTMLElement;
      addClasses(this.axis.x.track.el, this.classNames.horizontal);

      this.axis.y.track.el = track.cloneNode(true) as HTMLElement;
      addClasses(this.axis.y.track.el, this.classNames.vertical);

      this.el.appendChild(this.axis.x.track.el);
      this.el.appendChild(this.axis.y.track.el);
    }

    SimpleBarCore.prototype.initDOM.call(this);

    this.el.setAttribute('data-simplebar', 'init');
  }

  unMount() {
    SimpleBarCore.prototype.unMount.call(this);
    SimpleBar.instances.delete(this.el);
  }

  static initHtmlApi() {
    this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

    // MutationObserver is IE11+
    if (typeof MutationObserver !== 'undefined') {
      // Mutation observer to observe dynamically added elements
      this.globalObserver = new MutationObserver(SimpleBar.handleMutations);

      this.globalObserver.observe(document, { childList: true, subtree: true });
    }

    // Taken from jQuery `ready` function
    // Instantiate elements already present on the page
    if (
      document.readyState === 'complete' || // @ts-ignore: IE specific
      (document.readyState !== 'loading' && !document.documentElement.doScroll)
    ) {
      // Handle it asynchronously to allow scripts the opportunity to delay init
      window.setTimeout(this.initDOMLoadedElements);
    } else {
      document.addEventListener('DOMContentLoaded', this.initDOMLoadedElements);
      window.addEventListener('load', this.initDOMLoadedElements);
    }
  }

  static handleMutations(mutations: MutationRecord[]) {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.nodeType === 1) {
          if ((addedNode as Element).hasAttribute('data-simplebar')) {
            !SimpleBar.instances.has(addedNode) &&
              document.documentElement.contains(addedNode) &&
              new SimpleBar(
                addedNode as HTMLElement,
                getOptions((addedNode as Element).attributes)
              );
          } else {
            (addedNode as Element)
              .querySelectorAll('[data-simplebar]')
              .forEach((el) => {
                if (
                  el.getAttribute('data-simplebar') !== 'init' &&
                  !SimpleBar.instances.has(el) &&
                  document.documentElement.contains(el)
                )
                  new SimpleBar(el as HTMLElement, getOptions(el.attributes));
              });
          }
        }
      });

      mutation.removedNodes.forEach((removedNode) => {
        if (removedNode.nodeType === 1) {
          if (
            (removedNode as Element).getAttribute('data-simplebar') === 'init'
          ) {
            SimpleBar.instances.has(removedNode) &&
              !document.documentElement.contains(removedNode) &&
              SimpleBar.instances.get(removedNode).unMount();
          } else {
            Array.prototype.forEach.call(
              (removedNode as Element).querySelectorAll(
                '[data-simplebar="init"]'
              ),
              (el) => {
                SimpleBar.instances.has(el) &&
                  !document.documentElement.contains(el) &&
                  SimpleBar.instances.get(el).unMount();
              }
            );
          }
        }
      });
    });
  }
}

/**
 * HTML API
 * Called only in a browser env.
 */
if (canUseDOM) {
  SimpleBar.initHtmlApi();
}
