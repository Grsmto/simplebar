let cachedScrollbarWidth = null;
let cachedDevicePixelRatio = null;

window.addEventListener('resize', () => {
  if (cachedDevicePixelRatio !== window.devicePixelRatio) {
    cachedDevicePixelRatio = window.devicePixelRatio;
    cachedScrollbarWidth = null;
  }
});

export default function scrollbarWidth() {
  if (cachedScrollbarWidth == null) {
    if (typeof document === 'undefined') {
      cachedScrollbarWidth = 0;
      return cachedScrollbarWidth;
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

    cachedScrollbarWidth = width;
  }
  return cachedScrollbarWidth;
}
