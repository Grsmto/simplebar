import SimpleBar from '../src';

const template = `<div class="simplebar-wrapper">
<div class="simplebar-height-auto-observer-wrapper">
  <div class="simplebar-height-auto-observer"></div>
</div>
<div class="simplebar-mask">
  <div class="simplebar-offset">
    <div class="simplebar-content-wrapper custom-class" tabIndex="0" role="region" [ariaLabel]="ariaLabel">
      <div class="simplebar-content"></div>
    </div>
  </div>
</div>
<div class="simplebar-placeholder"></div>
</div>
<div class="simplebar-track simplebar-horizontal">
<div class="simplebar-scrollbar"></div>
</div>
<div class="simplebar-track simplebar-vertical">
<div class="simplebar-scrollbar"></div>
</div>`;

beforeEach(() => {
  jest.resetModules();

  // Set up our document body
  document.body.innerHTML = `<div id="simplebar" data-simplebar="init" data-simplebar-force-visible="true">${template}</div>`;
});

test('should call constructor', () => {
  const SimpleBar = require('../src/index').default;
  jest.mock('../src/index');

  new SimpleBar(document.getElementById('simplebar'));

  expect(SimpleBar).toHaveBeenCalledTimes(1);
});

test('should return the content element', () => {
  const simpleBar = new SimpleBar(
    document.getElementById('simplebar') as HTMLElement
  );
  const contentElement = simpleBar.getContentElement();

  expect(contentElement).toBe(simpleBar.contentEl);
});

test('should return the scroll element', () => {
  const simpleBar = new SimpleBar(
    document.getElementById('simplebar') as HTMLElement
  );
  const scrollElement = simpleBar.getScrollElement();

  expect(scrollElement).toBe(simpleBar.contentWrapperEl);
});

test('should unmount SimpleBar', () => {
  const simpleBar = new SimpleBar(
    document.getElementById('simplebar') as HTMLElement
  );
  const mock = jest.spyOn(simpleBar.mutationObserver as any, 'disconnect');

  simpleBar.unMount();

  expect(mock).toHaveBeenCalled();
});

test('should return the element options', () => {
  const simpleBar = new SimpleBar(
    document.getElementById('simplebar') as HTMLElement
  );

  expect(SimpleBar.getOptions(simpleBar.el.attributes)).toEqual({
    forceVisible: true,
  });
});

test('getOptions accepts objects', () => {
  expect(
    SimpleBar.getOptions([
      {
        name: 'data-simplebar-class-names',
        value: {
          wrapper: 'custom-class',
        },
      },
    ])
  ).toEqual({ classNames: { wrapper: 'custom-class' } });
});

test('classNames option works with multiple classes', () => {
  const simpleBar = new SimpleBar(
    document.getElementById('simplebar') as HTMLElement,
    { classNames: { contentWrapper: 'simplebar-content-wrapper custom-class' } }
  );
  const scrollElement = simpleBar.getScrollElement();

  expect(scrollElement?.className).toEqual(
    'simplebar-content-wrapper custom-class'
  );
});

test('mouse should be within bounds', () => {
  const simpleBar = new SimpleBar(
    document.getElementById('simplebar') as HTMLElement
  );

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
    y: 10,
  } as DOMRect);

  expect(isWithinBounds).toBeTruthy();
});

for (const axis of ['x', 'y'] as const) {
  test(`positions and drags the ${axis} handle using the scroll viewport`, () => {
    const host = document.getElementById('simplebar') as HTMLElement;
    host.style.width = '300px';
    host.style.height = '300px';
    const simpleBar = new SimpleBar(host);
    const props = simpleBar.axis[axis];
    const scrollElement = simpleBar.getScrollElement() as HTMLElement;
    const track = props.track.el as HTMLElement;
    const handle = props.scrollbar.el as HTMLElement;

    Object.defineProperty(scrollElement, props.scrollSizeAttr, { value: 1220 });
    Object.defineProperty(
      scrollElement,
      axis === 'x' ? 'clientWidth' : 'clientHeight',
      { value: 340 }
    );
    Object.defineProperty(track, props.offsetSizeAttr, { value: 340 });
    props.isOverflowing = true;
    props.scrollbar.size = 70;
    simpleBar.elStyles = getComputedStyle(host);
    scrollElement[props.scrollOffsetAttr] = 880;

    simpleBar.positionScrollbar(axis);
    expect(handle.style.transform).toBe(
      axis === 'x' ? 'translate3d(270px, 0, 0)' : 'translate3d(0, 270px, 0)'
    );

    props.track.rect = { left: 0, top: 0, width: 340, height: 340 } as DOMRect;
    props.dragOffset = 0;
    simpleBar.draggedAxis = axis;
    scrollElement[props.scrollOffsetAttr] = 0;
    simpleBar.drag({
      pageX: 270,
      pageY: 270,
      preventDefault() {},
      stopPropagation() {},
    });
    expect(scrollElement[props.scrollOffsetAttr]).toBe(880);

    scrollElement[props.scrollOffsetAttr] = 0;
    simpleBar.mouseX = 339;
    simpleBar.mouseY = 339;
    const frame = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback) => {
        callback(0);
        return 0;
      });
    simpleBar.onTrackClick({ preventDefault() {} }, axis);
    expect(scrollElement[props.scrollOffsetAttr]).toBe(360);
    frame.mockRestore();
    simpleBar.unMount();
  });
}

test('onPointerEvent listener should be unsubscribed on unmount', () => {
  const element = document.getElementById('simplebar');
  const init = SimpleBar.prototype.init;

  if (!element) return;

  SimpleBar.prototype.init = () => {};

  const simpleBar = new SimpleBar(element);

  simpleBar.init = init;

  jest.spyOn(simpleBar, 'onPointerEvent');

  simpleBar.init();

  simpleBar.unMount();

  element.dispatchEvent(new MouseEvent('mousedown'));

  expect(simpleBar.onPointerEvent).not.toHaveBeenCalled();
});

describe('nested SimpleBars with initiated DOM', () => {
  let parent: SimpleBar;
  let child: SimpleBar;

  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `<div id="simplebar-parent">${template}<div id="simplebar-child">${template}</div></div>`;

    parent = new SimpleBar(
      document.getElementById('simplebar-parent') as HTMLElement
    );
    child = new SimpleBar(
      document.getElementById('simplebar-child') as HTMLElement
    );

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
