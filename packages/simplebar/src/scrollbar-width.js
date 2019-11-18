import canUseDOM from 'can-use-dom';
import { getElementWindow, getElementDocument } from './helpers';

let cachedScrollbarWidth = null;
let cachedDevicePixelRatio = null;

if (canUseDOM) {
  window.addEventListener('resize', () => {
    if (cachedDevicePixelRatio !== window.devicePixelRatio) {
      cachedDevicePixelRatio = window.devicePixelRatio;
      cachedScrollbarWidth = null;
    }
  });
}

export default function scrollbarWidth(element) {
  const elementDocument = getElementDocument(element);
  if (cachedScrollbarWidth === null) {
    if (typeof elementDocument === 'undefined') {
      cachedScrollbarWidth = 0;
      return cachedScrollbarWidth;
    }

    const body = elementDocument.body;
    const box = elementDocument.createElement('div');

    box.classList.add('simplebar-hide-scrollbar');

    body.appendChild(box);

    const width = box.getBoundingClientRect().right;

    body.removeChild(box);

    cachedScrollbarWidth = width;
  }

  return cachedScrollbarWidth;
}
