export function getElementWindow(element) {
  if (
    !element ||
    !element.ownerDocument ||
    !element.ownerDocument.defaultView
  ) {
    return window;
  }
  return element.ownerDocument.defaultView;
}

export function getElementDocument(element) {
  if (!element || !element.ownerDocument) {
    return document;
  }
  return element.ownerDocument;
}
