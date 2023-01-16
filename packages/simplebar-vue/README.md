<p align="center">
  <img src="https://user-images.githubusercontent.com/527559/66231995-3cd0c380-e6be-11e9-8782-c50c834aac93.png" width="570" alt="SimpleBar" />
</p>
<br/>
<p align="center" style="margin: 40px;">
  <a href="https://npmjs.org/package/simplebar-vue"><img alt="NPM version" src="https://img.shields.io/npm/v/simplebar-vue.svg?style=flat-square" /></a>
  <a href="https://npmjs.org/package/simplebar-vue"><img alt="NPM downloads" src="https://img.shields.io/npm/dm/simplebar-vue.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/grsmto/simplebar"><img alt="Build Status" src="https://img.shields.io/travis/grsmto/simplebar/master.svg?style=flat-square" /></a>
  <a href="https://automate.browserstack.com/public-build/amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%"><img src='https://automate.browserstack.com/badge.svg?badge_key=amtTU2pEa1FjNmpabTBCbUh2b3FpbFZQaXhNd1Q3bEg0L1dlSzd2SGN2Zz0tLWpjK1ZwWWRNWnVGQWI4OXphWGRISEE9PQ==--39b14340be576db5bd01b020627cd17414003bfb%'/></a>
</p>
<br/>

# SimplebarVue

- **🐦 Follow me on [Twitter!](https://twitter.com/adriendenat) or [Mastodon!](https://mas.to/@adrien)**
- **👨‍💻 I'm available for hire! [Reach out to me!](https://adriendenat.com/)**
- **🚧 Check out my new project [Scroll Snap Carousel](https://github.com/Grsmto/scroll-snap-carousel)!**

### Installation

**- Via npm**
`npm install simplebar-vue --save`

**- Via Yarn**
`yarn add simplebar-vue`

### Usage

Check out the [Demo project](https://github.com/Grsmto/simplebar/blob/master/examples/vue).

First, register it in your Vue app:

```js
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';

export default {
  components: {
    simplebar,
  },
};
```

Then you can use it in your template

```js
<template>
  <simplebar data-simplebar-auto-hide="false">
    // your content elements
  </simplebar>
</template>
```

**Don't forget to import both css and js in your project!**

### :warning: Warning!

SimpleBar is **not intended to be used on the `body` element!** I don't recommend wrapping your entire web page inside a custom scroll as it will often badly affect the user experience (slower scroll performance compared to the native body scroll, no native scroll behaviours like click on track, etc.). Do it at your own risk! SimpleBar is meant to improve the experience of **internal web page scrolling**; such as a chat box or a small scrolling area. **Please read the [caveats](#5-caveats) section first to be aware of the limitations!**

### Options

Find the list of available options on [the core documentation](https://github.com/Grsmto/simplebar/blob/master/packages/simplebar/README.md#options).

### Troubleshooting

If you are experiencing issues when setting up SimpleBar, it is most likely because your styles are clashing with SimpleBar ones. Make sure the element you are setting SimpleBar on does not override any SimpleBar css properties! **We recommend to not style that element at all and use an inner element instead.**

### Sponsors

Thanks to BrowserStack for sponsoring open source projects and letting us test SimpleBar for free.
<a href="https://www.browserstack.com" target="_blank">
<img src="https://user-images.githubusercontent.com/15015324/45184727-368fbf80-b1fe-11e8-8827-08dbc80b0fb1.png" width="200">
</a>
