;(function ( $, window, document, undefined ) {


    /**
     * Calculate scrollbar width
     *
     * Called only once as a constant variable: we assume that scrollbar width never change
     * 
     * Original function by Jonathan Sharp:
     * http://jdsharp.us/jQuery/minute/calculate-scrollbar-width.php
     */
    SCROLLBAR_WIDTH = scrollbarWidth();

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



    // SimpleBar Constructor
    function SimpleBar (element, options) {
        this.el = element;
        this.$el = $(element);
        this.$scrollContentEl;
        this.$contentEl;
        this.$scrollbarEl;
        this.$dragHandleEl;
        this.dragOffset;
        this.flashTimeout;
        this.scrollDirection    = 'vert';
        this.scrollOffsetAttr   = 'scrollTop';
        this.sizeAttr           = 'height';
        this.scrollSizeAttr     = 'scrollHeight';
        this.offsetAttr         = 'top';

        this.options = $.extend({}, SimpleBar.DEFAULTS, options);

        this.init();
    }

    SimpleBar.DEFAULTS = {
        wrapContent: true,
        autoHide: true
    };

    SimpleBar.prototype.init = function () {
        // If scrollbar is a floating scrollbar, disable the plugin
        if(SCROLLBAR_WIDTH === 0) {
          this.$el.css('overflow', 'auto');

          return;
        }
        if (this.$el.data('simplebar') === 'horizontal' || this.$el.hasClass('simplebar horizontal')){
            this.scrollDirection    = 'horiz';
            this.scrollOffsetAttr   = 'scrollLeft';
            this.sizeAttr           = 'width';
            this.scrollSizeAttr     = 'scrollWidth';
            this.offsetAttr         = 'left';
        }

        if (this.options.wrapContent) {
            this.$el.wrapInner('<div class="simplebar-scroll-content"><div class="simplebar-content"></div></div>');
        }

        this.$contentEl = this.$el.find('.simplebar-content');

        this.$el.prepend('<div class="simplebar-scrollbar"><div class="drag-handle"></div></div>');
        this.$scrollbarEl = this.$el.find('.simplebar-scrollbar');
        this.$dragHandleEl = this.$el.find('.drag-handle');

        this.$scrollContentEl = this.$el.find('.simplebar-scroll-content');

        this.resizeScrollContent();

        if (this.options.autoHide) {
            this.$el.on('mouseenter', $.proxy(this.flashScrollbar, this));
        }

        this.$dragHandleEl.on('mousedown', $.proxy(this.startDrag, this));
        this.$scrollContentEl.on('scroll', $.proxy(this.flashScrollbar, this));

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
        this.dragOffset = eventOffset - this.$dragHandleEl.offset()[this.offsetAttr];

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

        dragPos = eventOffset - this.$scrollbarEl.offset()[this.offsetAttr] - this.dragOffset;
        // Convert the mouse position into a percentage of the scrollbar height/width.
        dragPerc = dragPos / this.$scrollbarEl[this.sizeAttr]();
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
        var contentSize     = this.$contentEl[0][this.scrollSizeAttr],
            scrollOffset    = this.$scrollContentEl[this.scrollOffsetAttr](), // Either scrollTop() or scrollLeft().
            scrollbarSize   = this.$scrollbarEl[this.sizeAttr](),
            scrollbarRatio  = scrollbarSize / contentSize,
            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            handleOffset    = Math.round(scrollbarRatio * scrollOffset) + 2,
            handleSize      = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;


        if (scrollbarSize < contentSize) {
            if (this.scrollDirection === 'vert'){
                this.$dragHandleEl.css({'top': handleOffset, 'height': handleSize});
            } else {
                this.$dragHandleEl.css({'left': handleOffset, 'width': handleSize});
            }
            this.$scrollbarEl.show();
        } else {
            this.$scrollbarEl.hide();
        }
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
        this.$dragHandleEl.addClass('visible');

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
        this.$dragHandleEl.removeClass('visible');
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }
    };


    /**
     * Resize content element
     */
    SimpleBar.prototype.resizeScrollContent = function () {
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
     * Data API
     */
    $(window).on('load', function () {
        $('[data-simplebar]').each(function () {
            $(this).simplebar();
        });
    });


    // MODAL PLUGIN DEFINITION
    // =======================

    var old = $.fn.simplebar;

    $.fn.simplebar = function (option, _relatedTarget) {
        return this.each(function () {
            var $this   = $(this),
                data    = $this.data('scrollbars'),
                options = $.extend({}, SimpleBar.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) { $this.data('scrollbars', (data = new SimpleBar(this, options))); }
            if (typeof option === 'string') { data[option](_relatedTarget); }
            else if (options.show) { data.show(_relatedTarget); }
        });
    };

    $.fn.simplebar.Constructor = SimpleBar;


    // MODAL NO CONFLICT
    // =================

    $.fn.simplebar.noConflict = function () {
        $.fn.simplebar = old;
        return this;
    };

})(jQuery, window, document);
