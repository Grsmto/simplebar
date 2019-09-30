import canUseDOM from 'can-use-dom';

import SimpleBar from './simplebar';

// Helper function to retrieve options from element attributes
SimpleBar.getElOptions = function(el) {
  const options = Array.prototype.reduce.call(
    el.attributes,
    (acc, attribute) => {
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
    },
    {}
  );
  return options;
};

SimpleBar.initDOMLoadedElements = function() {
  document.removeEventListener('DOMContentLoaded', this.initDOMLoadedElements);
  window.removeEventListener('load', this.initDOMLoadedElements);

  Array.prototype.forEach.call(
    document.querySelectorAll('[data-simplebar]:not([data-simplebar="init"])'),
    el => {
      if (!SimpleBar.instances.has(el))
        new SimpleBar(el, SimpleBar.getElOptions(el));
    }
  );
};

SimpleBar.removeObserver = function() {
  this.globalObserver.disconnect();
};

SimpleBar.initHtmlApi = function() {
  this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);

  // MutationObserver is IE11+
  if (typeof MutationObserver !== 'undefined') {
    // Mutation observer to observe dynamically added elements
    this.globalObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        Array.prototype.forEach.call(mutation.addedNodes, addedNode => {
          if (addedNode.nodeType === 1) {
            if (addedNode.hasAttribute('data-simplebar')) {
              !SimpleBar.instances.has(addedNode) &&
                new SimpleBar(addedNode, SimpleBar.getElOptions(addedNode));
            } else {
              Array.prototype.forEach.call(
                addedNode.querySelectorAll(
                  '[data-simplebar]:not([data-simplebar="init"])'
                ),
                el => {
                  !SimpleBar.instances.has(el) &&
                    new SimpleBar(el, SimpleBar.getElOptions(el));
                }
              );
            }
          }
        });

        Array.prototype.forEach.call(mutation.removedNodes, removedNode => {
          if (removedNode.nodeType === 1) {
            if (
              removedNode.hasAttribute(
                '[data-simplebar]:not([data-simplebar="init"])'
              )
            ) {
              SimpleBar.instances.has(removedNode) &&
                SimpleBar.instances.get(removedNode).unMount();
            } else {
              Array.prototype.forEach.call(
                removedNode.querySelectorAll(
                  '[data-simplebar]:not([data-simplebar="init"])'
                ),
                el => {
                  SimpleBar.instances.has(el) &&
                    SimpleBar.instances.get(el).unMount();
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
};

/**
 * HTML API
 * Called only in a browser env.
 */
if (canUseDOM) {
  SimpleBar.initHtmlApi();
}

export default SimpleBar;
