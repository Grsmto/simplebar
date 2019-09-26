let cachedScrollbarWidth = null;
let cachedDevicePixelRatio = null;

window.addEventListener('resize', () => {
  if (cachedDevicePixelRatio !== window.devicePixelRatio) {
    cachedDevicePixelRatio = window.devicePixelRatio;
    cachedScrollbarWidth = null;
  }
});

export default function scrollbarWidth() {
  if (cachedScrollbarWidth === null) {
    if (
      typeof document === 'undefined' ||
      /AppleWebKit/.test(navigator.userAgent) ||
      'scrollbarWidth' in document.documentElement.style
    ) {
      cachedScrollbarWidth = 0;
      return cachedScrollbarWidth;
    }

    const body = document.body;
    const box = document.createElement('div');

    box.classList.add('simplebar-hide-scrollbar');

    body.appendChild(box);

    const width = box.getBoundingClientRect().right;

    body.removeChild(box);

    cachedScrollbarWidth = width;
  }

  return cachedScrollbarWidth;
}
