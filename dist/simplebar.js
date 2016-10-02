(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1), __webpack_require__(16), __webpack_require__(17), __webpack_require__(20), __webpack_require__(21)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('scrollbarwidth'), require('./simplebar.css'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, mod.exports, global.assign, global.classCallCheck, global.createClass, global.scrollbarwidth, global.simplebar);
	        global.SimpleBar = mod.exports;
	    }
	})(this, function (module, exports, _assign, _classCallCheck2, _createClass2, _scrollbarwidth, _simplebar) {
	    'use strict';
	
	    Object.defineProperty(exports, "__esModule", {
	        value: true
	    });
	
	    var _assign2 = _interopRequireDefault(_assign);
	
	    var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	    var _createClass3 = _interopRequireDefault(_createClass2);
	
	    var _scrollbarwidth2 = _interopRequireDefault(_scrollbarwidth);
	
	    var _simplebar2 = _interopRequireDefault(_simplebar);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    var hasClass = function hasClass(el, className) {
	        if (el.classList) return el.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	    };
	
	    var SimpleBar = function () {
	        function SimpleBar(element, options) {
	            (0, _classCallCheck3.default)(this, SimpleBar);
	
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
	
	            this.options = (0, _assign2.default)({}, DEFAULTS, options);
	            this.theme = this.options.css;
	
	            this.flashScrollbar = this.flashScrollbar.bind(this);
	            this.startScroll = this.startScroll.bind(this);
	            this.startDrag = this.startDrag.bind(this);
	            this.drag = this.drag.bind(this);
	            this.endDrag = this.endDrag.bind(this);
	
	            this.init();
	        }
	
	        (0, _createClass3.default)(SimpleBar, [{
	            key: 'init',
	            value: function init() {
	                // If scrollbar is a floating scrollbar, disable the plugin
	                if ((0, _scrollbarwidth2.default)() === 0) {
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
	
	                // create an observer instance
	                var observer = new MutationObserver(function (mutations) {
	                    mutations.forEach(function (mutation) {
	                        console.log(mutation.type);
	                    });
	                });
	
	                // pass in the target node, as well as the observer options
	                observer.observe(this.el, { attributes: true, characterData: true, subtree: true });
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
	                if ((0, _scrollbarwidth2.default)() === 0) {
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
	                if (this.scrollDirection === 'vert') {
	                    console.log((0, _scrollbarwidth2.default)());
	                    this.scrollContentEl.style.width = this.el.offsetWidth + (0, _scrollbarwidth2.default)() + 'px';
	                    this.scrollContentEl.style.height = this.el.offsetHeight + 'px';
	                } else {
	                    this.scrollContentEl.style.width = this.el.offsetWidth + 'px';
	                    this.scrollContentEl.style.height = this.el.offsetHeight + (0, _scrollbarwidth2.default)() + 'px';
	                }
	            }
	        }, {
	            key: 'recalculate',
	            value: function recalculate() {
	                console.log('recalc');
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6).Object.assign;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(9)});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(7)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(8);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.1 Object.assign(target, source, ...)
	var $        = __webpack_require__(10)
	  , toObject = __webpack_require__(11)
	  , IObject  = __webpack_require__(13);
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = __webpack_require__(15)(function(){
	  var a = Object.assign
	    , A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , $$    = arguments
	    , $$len = $$.length
	    , index = 1
	    , getKeys    = $.getKeys
	    , getSymbols = $.getSymbols
	    , isEnum     = $.isEnum;
	  while($$len > index){
	    var S      = IObject($$[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  }
	  return T;
	} : Object.assign;

/***/ },
/* 10 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(12);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(14);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(18);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	})();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(19), __esModule: true };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(10);
	module.exports = function defineProperty(it, key, desc){
	  return $.setDesc(it, key, desc);
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! scrollbarWidth.js v0.1.0 | felixexter | MIT | https://github.com/felixexter/scrollbarWidth */
	(function (root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			(root.jQuery || root).scrollbarWidth = factory();
		}
	}(this, function () {
		'use strict';
	
		function scrollbarWidth() {
			var
				body = document.body,
				box = document.createElement('div'),
				boxStyle = box.style,
				width;
	
			boxStyle.position = 'absolute';
			boxStyle.top = boxStyle.left = '-9999px';
			boxStyle.width = boxStyle.height = '100px';
			boxStyle.overflow = 'scroll';
	
			body.appendChild(box);
	
			width = box.offsetWidth - box.clientWidth;
	
			body.removeChild(box);
	
			return width;
		}
	
		return scrollbarWidth;
	}));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(24)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./simplebar.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/postcss-loader/index.js!./simplebar.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(23)();
	// imports
	
	
	// module
	exports.push([module.id, ".simplebar, [data-simplebar-direction] {\n    position: relative;\n    overflow: hidden;\n    -webkit-overflow-scrolling: touch; /* Trigger native scrolling for mobile, if not supported, plugin is used. */\n}\n\n.simplebar .simplebar-scroll-content,\n[data-simplebar-direction] .simplebar-scroll-content {\n    overflow-y: scroll;\n    overflow-x: auto;\n    position: absolute;\n    left: 0;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    -ms-overflow-style: none; /* hide browser scrollbar on IE10+ */\n}\n\n/* hide browser scrollbar on Webkit (Safari & Chrome) */\n/*.simplebar-scroll-content::-webkit-scrollbar {\n    display: none;\n}*/\n\n[data-simplebar-direction=\"horizontal\"] .simplebar-scroll-content,\n.simplebar.horizontal .simplebar-scroll-content {\n    overflow-x: scroll;\n    overflow-y: auto;\n}\n\n.simplebar-track {\n    z-index: 99;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    width: 11px;\n}\n\n.simplebar-track .simplebar-scrollbar {\n    position: absolute;\n    right: 2px;\n    border-radius: 7px;\n    min-height: 10px;\n    width: 7px;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    opacity: 0;\n    -webkit-transition: opacity 0.2s linear;\n    transition: opacity 0.2s linear;\n    background: #6c6e71;\n    -webkit-background-clip: padding-box;\n    -moz-background-clip: padding;\n}\n\n.simplebar-track:hover .simplebar-scrollbar {\n    /* When hovered, remove all transitions from drag handle */\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\";\n    opacity: 0.7;\n    -webkit-transition: opacity 0 linear;\n    transition: opacity 0 linear;\n}\n\n.simplebar-track .simplebar-scrollbar.visible {\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\";\n    opacity: 0.7;\n}\n\n[data-simplebar-direction=\"horizontal\"] .simplebar-track,\n.simplebar.horizontal .simplebar-track {\n    top: auto;\n    left: 0;\n    width: auto;\n    height: 11px;\n}\n\n[data-simplebar-direction=\"horizontal\"] .simplebar-track .simplebar-scrollbar,\n.simplebar.horizontal .simplebar-track .simplebar-scrollbar {\n    right: auto;\n    top: 2px;\n    height: 7px;\n    min-height: 0;\n    min-width: 10px;\n    width: auto;\n}\n", ""]);
	
	// exports


/***/ },
/* 23 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ])
});
;
//# sourceMappingURL=simplebar.js.map