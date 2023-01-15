## 6.0.0

### Major

- :warning: SimpleBar v6 does not use any polyfill anymore by default!
  If you see any error in a browser you want support for, you might need a polyfill!
  You can use Babel `@babel/preset-env` to polyfill for you, see our [examples package](https://github.com/Grsmto/simplebar/blob/next/packages/examples/.babelrc#L2) or check out [polyfill.io](https://polyfill.io/).
- `timeout` option is now deprecated. It is now only made with a CSS transition that you can override with CSS as you want.
- `mutation-observer` polyfill is not shipped by default anymore.
- `core-js` is not included anymore. We now use TypeScript instead of Babel so polyfilling is up to you!
- Bundle is much smaller!
- New useful classes on host element:
  `.simplebar-hover`,
  `.simplebar-mouse-entered`,
  `.simplebar-scrolling`,
  `.simplebar-scrollable`.
- Scrollbar recalculations are now throttled with RAQ instead of Lodash's throttle function, which prevents stuttering on animations (#507)
