import scrollbarWidth from 'scrollbarwidth'

import './simplebar.css'

// create an observer instance
var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType === 1 && 
                mutation.addedNodes[i].hasAttribute('data-simplebar') &&
                typeof mutation.addedNodes[i].SimpleBar === 'undefined') {
                new SimpleBar(mutation.addedNodes[i]);
            }
        }
    });
});
 
// pass in the target node, as well as the observer options
observer.observe(document, { 
    childList: true,
    attributes: true,
    subtree: true
});

export default class SimpleBar {
    constructor(element, options) {
        this.el = element;
        this.track;
        this.scrollbar;
        this.dragOffset;
        this.flashTimeout;
        this.contentEl          = this.el;
        this.scrollContentEl    = this.el;
        this.isVisible          = {
            x: true,
            y: true
        };

        const DEFAULT_OPTIONS = {
            wrapContent: true,
            autoHide: true,
            classNames: {
                container: 'simplebar',
                content: 'simplebar-content',
                scrollContent: 'simplebar-scroll-content',
                scrollbar: 'simplebar-scrollbar',
                track: 'simplebar-track'
            }
        }

        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this.classNames = this.options.classNames;

        this.flashScrollbar = this.flashScrollbar.bind(this);
        this.startScroll = this.startScroll.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);

        this.init();
    }

    init() {
        // Save a reference to the instance, so we know this DOM node has already been instancied
        this.el.SimpleBar = this;

        // If scrollbar is a floating scrollbar, disable the plugin
        if(scrollbarWidth() === 0) {
            this.el.style.overflow = 'auto';

            return
        }

        // Prepare DOM
        if (this.options.wrapContent) {
            const wrapperScrollContent = document.createElement('div');
            const wrapperContent = document.createElement('div');
            
            wrapperScrollContent.classList.add(this.classNames.scrollContent);
            wrapperContent.classList.add(this.classNames.content);
            
            while (this.el.firstChild)
                wrapperContent.appendChild(this.el.firstChild)
            
            wrapperScrollContent.appendChild(wrapperContent);
            this.el.appendChild(wrapperScrollContent);
        }

        const track = document.createElement('div');
        const scrollbar = document.createElement('div');

        track.classList.add(this.classNames.track);
        scrollbar.classList.add(this.classNames.scrollbar);

        track.appendChild(scrollbar);

        this.trackX = track.cloneNode(true);
        this.trackX.classList.add('horizontal');

        this.trackY = track.cloneNode(true);
        this.trackY.classList.add('vertical');

        this.el.insertBefore(this.trackX, this.el.firstChild);
        this.el.insertBefore(this.trackY, this.el.firstChild);

        this.scrollbarX = this.trackX.querySelector(`.${this.classNames.scrollbar}`);
        this.scrollbarY = this.trackY.querySelector(`.${this.classNames.scrollbar}`);
        this.scrollContentEl = this.el.querySelector('.' + this.classNames.scrollContent);
        this.contentEl = this.el.querySelector('.' + this.classNames.content);

        // Calculate content size
        this.resizeScrollContent();
        this.resizeScrollbar('x');
        this.resizeScrollbar('y');

        if (!this.options.autoHide) {
            this.showScrollbar('x');
            this.showScrollbar('y');
        }

        // Event listeners
        if (this.options.autoHide) {
            this.el.addEventListener('mouseenter', this.flashScrollbar);
        }

        this.scrollbarX.addEventListener('mousedown', () => this.startDrag('x'));
        this.scrollbarY.addEventListener('mousedown', () => this.startDrag('y'));
        
        this.scrollContentEl.addEventListener('scroll', this.startScroll);

        // create an observer instance
        var observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.target === this.el) {
                    this.recalculate();
                }
            });
        });
         
        // pass in the target node, as well as the observer options
        observer.observe(this.el, { attributes: true, characterData: true, subtree: true });
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
    resizeScrollbar(axis = 'y') {
        var track;
        var scrollbar;

        if (axis === 'x') {
            this.scrollOffsetAttr   = 'scrollLeft'
            this.sizeAttr           = 'offsetWidth'
            this.scrollSizeAttr     = 'scrollWidth'
            this.offsetAttr         = 'left'
            track = this.trackX;
            scrollbar = this.scrollbarX;
        } else { // 'y'
            this.scrollOffsetAttr   = 'scrollTop';
            this.sizeAttr           = 'offsetHeight';
            this.scrollSizeAttr     = 'scrollHeight';
            this.offsetAttr         = 'top';
            track = this.trackY;
            scrollbar = this.scrollbarY;
        }

        var contentSize     = this.contentEl[this.scrollSizeAttr],
            scrollOffset    = this.scrollContentEl[this.scrollOffsetAttr], // Either scrollTop() or scrollLeft().
            scrollbarSize   = track[this.sizeAttr],
            scrollbarRatio  = scrollbarSize / contentSize,
            // Calculate new height/position of drag handle.
            // Offset of 2px allows for a small top/bottom or left/right margin around handle.
            handleOffset    = Math.round(scrollbarRatio * scrollOffset) + 2,
            handleSize      = Math.floor(scrollbarRatio * (scrollbarSize - 2)) - 2;

        // Set isVisible to false if scrollbar is not necessary (content is shorter than wrapper)
        this.isVisible[axis] = scrollbarSize < contentSize

        if (this.isVisible[axis]) {
            track.style.visibility = 'visible';

            if (axis === 'x') {
                scrollbar.style.left = `${handleOffset}px`;
                scrollbar.style.width = `${handleSize}px`;
            } else {
                scrollbar.style.top = `${handleOffset}px`;
                scrollbar.style.height = `${handleSize}px`;
            } 
        } else {
            track.style.visibility = 'hidden';
        }
    }


    /**
     * Resize content element
     */
    resizeScrollContent() {
        const _scrollbarWidth = scrollbarWidth()

        this.scrollContentEl.style.width = `${this.el.offsetWidth + _scrollbarWidth}px`;
        this.scrollContentEl.style.height = `${this.el.offsetHeight + _scrollbarWidth}px`;
    }


    /**
     * On scroll event handling
     */
    startScroll() {
        this.flashScrollbar();
    }


    /**
     * Flash scrollbar visibility
     */
    flashScrollbar() {
        this.resizeScrollbar('x');
        this.resizeScrollbar('y');
        this.showScrollbar('x');
        this.showScrollbar('y');
    }


    /**
     * Show scrollbar
     */
    showScrollbar(axis = 'y') {
        if (!this.isVisible[axis]) {
            return
        }

        if (axis === 'x') {
            this.scrollbarX.classList.add('visible');
        } else {
            this.scrollbarY.classList.add('visible');
        }

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
        this.scrollbarX.classList.remove('visible');
        this.scrollbarY.classList.remove('visible');
        
        if(typeof this.flashTimeout === 'number') {
            window.clearTimeout(this.flashTimeout);
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
