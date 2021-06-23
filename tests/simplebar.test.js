import SimpleBar from '../src';

const mutationMock = [
  {
    removedNodes: [
      {
        nodeType: 1
      }
    ]
  }
];

beforeEach(() => {
  jest.resetModules();

  // Set up our document body
  document.body.innerHTML =
    '<div id="simplebar" data-simplebar-auto-hide="true"></div>';
});

test('should call constructor', () => {
  const SimpleBar = require('../src/simplebar').default;
  jest.mock('../src/simplebar');

  new SimpleBar(document.getElementById('simplebar'));

  expect(SimpleBar).toHaveBeenCalledTimes(1);
});

test('should return the content element', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));
  const contentElement = simpleBar.getContentElement();

  expect(contentElement).toBe(simpleBar.contentEl);
});

test('should return the scroll element', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));
  const scrollElement = simpleBar.getScrollElement();

  expect(scrollElement).toBe(simpleBar.contentWrapperEl);
});

test('should unmount SimpleBar', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  simpleBar.unMount();

  expect(SimpleBar.instances.get(simpleBar.el)).toBeUndefined();
});

test('should return the element options', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  expect(SimpleBar.getOptions(simpleBar.el.attributes)).toEqual({
    autoHide: true
  });
});

test('mouse should be within bounds', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  simpleBar.mouseX = 20;
  simpleBar.mouseY = 20;

  const isWithinBounds = simpleBar.isWithinBounds({
    bottom: 110,
    height: 100,
    left: 10,
    right: 110,
    top: 10,
    width: 100,
    x: 10,
    y: 10
  });

  expect(isWithinBounds).toBeTruthy();
});

test('onPointerEvent listener should be unsubscribed on unmount', () => {
  const element = document.getElementById('simplebar');
  const init = SimpleBar.prototype.init;

  SimpleBar.prototype.init = () => {};

  const simpleBar = new SimpleBar(element);

  simpleBar.init = init;

  jest.spyOn(simpleBar, 'onPointerEvent');

  simpleBar.init();

  simpleBar.unMount();

  element.dispatchEvent(new MouseEvent('mousedown'));

  expect(simpleBar.onPointerEvent).not.toHaveBeenCalled();
});

test('unmount on node removed from DOM', () => {
  const simpleBar = new SimpleBar(document.getElementById('simplebar'));

  SimpleBar.handleMutations([
    {
      addedNodes: [],
      removedNodes: [simpleBar.el]
    }
  ]);

  expect(SimpleBar.instances.get(simpleBar.el)).toBeUndefined();
});

describe('nested SimpleBars with initiated DOM', () => {
  let parent;
  let child;

  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML =
      '<div id="simplebar-parent"><div id="simplebar-child"></div></div>';

    parent = new SimpleBar(document.getElementById('simplebar-parent'));
    child = new SimpleBar(document.getElementById('simplebar-child'));

    parent.initDOM(); // trigger DOM selectors
  });

  test('should select correct wrapper element', () => {
    expect(parent.wrapperEl).not.toBe(child.wrapperEl);
  });

  test('should select correct content wrapper element', () => {
    expect(parent.contentWrapperEl).not.toBe(child.contentWrapperEl);
  });

  test('should select correct content element', () => {
    expect(parent.contentEl).not.toBe(child.contentEl);
  });

  test('should select correct offset element', () => {
    expect(parent.offsetEl).not.toBe(child.offsetEl);
  });

  test('should select correct mask element', () => {
    expect(parent.maskEl).not.toBe(child.maskEl);
  });

  test('should select correct placeholder element', () => {
    expect(parent.placeholderEl).not.toBe(child.placeholderEl);
  });

  test('should select correct height auto observer wrapper element', () => {
    expect(parent.heightAutoObserverWrapperEl).not.toBe(
      child.heightAutoObserverWrapperEl
    );
  });

  test('should select correct height auto observer element', () => {
    expect(parent.heightAutoObserverEl).not.toBe(child.heightAutoObserverEl);
  });

  test('should select correct x track element', () => {
    expect(parent.axis.x.track.el).not.toBe(child.axis.x.track.el);
  });

  test('should select correct y track element', () => {
    expect(parent.axis.y.track.el).not.toBe(child.axis.y.track.el);
  });
});
