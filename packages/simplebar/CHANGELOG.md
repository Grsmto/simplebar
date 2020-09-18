## 6.0.0

### Major

- `autoHide` option is now deprecated. Use CSS instead:
  For `autoHide = false`: `.simplebar-scrollbar::before { opacity: 0.5 };`
- `classNames` option is now deprecated. Use CSS instead to override/change styles.
- `timeout` option is now deprecated. Use CSS instead.
- `mutation-observer` polyfill is not shipped by default anymore.
- New useful classes on host element:
  `.simplebar-hover`,
  `.simplebar-mouse-entered`,
  `.simplebar-scrolling`,
  `.simplebar-scrollable`.
- Scrollbar recalculations are now throttled with RAQ instead of Lodash's throttle function, which prevents stuttering on animations (#507)

### Bug fixes

- Prevent click on track to be triggered on touch events
