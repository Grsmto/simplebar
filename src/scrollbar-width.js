/**
 * Calculate scrollbar width
 *
 * Called only once as a constant variable: we assume that scrollbar width never change
 *
 * Original function by Jonathan Sharp:
 * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
 */
export function getScrollbarWidth() {
    // Append a temporary scrolling element to the DOM, then measure
    // the difference between its outer and inner elements.
    let tempEl  = document.implementation.createHTMLDocument(),
        width   = 0,
        widthMinusScrollbars = 0

    tempEl.body.innerHTML = '<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>'
    tempEl = tempEl.body.children

    document.querySelectorAll('body').appendChild(tempEl)

    width = tempEl.offsetWidth
    widthMinusScrollbars = document.querySelectorAll('div', tempEl).offsetWidth

    tempEl.parentNode.removeChild(tempEl)

    return (width - widthMinusScrollbars)
}

export const scrollbarWidth = getScrollbarWidth()