<p hidden align="center">
  <img src="https://user-images.githubusercontent.com/527559/66231995-3cd0c380-e6be-11e9-8782-c50c834aac93.png" width="520"  alt="SimpleBar" />
</p>
<br hidden />
<p hidden align="center">
  <a href="https://npmjs.org/package/simplebar"><img alt="NPM version" src="https://img.shields.io/npm/v/simplebar.svg?style=flat-square" /></a>
  <a href="https://npmjs.org/package/simplebar"><img alt="NPM downloads" src="https://img.shields.io/npm/dm/simplebar.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/grsmto/simplebar"><img alt="Build Status" src="https://img.shields.io/travis/grsmto/simplebar/master.svg?style=flat-square" /></a>
  <a href="https://automate.browserstack.com/public-build/amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%"><img src='https://automate.browserstack.com/badge.svg?badge_key=amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%'/></a>
</p>
<br hidden />
SimpleBar does only one thing: replace the browser's default scrollbar with a custom CSS-styled one without losing performances.
Unlike some popular plugins, SimpleBar doesn't mimic scroll with Javascript, causing janks and strange scrolling behaviours...
You keep the awesomeness of native scrolling...with a custom scrollbar!

SimpleBar **does NOT implement a custom scroll behaviour**. It keeps the **native** `overflow: auto` scroll and **only** replace the scrollbar visual appearance.

#### Design it as you want

SimpleBar uses pure CSS to style the scrollbar. You can easily customize it as you want! Or even have multiple style on the same page...or just keep the default style ("Mac OS" scrollbar style).

#### Lightweight and performant

Only 6kb minified. SimpleBar doesn't use Javascript to handle scrolling. You keep the performances/behaviours of the native scroll.

#### Supported everywhere

SimpleBar has been tested on the following browsers: Chrome, Firefox, Safari, Edge, IE11.

### Getting started

The easiest way to use SimpleBar is with the default dependency-free version: `npm install simplebar`.

- [Core documentation](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar)

If you are using a framework, SimpleBar also supports the most popular ones: Vue, Angular and React.

- [React documentation](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react)
- [Angular documentation](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-angular)
- [Vue documentation](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-vue)

### Demo

You can check our [demo page](https://grsmto.github.io/simplebar/examples) (which is also the one we use for automated tests).

### Limitations

Before using SimpleBar it's important to know its [limitations](https://github.com/Grsmto/simplebar/blob/master/packages/simplebar/README.md#5-caveats)!

### Changelog

See changelog here : https://github.com/Grsmto/simplebar/releases

### Credits

- [KingSora](https://github.com/KingSora) for multiple features and inspirations (`height: auto` detection, RTL mode cross browser support and more) with [OverlayScrollbars](https://kingsora.github.io/OverlayScrollbars/).
- [Jonathan Nicol](http://www.f6design.com/) for original idea with [Trackpad Scroll Emulator](https://github.com/jnicol/trackpad-scroll-emulator).
- [Cassio Bittencourt](https://cassiobittencourt.com/) for the logo design.
