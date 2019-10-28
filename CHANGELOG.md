# CHANGELOG

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning. Use prefixes (Added, Changed, Deprecated, Removed, Fixed, Security) for each change.

## 1.0.13 - 10/28/09

- `Added` Tab, and Link component.
- `Changed` Heading component now has only four levels (h1 to h4), aligned with HDL spec.
- `Changed` font prop to contain `size`, `weight`, `mono`, `align`.
- `Added` Icon component which consolidates both Harness and Blueprint icons.
- `Fixed` and cleaned up docs.

## 1.0.12 - 10/24/09

- `Fixed` uikit.yaml K8s spec for running uikit.harness.io.

## 1.0.11 - 10/24/09

- `Changed` Button loading state is always reset when onClick is rejected or resolved.

## 1.0.10 - 10/23/09

- `Changed` icons from Design.
- `Added` Loading state for Button.

## 1.0.9 - 10/22/09

- `Added` Icons (still need updates from Design).
- `Added` Styling for Button.

## 1.0.8 - 10/21/09

- `Fixed` Correct content on Documentation home page.

## 1.0.7 - 10/21/09

- `Changed` Make each styled prop a separate module in `styled-props` folder.
- `Changed` Layout's `margin` to `spacing`.
- `Fixed` Styled props components are not against each other in terms of styling inheritance anymore.
- `Changed` `color` prop now takes priority against `intent` prop.
- `Added` lint, formatter.

## 1.0.5 - 10/14/09

- `Changed` release-watcher script to reject building new release if CHANGELOG is not provided.

## 1.0.4 - 10/14/09

- `Added` README section on publishing.

## 1.0.3 - 10/14/09

- `Changed` package name to `@wings-software/uikit` to reflect GitHub Package Registry rule.

## 1.0.2 - 10/12/09

- `Added` scripts and K8s spec to run documentation site

## 1.0.1 - 10/12/09

- `Changed` release scripts

## 1.0.0 - 10/11/09

- Initial release
