(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.scrollbarWidth = mod.exports;
    }
})(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /**
     * Calculate scrollbar width
     *
     * Called only once as a constant variable: we assume that scrollbar width never change
     *
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     */
    function getScrollbarWidth() {
        // Append a temporary scrolling element to the DOM, then measure
        // the difference between its outer and inner elements.
        var tempEl = document.implementation.createHTMLDocument(),
            width = 0,
            widthMinusScrollbars = 0;

        tempEl.body.innerHTML = '<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>';
        tempEl = tempEl.body.children;

        document.querySelectorAll('body').appendChild(tempEl);

        width = tempEl.offsetWidth;
        widthMinusScrollbars = document.querySelectorAll('div', tempEl).offsetWidth;

        tempEl.parentNode.removeChild(tempEl);

        return width - widthMinusScrollbars;
    }

    var scrollbarWidth = exports.scrollbarWidth = getScrollbarWidth();
});
//# sourceMappingURL=scrollbar-width.js.map
