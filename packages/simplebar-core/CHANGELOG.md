# v1.2.1 (Sat Feb 11 2023)

#### ⚠️ Pushed to `master`

- chore: fix lodash-es in tests (oi@adriendenat.com)
- fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
- feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
- chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
- Publish (oi@adriendenat.com)
- chore(core): update tests after changes (oi@adriendenat.com)
- feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
- fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
- chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)
- fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
- feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
- fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- chore: update READMEs (oi@adriendenat.com)

#### Authors: 1

- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

## 6.0.0

### Major

- :warning: SimpleBar v6 does not use any polyfill anymore by default!
  If you see any error in a browser you want support for, you might need a polyfill!
  You can use Babel `@babel/preset-env` to polyfill for you, see our [examples package](https://github.com/Grsmto/simplebar/blob/next/packages/examples/.babelrc#L2) or check out [polyfill.io](https://polyfill.io/).
- Scrollable div now comes with `overflow: auto` by default instead of `overflow: hidden`. This is to allow for graceful fallback if user has JS disabled (or if there is an error that prevents SimpleBar from initialising)> Previously we were relying on the use of `<noscript />` tag but this is better for accessibility to fallback by default. This change should only have an impact on older browsers that don't support hidding of the scrollbar with CSS.
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
