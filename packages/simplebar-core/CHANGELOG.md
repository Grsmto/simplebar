# v1.2.2 (Sat Oct 21 2023)

#### 🐛 Bug Fix

- Update CHANGELOG.md \[skip ci\] ([@Grsmto](https://github.com/Grsmto))

#### ⚠️ Pushed to `next`

- chore(core): disable e2e until we get Storybook tests + fix types ([@Grsmto](https://github.com/Grsmto))
- chore(core): fix tests ([@Grsmto](https://github.com/Grsmto))
- fix(core): escape custom classes for query selectors (fix #674) ([@Grsmto](https://github.com/Grsmto))
- fix(core): cherry pick cd1cfbc ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- cherry pick [1833e35] ([@Grsmto](https://github.com/Grsmto))
- chore(core): update tests ([@Grsmto](https://github.com/Grsmto))
- fix(core): fix scrollbar hiding while being dragged ([@Grsmto](https://github.com/Grsmto))
- fix(core): fix wrong dimensions calculation if host element is scaled ([@Grsmto](https://github.com/Grsmto))
- chore(core): fix typing on cache measurement helper + remove overflow styles from scrollable node ([@Grsmto](https://github.com/Grsmto))
- feat(core, react): add intersectionObserver to detect direction styling changes dynamically ([@Grsmto](https://github.com/Grsmto))
- feat(core): rework RTL support and use CSS for most of the work + add support for both axis corner ([@Grsmto](https://github.com/Grsmto))
- chore(core): bring back content element since it helps resize detection ([@Grsmto](https://github.com/Grsmto))
- chore(core): improve caching function ([@Grsmto](https://github.com/Grsmto))
- feat(core): remove contentEl since it's not needed anymore ([@Grsmto](https://github.com/Grsmto))
- fix(core): do not edit className if it's identical to the default one ([@Grsmto](https://github.com/Grsmto))
- chore(core, react): remove height auto observer since not needed anymore ([@Grsmto](https://github.com/Grsmto))
- fix(core): fix host size measurement + add caching helper ([@Grsmto](https://github.com/Grsmto))
- feat(core): improve support for both axis with corner gap ([@Grsmto](https://github.com/Grsmto))
- feat(core): separate track size from scrollbar size for easier styling ([@Grsmto](https://github.com/Grsmto))
- Merge branch 'master' into next ([@Grsmto](https://github.com/Grsmto))
- feat(core): simplify scrollbar width customisation using css custom property ([@Grsmto](https://github.com/Grsmto))
- Publish ([@Grsmto](https://github.com/Grsmto))
- chore: fix lodash-es in tests ([@Grsmto](https://github.com/Grsmto))
- feat(core): add class name to track so it can be auto hidden (ref #416) ([@Grsmto](https://github.com/Grsmto))
- feat(core): remove unused native scrollbar width calculation + remove unused DOM nodes ([@Grsmto](https://github.com/Grsmto))
- feat(core): merge custom classnames with default ones instead of fully overriding ([@Grsmto](https://github.com/Grsmto))
- fix(examples): fix Webpack version mismatch after Angular plugin downgrade ([@Grsmto](https://github.com/Grsmto))
- feat(core): start adding support for multiple classNames (ref #651) ([@Grsmto](https://github.com/Grsmto))
- chore(core): rollback to lodash-es so Angular doesn't complain of cjs ([@Grsmto](https://github.com/Grsmto))
- chore(core): update tests after changes ([@Grsmto](https://github.com/Grsmto))
- feat(core, vanilla): remove all unnecessary DOM manipulations from core ([@Grsmto](https://github.com/Grsmto))
- Revert "chore: remove unnecessary build step" ([@Grsmto](https://github.com/Grsmto))
- fix(core): fix scrollbar hiding even while scrolling ([@Grsmto](https://github.com/Grsmto))
- chore(core, react, vue, angular): set missing accessibility properties ([@Grsmto](https://github.com/Grsmto))
- fix(core): fix overflow: auto applied to wrong element on new v6 release ([@Grsmto](https://github.com/Grsmto))
- feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element ([@Grsmto](https://github.com/Grsmto))
- fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false ([@Grsmto](https://github.com/Grsmto))
- chore: update READMEs ([@Grsmto](https://github.com/Grsmto))

#### Authors: 2

- Adrien ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# v1.2.1 (Sat Feb 11 2023)

#### 🐛 Bug Fix

- Update CHANGELOG.md \[skip ci\] (oi@adriendenat.com)

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
