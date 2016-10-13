#SimpleBar 2 [![npm package][npm-badge]][npm]

SimpleBar is a plugin that tries to solve a long time problem : how to get custom scrollbars for your web-app?

**SimpleBar 2 is here!**
See the changes:
- **Feature:** No need to manually instantiate SimpleBar with `new` or to call `recalculate()` anymore. Thanks to mutation observers, this is handled "automatically". Just add `data-simplebar` to any scrollable element you want and it will be SimpleBar-ified.
- **Feature:** No need to know what scroll direction you want, horizontal and vertical scrolls are now supported simultaneously.
- **Feature:** Dependency free. Fully rewritten with ES6 (transpiled to ES6 using Babel).

###Installation

**- Via npm**
`npm install simplebar --save`

**- Via `<script>` tag**
```
<link rel="stylesheet" href="https://unpkg.com/simplebar@2.0.0-beta.2/umd/simplebar.css" />
<script src="https://unpkg.com/simplebar@2.0.0-beta.2/umd/simplebar.js"></script>
```

###Usage

Set `data-simplebar` on the element you want your custom scrollbar. You're done.
```
<div data-simplebar></div>
```







1. [Documentation](#1-documentation)
2. [Browsers support](#2-browsers-support)
3. [Demo](#3-demo)
4. [How it works](#4-how-it-works)
5. [Changelog](#5-changelog)
6. [Credits](#6-credits)

##1. Documentation

### Other usages
You can start SimpleBar mannually if you need to:

    new SimpleBar(document.getElementById('#myElement'))

If you want to use jQuery:
 
    new SimpleBar($('#myElement')[0])

###Options

Options can be applied to the plugin during initialization:
```
new SimpleBar(document.getElementById('#myElement'), {
    option1: value1,
    option2: value2
})
```

Available options are:

####wrapContent

By default SimpleBar requires minimal markup. When initialized it will wrap a `simplebar-content`element in a div with the class `simplebar-scroll-content`. If you prefer to include this wrapper element directly in your markup you can switch the default behaviour off by setting the `wrapContent` option to `false`:

    new SimpleBar(document.getElementById('#myElement'), { wrapContent: false });

Default value is `true`

####autoHide

By default SimpleBar automatically hides the scrollbar if the user is not scrolling (it emulates Mac OSX Lion's scrollbar). You can make the scrollbar always visible by setting the `autoHide` option to `false`:

    new SimpleBar(document.getElementById('#myElement'), { autoHide: false });


Default value is `true`

You can also control the animation via CSS as it's a simple CSS opacity transition.

####css

It is possible to specify css classes to change the design of the scrollbar. To get your own styles to work refer to `simplebar.css` to get an idea how to setup your css.

- `container` represents the wrapper for the area scrolled by simplebar.
- `content` represents the wrapper for the content being scrolled.
- `scrollContent` represents the container containing elements being scrolled.
- `scrollbar` defines the style of the scrollbar with which the user can interact to scroll the content.
- `scrollbarTrack` styles the area surrounding the `scrollbar`.

```javascript
css: {
  // defaults
  container: 'simplebar',
  content: 'simplebar-content',
  scrollContent: 'simplebar-scroll-content',
  scrollbar: 'simplebar-scrollbar',
  scrollbarTrack: 'simplebar-track'
}
```

###Notifying the plugin of content changes

If you later dynamically modify your content, for instance changing its height or width, or adding or removing content, you should recalculate the scrollbars like so:

    var el = new SimpleBar(document.getElementById('#myElement'));
    el.SimpleBar.recalculate()

###Trigger programmatical scrolling
If you want to access to original scroll element, you can retrieve it via a getter :

    var el = new SimpleBar(document.getElementById('#myElement'));
    el.SimpleBar.getScrollElement()

###Subscribe to `scroll` event
You can subscribe to the `scroll` event just like you do with native scrolling element :
    
    var el = new SimpleBar(document.getElementById('#myElement'));
    el.SimpleBar.getScrollElement().addEventListener('scroll', function(...));

###Add content dynamically (ajax)
You can retrieve the element containing datas like this :
    
    var el = new SimpleBar(document.getElementById('#myElement'));
    el.SimpleBar.getContentElement();

This is best to use this rather than querying it via the DOM directly cause it avoids problem when the plugin is disabled (like on mobiles).

###Non-JS fallback

SimpleBar hides the browser's default scrollbars, which obviously is undesirable if the user has JavaScript disabled. To restore the browser's scrollbars you can include the following `noscript` element in your document's `head`:

    <noscript>
      <style>
        [data-simplebar] {
          overflow: auto;
        }
      </style>
    </noscript>

##2. Browsers support

Simplebar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.

Notice: IE10 doesn't support `MutationObserver` so you will still need to instantiate SimpleBar manually and call `recalculate()` as needed (or you can just use a polyfill for `MutationObserver`).

If you want to support IE9 you will need polyfills for:
- `classList`

Or you can use SimpleBar v1.

###Mobile support
Most of the mobile browsers have "floating" scrollbars. Also, they are not all currently supporting hardware acceleration on `overflow: auto` elements. So we decided to automatically disable SimpleBar when a "floating" scrollbar is detected. So mobile browsers will use native scrollbar seemlessly.
For example you will notice that it will use native scrollbar on mac OSX 10.8+ (when using trackpad) as the scrollbar is natively floating.

##3. Demo
http://grsmto.github.io/simplebar/

##4. How it works

SimpleBar does only one thing : replace the browser's default scrollbars with a custom CSS-styled scrollbar without losing performance. Unlike most of others plugins, SimpleBar doesn't mimic scroll with Javascript, causing janks and strange scrolling behaviours...You keep the awesomeness of native scrolling...with a custom scrollbar!
Design your scrollbar like you want, with CSS, on all browsers.

For the most part SimpleBar uses the browser's native scrolling functionality, but replaces the conventional scrollbar with a custom CSS-styled scrollbar. The plugin listens for scroll events and redraws the custom scrollbar accordingly.

Key to this technique is hiding the native browser scrollbar. The scrollable element is made slightly wider/taller than its containing element, effectively hiding the scrollbar from view.

##5. Changelog

See changelog here : https://github.com/Grsmto/simplebar/releases

##6. Credits

Most of the credit goes to [Jonathan Nicol](http://www.f6design.com/) who made the original plugin called [Trackpad Scroll Emulator](https://github.com/jnicol/trackpad-scroll-emulator).

Website: http://html5up.net/

###Additional contributors

Yoh Suzuki: wrapContent option

[npm-badge]: https://img.shields.io/npm/v/simplebar.svg?style=flat-square
[npm]: https://www.npmjs.org/package/simplebar
