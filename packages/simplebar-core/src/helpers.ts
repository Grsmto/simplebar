import { Options } from './SimpleBar';

export function getElementWindow(element: Element) {
  if (
    !element ||
    !element.ownerDocument ||
    !element.ownerDocument.defaultView
  ) {
    return window;
  }
  return element.ownerDocument.defaultView;
}

export function getElementDocument(element: Element) {
  if (!element || !element.ownerDocument) {
    return document;
  }
  return element.ownerDocument;
}

// Helper function to retrieve options from element attributes
export const getOptions = function (obj: any) {
  const initialObj: Partial<Options> = {};

  const options = Array.prototype.reduce.call(
    obj,
    (acc: any, attribute) => {
      const option = attribute.name.match(/data-simplebar-(.+)/);
      if (option) {
        const key: keyof Options = option[1].replace(
          /\W+(.)/g,
          (x: any, chr: string) => chr.toUpperCase()
        );

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
    initialObj
  );
  return options as Partial<Options>;
};
