# (Thu Jun 13 2024)

#### 🐛 Bug Fix

- `simplebar-angular@3.2.6`, `simplebar-core@1.2.6`, `simplebar-react@3.2.6`, `simplebar-vue@2.3.5`, `simplebar@6.2.7`
  - Add tabIndex as a configurable option. [#695](https://github.com/Grsmto/simplebar/pull/695) ([@shubham-padia](https://github.com/shubham-padia))
- `simplebar@6.2.7`
  - Correct `SimpleBar.instances` type [#689](https://github.com/Grsmto/simplebar/pull/689) ([@andersk](https://github.com/andersk))
  - Fix typo in README (simplebar/src/simplebar) [#647](https://github.com/Grsmto/simplebar/pull/647) ([@DenisSvistoplasov](https://github.com/DenisSvistoplasov))
- `simplebar-core@1.2.6`
  - Do not hide scrollbar if the mouse is being dragged and not yet released. [#684](https://github.com/Grsmto/simplebar/pull/684) ([@thomasdao](https://github.com/thomasdao))
  - fix(core): Fix vertical scrollbar dragging in rtl mode [#666](https://github.com/Grsmto/simplebar/pull/666) ([@GSilidis](https://github.com/GSilidis))
- `simplebar-react@3.2.6`
  - Fix typo in README (react) [#682](https://github.com/Grsmto/simplebar/pull/682) (joohaem.lee@tridge.com [@joohaem](https://github.com/joohaem))
- `simplebar-vue@2.3.5`
  - fix(vue&react): fix some demo codes  in examples and README [#668](https://github.com/Grsmto/simplebar/pull/668) ([@X-sky](https://github.com/X-sky))
- `simplebar-core@1.2.6`, `simplebar@6.2.7`
  - Add types field to package.json [#661](https://github.com/Grsmto/simplebar/pull/661) ([@andersk](https://github.com/andersk))

#### ⚠️ Pushed to `master`

- upgrade to node v20 (oi@adriendenat.com)
- update angular example to angular 18 (oi@adriendenat.com)
- fix(examples): fix wrong bundle path (oi@adriendenat.com)
- fix(examples): fix example page to work on IE11 (oi@adriendenat.com)
- chore: only use Auto for changelog so we control semver manually (oi@adriendenat.com)
- chore: add local.log to gitignore (oi@adriendenat.com)
- chore: upgrade lerna (oi@adriendenat.com)
- chore: add basic jquery example + fix the iframe demo (oi@adriendenat.com)
- fix(website): fix images urls (oi@adriendenat.com)
- chore: bring back skip cleanup in Travis config (oi@adriendenat.com)
- Revert "chore: remove browserstack access key from travis conf" (oi@adriendenat.com)
- chore: remove browserstack access key from travis conf (oi@adriendenat.com)
- `simplebar-core@1.2.6`, `simplebar@6.2.7`
  - remove can-use-dom dependency (oi@adriendenat.com)
  - Revert "feat(core): simplify scrollbar width customisation using css custom property" (oi@adriendenat.com)
  - feat(core): simplify scrollbar width customisation using css custom property (oi@adriendenat.com)
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.6`
  - fix angular setup + add missing license field (oi@adriendenat.com)
  - update Angular deps + fix example (oi@adriendenat.com)
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar-angular@3.2.6`, `simplebar-core@1.2.6`, `simplebar-react@3.2.6`, `simplebar-vue@2.3.5`, `simplebar@6.2.7`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-core@1.2.6`
  - Revert "chore(core): revert change in simplebar-core" (oi@adriendenat.com)
  - chore(core): revert change in simplebar-core (oi@adriendenat.com)
  - fix(core): fix missing Lodash dependency (fix #655) (oi@adriendenat.com)
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar@6.2.7`
  - Publish (oi@adriendenat.com)
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-vue@2.3.5`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.6`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-react@3.2.6`, `simplebar-vue@2.3.5`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.6`, `simplebar-core@1.2.6`, `simplebar-react@3.2.6`, `simplebar-vue@2.3.5`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 9

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
- Anders Kaseorg ([@andersk](https://github.com/andersk))
- Grigorii Silidis ([@GSilidis](https://github.com/GSilidis))
- Joohaem Lee (joohaem.lee@tridge.com)
- Shubham Padia ([@shubham-padia](https://github.com/shubham-padia))
- SNUPI ([@joohaem](https://github.com/joohaem))
- Thomas Dao ([@thomasdao](https://github.com/thomasdao))
- tse0103x ([@X-sky](https://github.com/X-sky))

---

# (Sun May 05 2024)

#### 🐛 Bug Fix

- `simplebar@6.2.6`
  - Correct `SimpleBar.instances` type [#689](https://github.com/Grsmto/simplebar/pull/689) ([@andersk](https://github.com/andersk))
  - Fix typo in README (simplebar/src/simplebar) [#647](https://github.com/Grsmto/simplebar/pull/647) ([@DenisSvistoplasov](https://github.com/DenisSvistoplasov))
- `simplebar-core@1.2.5`
  - Do not hide scrollbar if the mouse is being dragged and not yet released. [#684](https://github.com/Grsmto/simplebar/pull/684) ([@thomasdao](https://github.com/thomasdao))
  - fix(core): Fix vertical scrollbar dragging in rtl mode [#666](https://github.com/Grsmto/simplebar/pull/666) ([@GSilidis](https://github.com/GSilidis))
- `simplebar-react@3.2.5`
  - Fix typo in README (react) [#682](https://github.com/Grsmto/simplebar/pull/682) (joohaem.lee@tridge.com [@joohaem](https://github.com/joohaem))
- `simplebar-vue@2.3.4`
  - fix(vue&react): fix some demo codes  in examples and README [#668](https://github.com/Grsmto/simplebar/pull/668) ([@X-sky](https://github.com/X-sky))
- `simplebar-core@1.2.5`, `simplebar@6.2.6`
  - Add types field to package.json [#661](https://github.com/Grsmto/simplebar/pull/661) ([@andersk](https://github.com/andersk))

#### ⚠️ Pushed to `master`

- fix(examples): fix wrong bundle path ([@Grsmto](https://github.com/Grsmto))
- fix(examples): fix example page to work on IE11 ([@Grsmto](https://github.com/Grsmto))
- chore: only use Auto for changelog so we control semver manually ([@Grsmto](https://github.com/Grsmto))
- chore: add local.log to gitignore ([@Grsmto](https://github.com/Grsmto))
- chore: upgrade lerna ([@Grsmto](https://github.com/Grsmto))
- chore: add basic jquery example + fix the iframe demo ([@Grsmto](https://github.com/Grsmto))
- fix(website): fix images urls ([@Grsmto](https://github.com/Grsmto))
- chore: bring back skip cleanup in Travis config ([@Grsmto](https://github.com/Grsmto))
- Revert "chore: remove browserstack access key from travis conf" ([@Grsmto](https://github.com/Grsmto))
- chore: remove browserstack access key from travis conf ([@Grsmto](https://github.com/Grsmto))
- `simplebar-angular@3.2.5`, `simplebar-core@1.2.5`, `simplebar-react@3.2.5`, `simplebar-vue@2.3.4`, `simplebar@6.2.6`
  - Publish ([@Grsmto](https://github.com/Grsmto))
  - Revert "chore: remove unnecessary build step" ([@Grsmto](https://github.com/Grsmto))
  - chore: update READMEs ([@Grsmto](https://github.com/Grsmto))
- `simplebar-core@1.2.5`
  - Revert "chore(core): revert change in simplebar-core" ([@Grsmto](https://github.com/Grsmto))
  - chore(core): revert change in simplebar-core ([@Grsmto](https://github.com/Grsmto))
  - fix(core): fix missing Lodash dependency (fix #655) ([@Grsmto](https://github.com/Grsmto))
  - chore: fix lodash-es in tests ([@Grsmto](https://github.com/Grsmto))
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade ([@Grsmto](https://github.com/Grsmto))
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs ([@Grsmto](https://github.com/Grsmto))
  - chore(core): update tests after changes ([@Grsmto](https://github.com/Grsmto))
  - fix(core): fix scrollbar hiding even while scrolling ([@Grsmto](https://github.com/Grsmto))
  - fix(core): fix overflow: auto applied to wrong element on new v6 release ([@Grsmto](https://github.com/Grsmto))
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element ([@Grsmto](https://github.com/Grsmto))
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false ([@Grsmto](https://github.com/Grsmto))
- `simplebar@6.2.6`
  - Publish ([@Grsmto](https://github.com/Grsmto))
  - fix: fix README (ref #648 #645) ([@Grsmto](https://github.com/Grsmto))
  - fix(vanilla): fix wrong browser export (fix #639) ([@Grsmto](https://github.com/Grsmto))
- `simplebar-core@1.2.5`, `simplebar@6.2.6`
  - Revert "feat(core): simplify scrollbar width customisation using css custom property" ([@Grsmto](https://github.com/Grsmto))
  - feat(core): simplify scrollbar width customisation using css custom property ([@Grsmto](https://github.com/Grsmto))
  - feat(core): start adding support for multiple classNames (ref #651) ([@Grsmto](https://github.com/Grsmto))
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core ([@Grsmto](https://github.com/Grsmto))
- `simplebar-angular@3.2.5`
  - feat(angular): downgrade back to Angular version 12 for better support ([@Grsmto](https://github.com/Grsmto))
- `simplebar-vue@2.3.4`
  - feat(vue): migrate plugin to TS ([@Grsmto](https://github.com/Grsmto))
  - chore(vue): update snapshot ([@Grsmto](https://github.com/Grsmto))
- `simplebar-react@3.2.5`
  - chore: add Auto so we don't have to write releaes/changelogs manually ([@Grsmto](https://github.com/Grsmto))
  - fix(react): fix support for custom classNames ([@Grsmto](https://github.com/Grsmto))
  - fix(react): bring back data attribute to React plugin as it breaks CSS ([@Grsmto](https://github.com/Grsmto))
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin ([@Grsmto](https://github.com/Grsmto))
- `simplebar-react@3.2.5`, `simplebar-vue@2.3.4`
  - fix(vue, react): fix usage of custom classNames ([@Grsmto](https://github.com/Grsmto))
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite ([@Grsmto](https://github.com/Grsmto))
- `simplebar-angular@3.2.5`, `simplebar-core@1.2.5`, `simplebar-react@3.2.5`, `simplebar-vue@2.3.4`
  - chore(core, react, vue, angular): set missing accessibility properties ([@Grsmto](https://github.com/Grsmto))

#### Authors: 8

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
- Anders Kaseorg ([@andersk](https://github.com/andersk))
- Grigorii Silidis ([@GSilidis](https://github.com/GSilidis))
- Joohaem Lee (joohaem.lee@tridge.com)
- SNUPI ([@joohaem](https://github.com/joohaem))
- Thomas Dao ([@thomasdao](https://github.com/thomasdao))
- tse0103x ([@X-sky](https://github.com/X-sky))

---

# (Sat Apr 15 2023)

#### 🐛 Bug Fix

- `simplebar-core@1.2.4`
  - fix(core): Fix vertical scrollbar dragging in rtl mode [#666](https://github.com/Grsmto/simplebar/pull/666) ([@GSilidis](https://github.com/GSilidis))
- `simplebar-core@1.2.4`, `simplebar@6.2.5`
  - Add types field to package.json [#661](https://github.com/Grsmto/simplebar/pull/661) ([@andersk](https://github.com/andersk))
- `simplebar@6.2.5`
  - Fix typo in README (simplebar/src/simplebar) [#647](https://github.com/Grsmto/simplebar/pull/647) ([@DenisSvistoplasov](https://github.com/DenisSvistoplasov))

#### ⚠️ Pushed to `master`

- fix(examples): fix wrong bundle path (oi@adriendenat.com)
- fix(examples): fix example page to work on IE11 (oi@adriendenat.com)
- chore: only use Auto for changelog so we control semver manually (oi@adriendenat.com)
- chore: add local.log to gitignore (oi@adriendenat.com)
- chore: upgrade lerna (oi@adriendenat.com)
- chore: add basic jquery example + fix the iframe demo (oi@adriendenat.com)
- fix(website): fix images urls (oi@adriendenat.com)
- chore: bring back skip cleanup in Travis config (oi@adriendenat.com)
- Revert "chore: remove browserstack access key from travis conf" (oi@adriendenat.com)
- chore: remove browserstack access key from travis conf (oi@adriendenat.com)
- `simplebar-angular@3.2.4`, `simplebar-core@1.2.4`, `simplebar-react@3.2.4`, `simplebar-vue@2.3.3`, `simplebar@6.2.5`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-core@1.2.4`
  - Revert "chore(core): revert change in simplebar-core" (oi@adriendenat.com)
  - chore(core): revert change in simplebar-core (oi@adriendenat.com)
  - fix(core): fix missing Lodash dependency (fix #655) (oi@adriendenat.com)
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar@6.2.5`
  - Publish (oi@adriendenat.com)
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-core@1.2.4`, `simplebar@6.2.5`
  - Revert "feat(core): simplify scrollbar width customisation using css custom property" (oi@adriendenat.com)
  - feat(core): simplify scrollbar width customisation using css custom property (oi@adriendenat.com)
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.4`
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar-vue@2.3.3`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.4`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-react@3.2.4`, `simplebar-vue@2.3.3`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.4`, `simplebar-core@1.2.4`, `simplebar-react@3.2.4`, `simplebar-vue@2.3.3`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 4

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
- Anders Kaseorg ([@andersk](https://github.com/andersk))
- Grigoriy Silidis ([@GSilidis](https://github.com/GSilidis))

---

# (Wed Mar 29 2023)

#### 🐛 Bug Fix

- `simplebar-core@1.2.3`, `simplebar@6.2.4`
  - Add types field to package.json [#661](https://github.com/Grsmto/simplebar/pull/661) ([@andersk](https://github.com/andersk))
- `simplebar@6.2.4`
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
- `simplebar-core@1.2.3`
  - Revert "chore(core): revert change in simplebar-core" (oi@adriendenat.com)
  - chore(core): revert change in simplebar-core (oi@adriendenat.com)
  - fix(core): fix missing Lodash dependency (fix #655) (oi@adriendenat.com)
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar@6.2.4`
  - Publish (oi@adriendenat.com)
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-angular@3.2.3`, `simplebar-core@1.2.3`, `simplebar-react@3.2.3`, `simplebar-vue@2.3.2`, `simplebar@6.2.4`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-core@1.2.3`, `simplebar@6.2.4`
  - Revert "feat(core): simplify scrollbar width customisation using css custom property" (oi@adriendenat.com)
  - feat(core): simplify scrollbar width customisation using css custom property (oi@adriendenat.com)
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.3`
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar-vue@2.3.2`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.3`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-react@3.2.3`, `simplebar-vue@2.3.2`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.3`, `simplebar-core@1.2.3`, `simplebar-react@3.2.3`, `simplebar-vue@2.3.2`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 3

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
- Anders Kaseorg ([@andersk](https://github.com/andersk))

---

# (Mon Mar 27 2023)

#### 🐛 Bug Fix

- `simplebar-core@1.2.3`, `simplebar@6.2.3`
  - Add types field to package.json [#661](https://github.com/Grsmto/simplebar/pull/661) ([@andersk](https://github.com/andersk))
- `simplebar@6.2.3`
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
- `simplebar-core@1.2.3`
  - chore(core): revert change in simplebar-core (oi@adriendenat.com)
  - fix(core): fix missing Lodash dependency (fix #655) (oi@adriendenat.com)
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar-angular@3.2.3`, `simplebar-core@1.2.3`, `simplebar-react@3.2.3`, `simplebar-vue@2.3.2`, `simplebar@6.2.3`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-core@1.2.3`, `simplebar@6.2.3`
  - Revert "feat(core): simplify scrollbar width customisation using css custom property" (oi@adriendenat.com)
  - feat(core): simplify scrollbar width customisation using css custom property (oi@adriendenat.com)
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.3`
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar@6.2.3`
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-vue@2.3.2`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.3`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-react@3.2.3`, `simplebar-vue@2.3.2`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.3`, `simplebar-core@1.2.3`, `simplebar-react@3.2.3`, `simplebar-vue@2.3.2`
  - chore(core, react, vue, angular): set missing accessibility properties (oi@adriendenat.com)

#### Authors: 3

- [@DenisSvistoplasov](https://github.com/DenisSvistoplasov)
- Adrien Denat ([@Grsmto](https://github.com/Grsmto))
- Anders Kaseorg ([@andersk](https://github.com/andersk))

---

# (Sun Mar 19 2023)

#### 🐛 Bug Fix

- `simplebar@6.2.2`
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
- `simplebar-core@1.2.2`
  - fix(core): fix missing Lodash dependency (fix #655) (oi@adriendenat.com)
  - chore: fix lodash-es in tests (oi@adriendenat.com)
  - fix(examples): fix Webpack version mismatch after Angular plugin downgrade (oi@adriendenat.com)
  - chore(core): rollback to lodash-es so Angular doesn't complain of cjs (oi@adriendenat.com)
  - chore(core): update tests after changes (oi@adriendenat.com)
  - fix(core): fix scrollbar hiding even while scrolling (oi@adriendenat.com)
  - fix(core): fix overflow: auto applied to wrong element on new v6 release (oi@adriendenat.com)
  - feat(core): set "overflow: auto" by default instead of "hidden" on scrollable element (oi@adriendenat.com)
  - fix(core): fix scrollbar not showing up initially for framework plugins when autoHide: false (oi@adriendenat.com)
- `simplebar-core@1.2.2`, `simplebar@6.2.2`
  - Revert "feat(core): simplify scrollbar width customisation using css custom property" (oi@adriendenat.com)
  - feat(core): simplify scrollbar width customisation using css custom property (oi@adriendenat.com)
  - feat(core): start adding support for multiple classNames (ref #651) (oi@adriendenat.com)
  - feat(core, vanilla): remove all unnecessary DOM manipulations from core (oi@adriendenat.com)
- `simplebar-angular@3.2.2`, `simplebar-core@1.2.2`, `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`, `simplebar@6.2.2`
  - Publish (oi@adriendenat.com)
  - Revert "chore: remove unnecessary build step" (oi@adriendenat.com)
  - chore: update READMEs (oi@adriendenat.com)
- `simplebar-angular@3.2.2`
  - feat(angular): downgrade back to Angular version 12 for better support (oi@adriendenat.com)
- `simplebar@6.2.2`
  - fix: fix README (ref #648 #645) (oi@adriendenat.com)
  - fix(vanilla): fix wrong browser export (fix #639) (oi@adriendenat.com)
- `simplebar-vue@2.3.1`
  - feat(vue): migrate plugin to TS (oi@adriendenat.com)
  - chore(vue): update snapshot (oi@adriendenat.com)
- `simplebar-react@3.2.2`
  - chore: add Auto so we don't have to write releaes/changelogs manually (oi@adriendenat.com)
  - fix(react): fix support for custom classNames (oi@adriendenat.com)
  - fix(react): bring back data attribute to React plugin as it breaks CSS (oi@adriendenat.com)
  - fix(react): prevent conflict between vanilla SimpleBar and react plugin (oi@adriendenat.com)
- `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`
  - fix(vue, react): fix usage of custom classNames (oi@adriendenat.com)
  - feat(vue): set data-attribute on Vue plugin to be 1:1 with other plugins + bring back full test suite (oi@adriendenat.com)
- `simplebar-angular@3.2.2`, `simplebar-core@1.2.2`, `simplebar-react@3.2.2`, `simplebar-vue@2.3.1`
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
