import type { ClassNames, SimpleBarOptions } from './index';

export function getElementWindow(element: Element): Window & typeof globalThis {
  if (
    !element ||
    !element.ownerDocument ||
    !element.ownerDocument.defaultView
  ) {
    return window;
  }
  return element.ownerDocument.defaultView;
}

export function getElementDocument(element: Element): Document {
  if (!element || !element.ownerDocument) {
    return document;
  }
  return element.ownerDocument;
}

/**
 * Get the offset of an element relative to the document
 * @param el Element to get offset for
 */
export function getOffset(el: Element): { top: number; left: number } {
  const rect = el.getBoundingClientRect();
  const elDocument = getElementDocument(el);
  const elWindow = getElementWindow(el);

  return {
    top:
      rect.top + (elWindow.pageYOffset || elDocument.documentElement.scrollTop),
    left:
      rect.left +
      (elWindow.pageXOffset || elDocument.documentElement.scrollLeft),
  };
}

// Helper function to retrieve options from element attributes
export function getOptions(obj: any): SimpleBarOptions {
  const initialObj: SimpleBarOptions = {};

  const options = Array.prototype.reduce.call(
    obj,
    (acc: any, attribute) => {
      const option = attribute.name.match(/data-simplebar-(.+)/);
      if (option) {
        const key: keyof SimpleBarOptions = option[1].replace(
          /\W+(.)/g,
          (_: any, chr: string) => chr.toUpperCase()
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
  return options as SimpleBarOptions;
}

export function addClasses(el: HTMLElement | null, classes: string): void {
  if (!el) return;
  el.classList.add(...classes.split(' '));
}

export function removeClasses(el: HTMLElement | null, classes: string): void {
  if (!el) return;
  classes.split(' ').forEach((className) => {
    el.classList.remove(className);
  });
}

export function classNamesToQuery(classNames: string): string {
  return `.${classNames.split(' ').map(escapeForQuerySelector).join('.')}`;
}

export function escapeForQuerySelector(str: string): string {
  return str.replace(/([!\"#$%&'()*+,.\/:;<=>?@\[\\\]^`{|}~])/g, '\\$1');
}

export function mergeClassNames(
  defaultClassNames: ClassNames,
  customClassNames: SimpleBarOptions['classNames']
): ClassNames {
  const mergedClassNames = { ...defaultClassNames };

  if (!customClassNames) return defaultClassNames;

  for (const _key in defaultClassNames) {
    const key = _key as keyof SimpleBarOptions['classNames'];
    if (
      !customClassNames[key] ||
      defaultClassNames[key] === customClassNames[key]
    )
      continue;
    mergedClassNames[
      key as keyof ClassNames
    ] = `${defaultClassNames[key]} ${customClassNames[key]}`;
  }

  return mergedClassNames;
}
