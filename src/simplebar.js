;(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('jquery'), window, document);
    } else {
        factory(window.jQuery, window, document);
    }
}(function ( $, window, document, undefined ) {


    /**
     * Calculate scrollbar width
     *
     * Called only once as a constant variable: we assume that scrollbar width never change
     *
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     */
    var SCROLLBAR_WIDTH;

    function scrollbarWidth () {
        // Append a temporary scrolling element to the DOM, then measure
        // the difference between its outer and inner elements.
        var tempEl  = $('<div class="scrollbar-width-tester" style="width:50px;height:50px;overflow-y:scroll;top:-200px;left:-200px;"><div style="height:100px;"></div>'),
            width   = 0,
            widthMinusScrollbars = 0;

        $('body').append(tempEl);

        width = $(tempEl).innerWidth(),
        widthMinusScrollbars = $('div', tempEl).innerWidth();

        tempEl.remove();

        return (width - widthMinusScrollbars);
    }

    var IS_WEBKIT = 'WebkitAppearance' in document.documentElement.style;



    // SimpleBar Constructor
    function SimpleBar (element, options) {
        this.el = element,
        this.$el = $(element),
        this.$track,
        this.$scrollbar,
        this.dragOffset,
        this.flashTimeout,
        this.$contentEl         = this.$el,
        this.$scrollContentEl   = this.$el,
        this.scrollDirection    = 'vert',
        this.scrollOffsetAttr   = 'scrollTop',
        this.sizeAttr           = 'height',
        this.scrollSizeAttr     = 'scrollHeight',
        this.offsetAttr         = 'top';

        this.options = $.extend({}, SimpleBar.DEFAULTS, options);
        this.theme   = this.options.css;

        this.init();
    }

    SimpleBar.DEFAULTS = {
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

    SimpleBar.prototype.init = function () {
        // Measure scrollbar width
        if(typeof SCROLLBAR_WIDTH === 'undefined') {
            SCROLLBAR_WIDTH = scrollbarWidth();
        }

        // If scrollbar is a floating scrollbar, disable the plugin
        if(SCROLLBAR_WIDTH === 0) {
          this.$el.css('overflow', 'auto');

          return;
        }

        if (this.$el.data('simplebar-direction') === 'horizontal' || this.$el.hasClass(this.theme.container + ' horizontal')){
            this.scrollDirection    = 'horiz';
            this.scrollOffsetAttr   = 'scrollLeft';
            this.sizeAttr           = 'width';
            this.scrollSizeAttr     = 'scrollWidth';
            this.offsetAttr         = 'left';
        }

        if (this.options.wrapContent) {
            this.$el.wrapInner('<div class="' + this.theme.scrollContent + '"><div class="' + this.theme.content + '"></div></div>');
        }

        this.$contentEl = this.$el.find('.' + this.theme.content);

        this.$el.prepend('<div class="' + this.theme.scrollbarTrack + '"><div class="' + this.theme.scrollbar + '"></div></div>');
        this.$track = this.$el.find('.' + this.theme.scrollbarTrack);
        this.$scrollbar = this.$el.find('.' + this.theme.scrollbar);

        this.$scrollContentEl = this.$el.find('.' + this.theme.scrollContent);

        this.resizeScrollContent();

        if (this.options.autoHide) {
            this.$el.on('mouseenter', $.proxy(this.flashScrollbar, this));
        }

        this.$scrollbar.on('mousedown', $.proxy(this.startDrag, this));
        this.$scrollContentEl.on('scroll', $.proxy(this.startScroll, this));

        this.resizeScrollbar();

        if (!this.options.autoHide) {
            this.showScrollbar();
        }
    };


    /**
     * Start scrollbar handle drag
     */
    SimpleBar.prototype.startDrag = function (e) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault();

        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = e.pageY;
        if (this.scrollDirection === 'horiz') {
            eventOffset = e.pageX;
        }
        this.dragOffset = eventOffset - this.$scrollbar.offset()[this.offsetAttr];

        $(document).on('mousemove', $.proxy(this.drag, this));
        $(document).on('mouseup', $.proxy(this.endDrag, this));
    };


    /**
     * Drag scrollbar handle
     */
    SimpleBar.prototype.drag = function (e) {
        e.preventDefault();

        // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
        var eventOffset = e.pageY,
            dragPos     = null,
            dragPerc    = null,
            scrollPos   = null;

        if (this.scrollDirection === 'horiz') {
          eventOffset = e.pageX;
        }

        dragPos = eventOffset - this.$track.offset()[this.offsetAttr] - this.dragOffset;
        // Convert the mouse position into a percentage of the scrollbar height/width.
        dragPerc = dragPos / this.$track[this.sizeAttr]();
        // Scroll the content by the same percentage.
        scrollPos = dragPerc * this.$contentEl[0][this.scrollSizeAttr];

        this.$scrollContentEl[this.scrollOffsetAttr](scrollPos);
    };


    /**
     * End scroll handle drag
     */
    SimpleBar.prototype.endDrag = function () {
        $(document).off('mousemove', this.drag);
        $(document).off('mouseup', this.endDrag);
    };


    /**
     * Resize scrollbar
     */
    SimpleBar.prototype.resizeScrollbar = function () {
        if(SCROLLBAR_WIDTH === 0) {
            return;
        }

        var contentSize     = this.$contentEl[0][this.scrollSizeAttr],
            scrollOffset    = this.$scrollContentEl[this.scrollOffsetAttr](), // Either scrollTop() or scrollLeft().
            scrollbarSize   = this.$track[this.sizeAttr](),
            scrollbarRatio  = scrollbarSize / contentSize,
            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            handleOffset    = Math.round(scrollbarRatio * scrollOffset) + 2,
            handleSize      = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;


        if (scrollbarSize < contentSize) {
            if (this.scrollDirection === 'vert'){
                this.$scrollbar.css({'top': handleOffset, 'height': handleSize});
            } else {
                this.$scrollbar.css({'left': handleOffset, 'width': handleSize});
            }
            this.$track.show();
        } else {
            this.$track.hide();
        }
    };


    /**
     * On scroll event handling
     */
    SimpleBar.prototype.startScroll = function(e) {
        // Simulate event bubbling to root element
        this.$el.trigger(e);

        this.flashScrollbar();
    };


    /**
     * Flash scrollbar visibility
     */
    SimpleBar.prototype.flashScrollbar = function () {
        this.resizeScrollbar();
        this.showScrollbar();
    };


    /**
     * Show scrollbar
     */
    SimpleBar.prototype.showScrollbar = function () {
        this.$scrollbar.addClass('visible');

        if (!this.options.autoHide) {
            return;
        }
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }

        this.flashTimeout = window.setTimeout($.proxy(this.hideScrollbar, this), 1000);
    };


    /**
     * Hide Scrollbar
     */
    SimpleBar.prototype.hideScrollbar = function () {
        this.$scrollbar.removeClass('visible');
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }
    };


    /**
     * Resize content element
     */
    SimpleBar.prototype.resizeScrollContent = function () {
        if (IS_WEBKIT) {
            return;
        }

        if (this.scrollDirection === 'vert'){
            this.$scrollContentEl.width(this.$el.width()+SCROLLBAR_WIDTH);
            this.$scrollContentEl.height(this.$el.height());
        } else {
            this.$scrollContentEl.width(this.$el.width());
            this.$scrollContentEl.height(this.$el.height()+SCROLLBAR_WIDTH);
        }
    };


    /**
     * Recalculate scrollbar
     */
    SimpleBar.prototype.recalculate = function () {
        this.resizeScrollContent();
        this.resizeScrollbar();
    };


    /**
     * Getter for original scrolling element
     */
    SimpleBar.prototype.getScrollElement = function () {
        return this.$scrollContentEl;
    };


    /**
     * Getter for content element
     */
    SimpleBar.prototype.getContentElement = function () {
        return this.$contentEl;
    };


    /**
     * Data API
     */
    $(window).on('load', function () {
        $('[data-simplebar-direction]').each(function () {
            $(this).simplebar();
        });
    });


    /**
     * Plugin definition
     */
    var old = $.fn.simplebar;

    $.fn.simplebar = function (options) {
        var args = arguments,
            returns;

        // If the first parameter is an object (options), or was omitted,
        // instantiate a new instance of the plugin.
        if (typeof options === 'undefined' || typeof options === 'object') {
            return this.each(function () {

                // Only allow the plugin to be instantiated once,
                // so we check that the element has no plugin instantiation yet
                if (!$.data(this, 'simplebar')) { $.data(this, 'simplebar', new SimpleBar(this, options)); }
            });

        // If the first parameter is a string
        // treat this as a call to a public method.
        } else if (typeof options === 'string') {
            this.each(function () {
                var instance = $.data(this, 'simplebar');

                // Tests that there's already a plugin-instance
                // and checks that the requested public method exists
                if (instance instanceof SimpleBar && typeof instance[options] === 'function') {

                    // Call the method of our plugin instance,
                    // and pass it the supplied arguments.
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                  $.data(this, 'simplebar', null);
                }
            });

            // If the earlier cached method
            // gives a value back return the value,
            // otherwise return this to preserve chainability.
            return returns !== undefined ? returns : this;
        }
    };

    $.fn.simplebar.Constructor = SimpleBar;


    /**
     * No conflict
     */
    $.fn.simplebar.noConflict = function () {
        $.fn.simplebar = old;
        return this;
    };

}));
