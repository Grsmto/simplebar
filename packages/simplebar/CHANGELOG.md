## 6.0.0

### Major

- `timeout` option is now deprecated. It is now only made with a CSS transition that you can override with CSS as you want.
- `mutation-observer` polyfill is not shipped by default anymore.
- New useful classes on host element:
  `.simplebar-hover`,
  `.simplebar-mouse-entered`,
  `.simplebar-scrolling`,
  `.simplebar-scrollable`.
- Scrollbar recalculations are now throttled with RAQ instead of Lodash's throttle function, which prevents stuttering on animations (#507)

### Bug fixes

- Prevent click on track to be triggered on touch events
