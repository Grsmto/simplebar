export default function scrollbarWidth() {
  if (typeof document === 'undefined') {
    return 0;
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

  return width;
}
