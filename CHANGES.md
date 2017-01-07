## [v2.0.3]
> Jan 7, 2017

- **Fix:** Scrollbar size was not recalculated properly on the Y axis (#49)
- **Fix:** Scrollbar size calculation was wrong when reaching the minimum width/height and was breaking the layout in certain situations (#46)
- **Fix:** Options were just not working properly :)
- **Feature:** Scrollbar minimum size is now configurable with an option (`data-simplebar-scrollbar-min-size' on the element or via options object `scrollbarMinSize`) (#44)

[v2.0.3]: https://github.com/Grsmto/simplebar/compare/v2.0.1...v2.0.3

## v2.0.0-beta.1
> Oct 7, 2016

- **Feature:** No need to manually instantiate SimpleBar with `new` or to call `recalculate()` anymore. Thanks to mutation observers, this is handled "automatically". Just add `data-simplebar` to any scrollable element you want and it will be SimpleBar-ified.
- **Feature:** No need to know what scroll direction you want, horizontal and vertical scrolls are now supported simultaneously.
- **Feature:** Dependency free. Fully rewritten with ES6 (transpiled to ES6 using Babel).
