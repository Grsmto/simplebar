# SimpleBar [![npm package][npm-badge]][npm] ![size-badge]

:warning: SimpleBar v3 is here! Check out [the changelog](https://github.com/Grsmto/simplebar/releases/tag/simplebar%403.1.0-beta.3).

SimpleBar is a plugin that tries to solve a long time problem: how to get custom scrollbars for your web-app?
SimpleBar **does NOT implement a custom scroll behaviour**. It keeps the **native** `overflow: auto` scroll and **only** replace the scrollbar visual appearance.

SimpleBar is meant to be as easy to use as possible and lightweight. If you want something more advanced I recommend [KingSora](https://github.com/KingSora) 's [Overlay Scrollbars](https://kingsora.github.io/OverlayScrollbars/).

### Installation

**- Choose your SimpleBar** 
- **For React** `yarn add simplebar-react`
- **For Vue** `yarn add simplebar-vue`
- **For others** `yarn add simplebar`

**- Via npm**
`npm install simplebar --save`

**- Via Yarn**
`yarn add simplebar`

**- Via `<script>` tag**
```html
<link rel="stylesheet" href="https://unpkg.com/simplebar@latest/dist/simplebar.css" />
<script src="https://unpkg.com/simplebar@latest/dist/simplebar.js"></script>
<!-- or -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.css">
<script src="https://cdn.jsdelivr.net/npm/simplebar@latest/dist/simplebar.js"></script>
```
note: you can replace `@latest` to the latest version (ex `@2.4.3`), if you want to lock to a specific version


### Usage

Check out the [React](https://github.com/Grsmto/simplebar/blob/master/examples/react/src/App.js) and [Vue](https://github.com/Grsmto/simplebar/blob/master/examples/vue/src/App.vue) examples.

If you are using a module loader (like Webpack) you first need to load SimpleBar:
```js
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
```

Set `data-simplebar` on the element you want your custom scrollbar. You're done.
```html
<div data-simplebar></div>
```

**Don't forget to import both css and js in your project!**

### :warning: Warning!
SimpleBar is **not intended to be used on the `body` element!** I don't recommend wrapping your entire web page inside a custom scroll as it will often badly affect the user experience (slower scroll performance compared to the native body scroll, no native scroll behaviours like click on track, etc.). Do it at your own risk! SimpleBar is meant to improve the experience of **internal web page scrolling**; such as a chat box or a small scrolling area. **Please read the [caveats](#5-caveats) section first to be aware of the limitations!**

### Troubleshooting
If you are experiencing issues when setting up SimpleBar, it is most likely because your styles are clashing with SimpleBar ones. Make sure the element you are setting SimpleBar on does not override any SimpleBar css properties! We recommend to not style that element at all and use an inner element instead.

### Sponsors
Thanks to BrowserStack for sponsoring open source projects and letting us test SimpleBar for free.
<a href="https://www.browserstack.com" target="_blank">
    <img src="https://user-images.githubusercontent.com/15015324/45184727-368fbf80-b1fe-11e8-8827-08dbc80b0fb1.png" width="200">
</a>

---

1. [Documentation](#1-documentation)
2. [Browsers support](#2-browsers-support)
3. [Demo](#3-demo)
4. [How it works](#4-how-it-works)
5. [Caveats](#5-caveats)
5. [Changelog](#6-changelog)
6. [Credits](#7-credits)

## 1. Documentation

### Other usages
You can start SimpleBar manually if you need to:
```js
new SimpleBar(document.getElementById('myElement'));
```

or
```js
Array.from(document.querySelectorAll('.myElements')).forEach(el => new SimpleBar);
```

If you want to use jQuery:
 ```js
new SimpleBar($('#myElement')[0]);
```

or
```js
$('.myElements').each(element, new SimpleBar);
```

### Options

Options can be applied to the plugin during initialization:
```js
new SimpleBar(document.getElementById('myElement'), {
    option1: value1,
    option2: value2
});
```

or using data-attributes:
```html
<div data-simplebar data-simplebar-auto-hide="false">
```

Available options are:

#### autoHide

By default SimpleBar automatically hides the scrollbar if the user is not scrolling (it emulates Mac OSX Lion's scrollbar). You can make the scrollbar always visible by setting the `autoHide` option to `false`:
```js
new SimpleBar(document.getElementById('myElement'), { autoHide: false });
```

Default value is `true`.

You can also control the animation via CSS as it's a simple CSS opacity transition.

#### scrollbarMinSize
Define the minimum scrollbar size in pixels.

Default value is `10`.

#### classNames

It is possible to change the default class names that SimpleBar uses. To get your own styles to work refer to `simplebar.css` to get an idea how to setup your css.

- `content` represents the wrapper for the content being scrolled.
- `scrollContent` represents the container containing the elements being scrolled.
- `scrollbar` defines the style of the scrollbar with which the user can interact to scroll the content.
- `track` styles the area surrounding the `scrollbar`.

```js
classNames: {
  // defaults
  content: 'simplebar-content',
  scrollContent: 'simplebar-scroll-content',
  scrollbar: 'simplebar-scrollbar',
  track: 'simplebar-track'
}
```

### Notifying the plugin of content changes
#### Note: you shouldn't need to use these functions as SimpleBar takes care of that automatically. This is for advanced usage only.

If later on you dynamically modify your content, for instance changing its height or width, or adding or removing content, you should recalculate the scrollbars like so:
```js
const el = new SimpleBar(document.getElementById('myElement'));
el.recalculate();
```

### Trigger programmatical scrolling
If you want to access to the original scroll element, you can retrieve it via a getter:
```js
const el = new SimpleBar(document.getElementById('myElement'));
el.getScrollElement();
```

### Subscribe to `scroll` event
You can subscribe to the `scroll` event, just like you do with native scrolling elements:
```js
const el = new SimpleBar(document.getElementById('myElement'));
el.getScrollElement().addEventListener('scroll', function(...));
```

### Add content dynamically (Ajax)
You can retrieve the element containing data like this:
```js
const el = new SimpleBar(document.getElementById('myElement'));
el.getContentElement();
```

### Disable Mutation Observer
```js
SimpleBar.removeObserver();
```

### Non-JS fallback

SimpleBar hides the browser's default scrollbars, which obviously is undesirable if the user has JavaScript disabled. To restore the browser's scrollbars you can include the following `noscript` element in your document's `head`:

```html
<noscript>
    <style>
    [data-simplebar] {
        overflow: auto;
    }
    </style>
</noscript>
```

## 2. Browsers support

SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.

Notice: IE10 doesn't support `MutationObserver` so you will still need to instantiate SimpleBar manually and call `recalculate()` as needed (or you can just use a polyfill for `MutationObserver`).

If you want to support IE9 or apply SimpleBar on an SVG element on IE11, you will need a [polyfill for `classList`](https://github.com/eligrey/classList.js/blob/master/classList.js).

Or you can use SimpleBar v1.

## 3. Demo
http://grsmto.github.io/simplebar/

## 4. How it works

SimpleBar only does one thing: replace the browser's default scrollbars with a custom CSS-styled scrollbar without sacrificing performance. Unlike most other plugins, SimpleBar doesn't mimic scroll behaviour with Javascript, which typically causes jank and strange scrolling behaviour. You keep the awesomeness of native scrolling… with a custom scrollbar!
Design your scrollbar how you like, with CSS, across all browsers.

For the most part SimpleBar uses the browser's native scrolling functionality, but replaces the conventional scrollbar with a custom CSS-styled scrollbar. The plugin listens for scroll events and redraws the custom scrollbar accordingly.

Key to this technique is hiding the native browser scrollbar. The scrollable element is made slightly wider/taller than its containing element, effectively hiding the scrollbar from view.

## 5. Caveats
- SimpleBar can't be used on the `<body>`, `<textarea>` or `<iframe>` elements. If you are looking to support `textarea`, I suggest taking a look at [OverLayScrollbars](https://kingsora.github.io/OverlayScrollbars).
- SimpleBar doesn't currently support `overflow: visible`. Which means any children of your scrolling div will be clipped (like with `overflow: hidden`).

## 6. Changelog

See changelog here : https://github.com/Grsmto/simplebar/releases

## 7. Credits

- [KingSora](https://github.com/KingSora) for multiple features and inspirations (`height: auto` detection, RTL mode cross browser support and more) with [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/).
- [Jonathan Nicol](http://www.f6design.com/) for original idea with [Trackpad Scroll Emulator](https://github.com/jnicol/trackpad-scroll-emulator).

Website: http://html5up.net/

### Community plugins

**Ruby On Rails**
To include SimpleBar in the Ruby On Rails asset pipeline, use the [simplebar-rails](https://github.com/thutterer/simplebar-rails) gem. 

[npm-badge]: https://img.shields.io/npm/v/simplebar.svg?style=flat-square
[npm]: https://www.npmjs.org/package/simplebar
[size-badge]: http://img.badgesize.io/Grsmto/simplebar/master/packages/simplebar/src/simplebar.js?compression=gzip&&style=flat-square
