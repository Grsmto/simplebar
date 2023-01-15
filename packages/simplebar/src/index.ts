import canUseDOM from 'can-use-dom';
import SimpleBarCore from 'simplebar-core';

const { getOptions } = SimpleBarCore;

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
