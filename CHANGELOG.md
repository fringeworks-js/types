# Changelog

All notable changes to `@fringeworks/types` are documented in this file.\
This project follows [Semantic Versioning](https://semver.org/).

## 1.1.0 - 2026-11-07

### Added

- `AbsoluteColor`: a concrete CSS color value (hex colors, color functions, and color names), excluding values decided at render time such as `var()` and `currentColor`
- `HexColor`: a hex color (`#${string}`)
- `FunctionalColor`: a color written with a color function such as `rgb()`, `hsl()`, or `oklch()`
- `NamedColor`: CSS color names (the 148 names and `transparent`)

## 1.0.0 - 2026-10-25

First stable release.
