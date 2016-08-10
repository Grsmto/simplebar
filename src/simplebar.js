import { scrollbarWidth } from './scrollbar-width'

const IS_WEBKIT = 'WebkitAppearance' in document.documentElement.style;

const hasClass = function(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

export default class SimpleBar {
    constructor(element, options) {
        this.el = document.querySelector(element);
        this.track;
        this.scrollbar;
        this.dragOffset;
        this.flashTimeout;
        this.contentEl          = this.el;
        this.scrollContentEl    = this.el;
        this.scrollDirection    = 'vert';
        this.scrollOffsetAttr   = 'scrollTop';
        this.sizeAttr           = 'offsetHeight';
        this.scrollSizeAttr     = 'scrollHeight';
        this.offsetAttr         = 'top';

        const DEFAULTS = {
            wrapContent: true,
            autoHide: true,
            css: {
                container: 'simplebar',
                content: 'simplebar-content',
                scrollContent: 'simplebar-scroll-content',
                scrollbar: 'simplebar-scrollbar',
                scrollbarTrack: 'simplebar-track'
            }
        }

        this.options = Object.assign({}, DEFAULTS, options);
        this.theme   = this.options.css;

        this.flashScrollbar = this.flashScrollbar.bind(this);
        this.startScroll = this.startScroll.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);

        this.init();
    }

    init() {
        // If scrollbar is a floating scrollbar, disable the plugin
        if(scrollbarWidth === 0) {
            this.el.style.overflow = 'auto';

            return
        }

        if (hasClass(this.el, this.theme.container) && hasClass(this.el, 'horizontal')) {
            this.scrollDirection    = 'horiz'
            this.scrollOffsetAttr   = 'scrollLeft'
            this.sizeAttr           = 'offsetWidth'
            this.scrollSizeAttr     = 'scrollWidth'
            this.offsetAttr         = 'left'
        }

        if (this.options.wrapContent) {
            const wrapperScrollContent = document.createElement('div');
            const wrapperContent = document.createElement('div');
            
            wrapperScrollContent.classList.add(this.theme.scrollContent);
            wrapperContent.classList.add(this.theme.content);
            
            while (this.el.firstChild)
                wrapperContent.appendChild(this.el.firstChild)
            
            wrapperScrollContent.appendChild(wrapperContent);
            this.el.appendChild(wrapperScrollContent);
        }

        this.contentEl = this.el.querySelector('.' + this.theme.content);

        const scrollbarTrack = document.createElement('div');
        const scrollbar = document.createElement('div');

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
    
    /**
     * Start scrollbar handle drag
     */
    startDrag(e) {
        // Preventing the event's default action stops text being
        // selectable during the drag.
        e.preventDefault()

        // Measure how far the user's mouse is from the top of the scrollbar drag handle.
        var eventOffset = e.pageY;
        
        if (this.scrollDirection === 'horiz') {
            eventOffset = e.pageX;
        }
        
        this.dragOffset = eventOffset - this.scrollbar.getBoundingClientRect()[this.offsetAttr];

        document.addEventListener('mousemove', this.drag);
        document.addEventListener('mouseup', this.endDrag);
    }


    /**
     * Drag scrollbar handle
     */
    drag(e) {
        e.preventDefault();

        // Calculate how far the user's mouse is from the top/left of the scrollbar (minus the dragOffset).
        var eventOffset = e.pageY,
            dragPos     = null,
            dragPerc    = null,
            scrollPos   = null;

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


    /**
     * End scroll handle drag
     */
    endDrag() {
        document.removeEventListener('mousemove', this.drag);
        document.removeEventListener('mouseup', this.endDrag);
    }


    /**
     * Resize scrollbar
     */
    resizeScrollbar() {
        if(scrollbarWidth === 0) {
            return
        }

        var contentSize     = this.contentEl[this.scrollSizeAttr],
            scrollOffset    = this.scrollContentEl[this.scrollOffsetAttr], // Either scrollTop() or scrollLeft().
            scrollbarSize   = this.track[this.sizeAttr],
            scrollbarRatio  = scrollbarSize / contentSize,
            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            handleOffset    = Math.round(scrollbarRatio * scrollOffset) + 2,
            handleSize      = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;

        if (scrollbarSize < contentSize) {
            if (this.scrollDirection === 'vert'){
                this.scrollbar.style.top = `${handleOffset}px`;
                this.scrollbar.style.height = `${handleSize}px`;
            } else {
                this.scrollbar.style.left = `${handleOffset}px`;
                this.scrollbar.style.width = `${handleSize}px`;
            }
            this.track.style.display = '';
        } else {
            this.track.style.display = 'none';
        }
    }


    /**
     * On scroll event handling
     */
    startScroll() {
        // Simulate event bubbling to root element
        // this.el.dispatchEvent(e)

        this.flashScrollbar();
    }


    /**
     * Flash scrollbar visibility
     */
    flashScrollbar() {
        this.resizeScrollbar();
        this.showScrollbar();
    }


    /**
     * Show scrollbar
     */
    showScrollbar() {
        this.scrollbar.classList.add('visible');

        if (!this.options.autoHide) {
            return
        }
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }

        this.flashTimeout = window.setTimeout(this.hideScrollbar.bind(this), 1000);
    }


    /**
     * Hide Scrollbar
     */
    hideScrollbar() {
        this.scrollbar.classList.remove('visible');
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
        }
    }


    /**
     * Resize content element
     */
    resizeScrollContent() {
        if (IS_WEBKIT) {
            return
        }

        if (this.scrollDirection === 'vert') {
            this.scrollContentEl.style.width = `${this.el.outerWidth() + scrollbarWidth}px`;
            this.scrollContentEl.style.height = `${this.el.outerHeight()}px`;
        } else {
            this.scrollContentEl.style.width = `${this.el.outerWidth()}px`;
            this.scrollContentEl.style.height = `${this.el.outerHeight() + scrollbarWidth}px`;
        }
    }


    /**
     * Recalculate scrollbar
     */
    recalculate() {
        this.resizeScrollContent();
        this.resizeScrollbar();
    }


    /**
     * Getter for original scrolling element
     */
    getScrollElement() {
        return this.scrollContentEl;
    }


    /**
     * Getter for content element
     */
    getContentElement() {
        return this.contentEl;
    }
}
