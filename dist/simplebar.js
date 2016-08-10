/*
 *  SimpleBar.js - v1.1.9
 *  Scrollbars, simpler.
 *  https://grsmto.github.io/simplebar/
 *
 *  Made by Adrien Grsmto from a fork by Jonathan Nicol
 *  Under MIT License
 */
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
        tempEl = tempEl.body.children[0];

        document.querySelector('body').appendChild(tempEl);

        width = tempEl.offsetWidth;
        widthMinusScrollbars = document.querySelectorAll('div', tempEl).offsetWidth;

        tempEl.parentNode.removeChild(tempEl);

        return width - widthMinusScrollbars;
    }

    var scrollbarWidth = exports.scrollbarWidth = getScrollbarWidth();
});

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './scrollbar-width'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./scrollbar-width'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.scrollbarWidth);
        global.SimpleBar = mod.exports;
    }
})(this, function (module, exports, _scrollbarWidth) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var IS_WEBKIT = 'WebkitAppearance' in document.documentElement.style;

    var hasClass = function hasClass(el, className) {
        if (el.classList) return el.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    };

    var SimpleBar = function () {
        function SimpleBar(element, options) {
            _classCallCheck(this, SimpleBar);

            this.el = document.querySelector(element);
            this.track;
            this.scrollbar;
            this.dragOffset;
            this.flashTimeout;
            this.contentEl = this.el;
            this.scrollContentEl = this.el;
            this.scrollDirection = 'vert';
            this.scrollOffsetAttr = 'scrollTop';
            this.sizeAttr = 'offsetHeight';
            this.scrollSizeAttr = 'scrollHeight';
            this.offsetAttr = 'top';

            var DEFAULTS = {
                wrapContent: true,
                autoHide: true,
                css: {
                    container: 'simplebar',
                    content: 'simplebar-content',
                    scrollContent: 'simplebar-scroll-content',
                    scrollbar: 'simplebar-scrollbar',
                    scrollbarTrack: 'simplebar-track'
                }
            };

            this.options = Object.assign({}, DEFAULTS, options);
            this.theme = this.options.css;

            this.flashScrollbar = this.flashScrollbar.bind(this);
            this.startScroll = this.startScroll.bind(this);
            this.startDrag = this.startDrag.bind(this);
            this.drag = this.drag.bind(this);
            this.endDrag = this.endDrag.bind(this);

            this.init();
        }

        _createClass(SimpleBar, [{
            key: 'init',
            value: function init() {
                // If scrollbar is a floating scrollbar, disable the plugin
                if (_scrollbarWidth.scrollbarWidth === 0) {
                    this.el.style.overflow = 'auto';

                    return;
                }

                if (hasClass(this.el, this.theme.container) && hasClass(this.el, 'horizontal')) {
                    this.scrollDirection = 'horiz';
                    this.scrollOffsetAttr = 'scrollLeft';
                    this.sizeAttr = 'offsetWidth';
                    this.scrollSizeAttr = 'scrollWidth';
                    this.offsetAttr = 'left';
                }

                if (this.options.wrapContent) {
                    var wrapperScrollContent = document.createElement('div');
                    var wrapperContent = document.createElement('div');

                    wrapperScrollContent.classList.add(this.theme.scrollContent);
                    wrapperContent.classList.add(this.theme.content);

                    while (this.el.firstChild) {
                        wrapperContent.appendChild(this.el.firstChild);
                    }wrapperScrollContent.appendChild(wrapperContent);
                    this.el.appendChild(wrapperScrollContent);
                }

                this.contentEl = this.el.querySelector('.' + this.theme.content);

                var scrollbarTrack = document.createElement('div');
                var scrollbar = document.createElement('div');

                scrollbarTrack.classList.add(this.theme.scrollbarTrack);
                scrollbar.classList.add(this.theme.scrollbar);

                this.el.insertBefore(scrollbarTrack, this.el.firstChild);
                scrollbarTrack.appendChild(scrollbar);

                this.track = this.el.querySelector('.' + this.theme.scrollbarTrack);
                this.scrollbar = this.el.querySelector('.' + this.theme.scrollbar);
                this.scrollContentEl = this.el.querySelector('.' + this.theme.scrollContent);

                this.resizeScrollContent();

                if (this.options.autoHide) {
                    this.el.addEventListener('mouseenter', this.flashScrollbar);
                }

                this.scrollbar.addEventListener('mousedown', this.startDrag);
                this.scrollContentEl.addEventListener('scroll', this.startScroll);

                this.resizeScrollbar();

                if (!this.options.autoHide) {
                    this.showScrollbar();
                }
            }
        }, {
            key: 'startDrag',
            value: function startDrag(e) {
                // Preventing the event's default action stops text being
                // selectable during the drag.
                e.preventDefault();

                // Measure how far the user's mouse is from the top of the scrollbar drag handle.
                var eventOffset = e.pageY;

                if (this.scrollDirection === 'horiz') {
                    eventOffset = e.pageX;
                }

                this.dragOffset = eventOffset - this.scrollbar.getBoundingClientRect()[this.offsetAttr];

                document.addEventListener('mousemove', this.drag);
                document.addEventListener('mouseup', this.endDrag);
            }
        }, {
            key: 'drag',
            value: function drag(e) {
                e.preventDefault();

                // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
                var eventOffset = e.pageY,
                    dragPos = null,
                    dragPerc = null,
                    scrollPos = null;

                if (this.scrollDirection === 'horiz') {
                    eventOffset = e.pageX;
                }

                dragPos = eventOffset - this.track.getBoundingClientRect()[this.offsetAttr] - this.dragOffset;
                // Convert the mouse position into a percentage of the scrollbar height/width.
                dragPerc = dragPos / this.track[this.sizeAttr];
                // Scroll the content by the same percentage.
                scrollPos = dragPerc * this.contentEl[this.scrollSizeAttr];

                this.scrollContentEl[this.scrollOffsetAttr] = scrollPos;
            }
        }, {
            key: 'endDrag',
            value: function endDrag() {
                document.removeEventListener('mousemove', this.drag);
                document.removeEventListener('mouseup', this.endDrag);
            }
        }, {
            key: 'resizeScrollbar',
            value: function resizeScrollbar() {
                if (_scrollbarWidth.scrollbarWidth === 0) {
                    return;
                }

                var contentSize = this.contentEl[this.scrollSizeAttr],
                    scrollOffset = this.scrollContentEl[this.scrollOffsetAttr],
                    // Either scrollTop() or scrollLeft().
                scrollbarSize = this.track[this.sizeAttr],
                    scrollbarRatio = scrollbarSize / contentSize,

                // Calculate new height/position of drag handle.
                // Offset of 2px allows for a small top/bottom or left/right margin around handle.
                handleOffset = Math.round(scrollbarRatio * scrollOffset) + 2,
                    handleSize = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;

                if (scrollbarSize < contentSize) {
                    if (this.scrollDirection === 'vert') {
                        this.scrollbar.style.top = handleOffset + 'px';
                        this.scrollbar.style.height = handleSize + 'px';
                    } else {
                        this.scrollbar.style.left = handleOffset + 'px';
                        this.scrollbar.style.width = handleSize + 'px';
                    }
                    this.track.style.display = '';
                } else {
                    this.track.style.display = 'none';
                }
            }
        }, {
            key: 'startScroll',
            value: function startScroll() {
                // Simulate event bubbling to root element
                // this.el.dispatchEvent(e)

                this.flashScrollbar();
            }
        }, {
            key: 'flashScrollbar',
            value: function flashScrollbar() {
                this.resizeScrollbar();
                this.showScrollbar();
            }
        }, {
            key: 'showScrollbar',
            value: function showScrollbar() {
                this.scrollbar.classList.add('visible');

                if (!this.options.autoHide) {
                    return;
                }
                if (typeof this.flashTimeout === 'number') {
                    window.clearTimeout(this.flashTimeout);
                }

                this.flashTimeout = window.setTimeout(this.hideScrollbar.bind(this), 1000);
            }
        }, {
            key: 'hideScrollbar',
            value: function hideScrollbar() {
                this.scrollbar.classList.remove('visible');
                if (typeof this.flashTimeout === 'number') {
                    window.clearTimeout(this.flashTimeout);
                }
            }
        }, {
            key: 'resizeScrollContent',
            value: function resizeScrollContent() {
                if (IS_WEBKIT) {
                    return;
                }

                if (this.scrollDirection === 'vert') {
                    this.scrollContentEl.style.width = this.el.outerWidth() + _scrollbarWidth.scrollbarWidth + 'px';
                    this.scrollContentEl.style.height = this.el.outerHeight() + 'px';
                } else {
                    this.scrollContentEl.style.width = this.el.outerWidth() + 'px';
                    this.scrollContentEl.style.height = this.el.outerHeight() + _scrollbarWidth.scrollbarWidth + 'px';
                }
            }
        }, {
            key: 'recalculate',
            value: function recalculate() {
                this.resizeScrollContent();
                this.resizeScrollbar();
            }
        }, {
            key: 'getScrollElement',
            value: function getScrollElement() {
                return this.scrollContentEl;
            }
        }, {
            key: 'getContentElement',
            value: function getContentElement() {
                return this.contentEl;
            }
        }]);

        return SimpleBar;
    }();

    exports.default = SimpleBar;
    module.exports = exports['default'];
});
