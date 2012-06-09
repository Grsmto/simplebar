/**
 * TrackpadScrollEmulator
 * Author: Jonathan Nicol @f6design
 */
;(function($) {
  var pluginName = 'TrackpadScrollEmulator';
 
  function Plugin(element, options) {
    var el = element;
    var $el = $(element);
    var $scrollContentEl;
    var $contentEl = $el.find('.content');
    var $scrollbarEl;
    var $dragHandleEl;
    var dragOffset;
    var flashTimeout;

    options = $.extend({}, $.fn[pluginName].defaults, options);

    /**
     * Initialize plugin
     */
    function init() {
      $el.prepend('<div class="scrollbar"><div class="drag-handle"></div></div>');
      $scrollbarEl = $el.find('.scrollbar');
      $dragHandleEl = $el.find('.drag-handle');

      $contentEl.wrap('<div class="scroll-content" />');
      $scrollContentEl = $el.find('.scroll-content');

      // So that scrollbars are visible with JS disabled, the content element has
      // default height and overflow values, which we need to reset.
      $contentEl.css({'height': 'auto', 'overflow': 'visible'});
      resizeScrollContent();

      $el.on('mouseenter', flashScrollbar);
      $dragHandleEl.on('mousedown', startDrag);
      $scrollContentEl.on('scroll', onScrolled);

      resizeScrollbar();
    }

    function startDrag(e) {
      // Preventing the event's default action stops text being
      // selectable during the drag.
      e.preventDefault();

      // Measure how far the user's mouse is from the top of the scrollbar drag handle.
      dragOffset = e.pageY - $dragHandleEl.offset().top;

      $(document).on('mousemove', drag);
      $(document).on('mouseup', endDrag);
    }

    function drag(e) {
      e.preventDefault();

      // Calculate how far the user's mouse is from the top of the scrollbar (minus the dragOffset).
      var dragPos = e.pageY - $scrollbarEl.offset().top - dragOffset;
      // Convert the mouse position into a percentage of the scrollbar height.
      var dragPerc = dragPos / $scrollbarEl.height();
      // Scroll the content by the same percentage.
      var scrollPos = dragPerc * $contentEl.height();

      $scrollContentEl.scrollTop(scrollPos);
    }

    function endDrag() {
      $(document).off('mousemove', drag);
      $(document).off('mouseup', endDrag);
    }

    /**
     * Scroll callback
     */
    function onScrolled(e) {
      flashScrollbar();
    }

    /**
     * Resize scrollbar
     */
    function resizeScrollbar() {
      var contentHeight = $contentEl.height();
      var scrollTop = contentScrollTop();
      var scrollbarHeight = $scrollbarEl.height();
      var scrollbarRatio = scrollbarHeight / contentHeight;

      // Calculate new height/position of drag handle.
      // Offset of 2px allows for a small top/bottom margin around handle.
      var handleTop = Math.round(scrollbarRatio * scrollTop) + 2;
      var handleHeight = Math.floor(scrollbarRatio * (scrollbarHeight - 2)) - 2;

      if (scrollbarHeight < contentHeight) {
          $dragHandleEl.css({'top': handleTop, 'height': handleHeight});
          $scrollbarEl.show();
      } else {
          $scrollbarEl.hide();
      }
    }

    /**
     * Get content scrollTop value
     */
    function contentScrollTop() {
      return $scrollContentEl.scrollTop();
    }

    /**
     * Flash scrollbar visibility
     */
    function flashScrollbar() {
      resizeScrollbar();
      showScrollbar();
    }

    /**
     * Show scrollbar
     */
    function showScrollbar() {
        $dragHandleEl.addClass('visible');
        if(typeof flashTimeout === 'number') {
          window.clearTimeout(flashTimeout);
        }
        flashTimeout = window.setTimeout(function() {
            //self.hideScrollbar();
            hideScrollbar();
        }, 1000);
    }

    /**
     * Hide Scrollbar
     */
    function hideScrollbar() {
        $dragHandleEl.removeClass('visible');
        if(typeof flashTimeout === 'number') {
          window.clearTimeout(flashTimeout);
        }
    }

    function resizeScrollContent() {
      $scrollContentEl.width($el.width()+20);
      $scrollContentEl.height($el.height());
    }

    function recalculate() {
      resizeScrollContent();
      resizeScrollbar();
    }
    
    /**
     * Get/Set plugin option.
     */
    function option (key, val) {
      if (val) {
        options[key] = val;
      } else {
        return options[key];
      }
    }
 
    /**
     * Destroy plugin.
     */
    function destroy() {
      //$el.each(function() {
        //var el = this;
        //var $el = $(this);
 
        // Restore the element to its original state.
        $contentEl.insertBefore($scrollbarEl);
        $scrollbarEl.remove();
        $scrollContentEl.remove();
 
        hook('onDestroy');
        $el.removeData('plugin_' + pluginName);
      //});
    }
  
    /**
     * Plugin callback hook.
     */
    function hook(hookName) {
      if (options[hookName] !== undefined) {
        options[hookName].call(el);
      }
    }
 
    init();
 
    return {
      option: option,
      destroy: destroy,
      recalculate: recalculate
    };
  }
 
  $.fn[pluginName] = function(options) {
    if (typeof arguments[0] === 'string') {
      var methodName = arguments[0];
      var args = Array.prototype.slice.call(arguments, 1);
      var returnVal;
      this.each(function() {
        if ($.data(this, 'plugin_' + pluginName) && typeof $.data(this, 'plugin_' + pluginName)[methodName] === 'function') {
          returnVal = $.data(this, 'plugin_' + pluginName)[methodName].apply(this, args);
        } else {
          throw new Error('Method ' +  methodName + ' does not exist on jQuery.' + pluginName);
        }
      });
      if (returnVal !== undefined){
        return returnVal;
      } else {
        return this;
      }
    } else if (typeof options === "object" || !options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    }
  };
 
  $.fn[pluginName].defaults = {
    onInit: function() {},
    onDestroy: function() {}
  };
 
})(jQuery);