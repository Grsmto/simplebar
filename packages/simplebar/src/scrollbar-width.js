let scrollbarWidth = null;
let devicePixelRatio = null;

window.addEventListener('resize', () => {
  if (devicePixelRatio !== window.devicePixelRatio) {
    devicePixelRatio = window.devicePixelRatio;
    scrollbarWidth = null;
  }
});

export default function scrollbarWidth() {
  if (scrollbarWidth == null) {
    if (typeof document === 'undefined') {
      scrollbarWidth = 0;
      return scrollbarWidth;
    }

    const body = document.body;
    const box = document.createElement('div');
    const boxStyle = box.style;

    boxStyle.position = 'fixed';
    boxStyle.left = 0;
    boxStyle.visibility = 'hidden';
    boxStyle.overflowY = 'scroll';

    body.appendChild(box);

    const width = box.getBoundingClientRect().right;

    body.removeChild(box);

    scrollbarWidth = width;
  }
  return scrollbarWidth;
}
