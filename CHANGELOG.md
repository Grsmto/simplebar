# (Sat Oct 21 2023)

#### 🐛 Bug Fix

- `simplebar@6.2.2`
  - Fix typo in README (simplebar/src/simplebar) [#647](https://github.com/Grsmto/simplebar/pull/647) ([@DenisSvistoplasov](https://github.com/DenisSvistoplasov))

#### ⚠️ Pushed to `next`

- chore: add mention of OverlayScrollbars in README (oi@adriendenat.com)
- chore(examples): add story with host element scaled (oi@adriendenat.com)
- chore(examples): update example to support IE11 (oi@adriendenat.com)
- chore: update react example deps (oi@adriendenat.com)
- chore(examples): add stories (oi@adriendenat.com)
- chore(examples): add react-window + Virtual stories (oi@adriendenat.com)
- feat(examples): add Storybook instead of old demo page (oi@adriendenat.com)
- chore: only use Auto for changelog so we control semver manually (oi@adriendenat.com)
- chore: add local.log to gitignore (oi@adriendenat.com)
- chore: upgrade lerna (oi@adriendenat.com)
- chore: add basic jquery example + fix the iframe demo (oi@adriendenat.com)
- fix(website): fix images urls (oi@adriendenat.com)
- chore: bring back skip cleanup in Travis config (oi@adriendenat.com)
- Revert "chore: remove browserstack access key from travis conf" (oi@adriendenat.com)
- chore: remove browserstack access key from travis conf (oi@adriendenat.com)
- `simplebar@6.2.2`
  - chore(vanilla): copy update (oi@adriendenat.com)
  - fix(vanilla): make sure element is not already initialised before instantiating (ref #653) (oi@adriendenat.com)
  - chore(vanilla): update after core DOM structure changes (oi@adriendenat.com)
  - fix(vanilla): add missing types prop in package.json (oi@adriendenat.com)
  - chore(examples): cleanup demos (oi@adriendenat.com)
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-vue@2.3.1`
  - chore(vue): fix wrong template (oi@adriendenat.com)
  - chore(vue): update snapshots (oi@adriendenat.com)
  - chore(vue): move source code to /src (oi@adriendenat.com)
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.2`
  - chore(react): update snapshots (oi@adriendenat.com)
  - feat(react): add onScroll support to react plugin (oi@adriendenat.com)
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`
  - chore(react|vue): merge custom classes with default ones (oi@adriendenat.com)
  - feat(react, vue): add stylesheet prop to package.json (oi@adriendenat.com)
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-core@1.2.2`
  - chore(core): disable e2e until we get Storybook tests + fix types (oi@adriendenat.com)
  - chore(core): fix tests (oi@adriendenat.com)
  - fix(core): escape custom classes for query selectors (fix #674) (oi@adriendenat.com)
  - fix(core): cherry pick cd1cfbc ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
  - cherry pick [1833e35] (oi@adriendenat.com)
  - chore(core): update tests (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding while being dragged (oi@adriendenat.com)
  - fix(core): fix wrong dimensions calculation if host element is scaled (oi@adriendenat.com)
  - chore(core): fix typing on cache measurement helper + remove overflow styles from scrollable node (oi@adriendenat.com)
  - feat(core): rework RTL support and use CSS for most of the work + add support for both axis corner (oi@adriendenat.com)
  - chore(core): bring back content element since it helps resize detection (oi@adriendenat.com)
  - chore(core): improve caching function (oi@adriendenat.com)
  - feat(core): remove contentEl since it's not needed anymore (oi@adriendenat.com)
  - fix(core): do not edit className if it's identical to the default one (oi@adriendenat.com)
  - fix(core): fix host size measurement + add caching helper (oi@adriendenat.com)
  - feat(core): improve support for both axis with corner gap (oi@adriendenat.com)
  - feat(core): separate track size from scrollbar size for easier styling (oi@adriendenat.com)
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - feat(core): add class name to track so it can be auto hidden (ref #416) (oi@adriendenat.com)
  - feat(core): remove unused native scrollbar width calculation + remove unused DOM nodes (oi@adriendenat.com)
  - feat(core): merge custom classnames with default ones instead of fully overriding (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar-angular@3.2.2`, `simplebar-vue@2.3.1`
  - chore(vue|angular): fix build (oi@adriendenat.com)
- `simplebar-angular@3.2.2`
  - chore(angular): update template (oi@adriendenat.com)
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar-core@1.2.2`, `simplebar-react@3.2.2`
  - feat(core, react): add intersectionObserver to detect direction styling changes dynamically (oi@adriendenat.com)
- `simplebar-core@1.2.2`, `simplebar-react@3.2.2`, `simplebar@6.2.2`
  - chore(core, react): remove height auto observer since not needed anymore (oi@adriendenat.com)
- `simplebar-angular@3.2.2`, `simplebar-core@1.2.2`, `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`, `simplebar@6.2.2`
  - Merge branch 'master' into next (oi@adriendenat.com)
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-core@1.2.2`, `simplebar@6.2.2`
  - feat(core): simplify scrollbar width customisation using css custom property (oi@adriendenat.com)
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.2`, `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`, `simplebar@6.2.2`
  - chore: update templates on all plugins (oi@adriendenat.com)
- `simplebar-angular@3.2.2`, `simplebar-core@1.2.2`, `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 3

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien ([@adrien-denat-qatalog](https://github.com/adrien-denat-qatalog))
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Sat Feb 11 2023)

#### 🐛 Bug Fix

- `simplebar@6.2.1`
  - Fix typo in README (simplebar/src/simplebar) [#647](https://github.com/Grsmto/simplebar/pull/647) ([@DenisSvistoplasov](https://github.com/DenisSvistoplasov))

#### ⚠️ Pushed to `master`

- chore: only use Auto for changelog so we control semver manually (oi@adriendenat.com)
- chore: add local.log to gitignore (oi@adriendenat.com)
- chore: upgrade lerna (oi@adriendenat.com)
- chore: add basic jquery example + fix the iframe demo (oi@adriendenat.com)
- fix(website): fix images urls (oi@adriendenat.com)
- chore: bring back skip cleanup in Travis config (oi@adriendenat.com)
- Revert "chore: remove browserstack access key from travis conf" (oi@adriendenat.com)
- chore: remove browserstack access key from travis conf (oi@adriendenat.com)
- `simplebar-core@1.2.1`
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar-core@1.2.1`, `simplebar@6.2.1`
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.1`
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar@6.2.1`
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-vue@2.2.1`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.1`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-angular@3.2.1`, `simplebar-core@1.2.1`, `simplebar-react@3.2.1`, `simplebar-vue@2.2.1`, `simplebar@6.2.1`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-react@3.2.1`, `simplebar-vue@2.2.1`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.1`, `simplebar-core@1.2.1`, `simplebar-react@3.2.1`, `simplebar-vue@2.2.1`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 2

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))

---

# (Sat Feb 11 2023)

#### 🐛 Bug Fix

- `simplebar@6.2.1`
  - Fix typo in README (simplebar/src/simplebar) [#647](https://github.com/Grsmto/simplebar/pull/647) ([@DenisSvistoplasov](https://github.com/DenisSvistoplasov))

#### ⚠️ Pushed to `master`

- chore: upgrade lerna (oi@adriendenat.com)
- chore: add basic jquery example + fix the iframe demo (oi@adriendenat.com)
- fix(website): fix images urls (oi@adriendenat.com)
- chore: bring back skip cleanup in Travis config (oi@adriendenat.com)
- Revert "chore: remove browserstack access key from travis conf" (oi@adriendenat.com)
- chore: remove browserstack access key from travis conf (oi@adriendenat.com)
- `simplebar-core@1.2.1`
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar-core@1.2.1`, `simplebar@6.2.1`
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.1`
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar@6.2.1`
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-vue@2.2.1`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.1`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-angular@3.2.1`, `simplebar-core@1.2.1`, `simplebar-react@3.2.1`, `simplebar-vue@2.2.1`, `simplebar@6.2.1`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-react@3.2.1`, `simplebar-vue@2.2.1`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.1`, `simplebar-core@1.2.1`, `simplebar-react@3.2.1`, `simplebar-vue@2.2.1`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 2

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
