# Changelog

All notable changes to `@fringeworks/types` are documented in this file.\
This project follows [Semantic Versioning](https://semver.org/).

## 1.3.0 - 2026-11-20

### Added

- `FormatFunction<VALUE, RESULT>`: a function that turns a value into a display string or similar (`(value) => RESULT`; `RESULT` defaults to `string`)
- `FormatObject<VALUE, RESULT>`: an object with a `format` method, such as `Intl.NumberFormat` and `Intl.DateTimeFormat`
- `Formatter<VALUE, RESULT>`: the union of `FormatFunction` and `FormatObject`
- `EqualityFunction<VALUE>`: a function that tells whether two values are equal (`(a, b) => boolean`, for `isEqual` options)
- `Interpolator<VALUE>`: a function that returns a value for the progress `t` (0 to 1), the same shape as interpolators in d3-interpolate
- `EasingFunction`: a function that turns the progress `t` into eased progress (`(t) => number`)

## 1.2.0 - 2026-11-12

### Added

- `FilterFunction<VALUE>`: a function that tells whether an element matches a condition (`(value) => boolean`, for `Array.prototype.filter`)
- `SortFunction<VALUE>`: a comparison function that returns the order of two elements (`(a, b) => number`, for `Array.prototype.sort`)

## 1.1.1 - 2026-11-07

### Changed

- Updated the development dependencies. There are no changes to the types or constants.

## 1.1.0 - 2026-11-07

### Added

- `AbsoluteColor`: a concrete CSS color value (hex colors, color functions, and color names), excluding values decided at render time such as `var()` and `currentColor`
- `HexColor`: a hex color (`#${string}`)
- `FunctionalColor`: a color written with a color function such as `rgb()`, `hsl()`, or `oklch()`
- `NamedColor`: CSS color names (the 148 names and `transparent`)

## 1.0.0 - 2026-10-25

First stable release.
