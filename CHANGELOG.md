# CHANGELOG

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning. Use prefixes (Added, Changed, Deprecated, Removed, Fixed, Security) for each change.

## 1.0.29 - 12/03/09

- `Changed` Button transition to individual properties instead of all.

## 1.0.28 - 12/02/09

- `Added` className support into StyledProps.

## 1.0.27 - 11/25/09

- `Fixed` build issue in Jenkins.

## 1.0.26 - 11/25/09

- `Fixed` empty build 1.0.25.

## 1.0.25 - 11/25/09

- `Added` useService hook.
- `Added` [@wings-software/xhr-async](https://github.com/wings-software/xhr-async) as a peer dependency.

## 1.0.24 - 11/14/09

- `Added` Colors `grey-250` and `aqua-500`

## 1.0.23 - 11/11/09

- `Changed` TypeScript from 3.6 to 3.7.
- `Fixed` Link styling defaulted to grey.
- `Added` Link Button.

## 1.0.22 - 11/07/09

- `Added` active styling for Button component.
- `Fixed` icon padding in Button.

## 1.0.21 - 11/07/09

- `Changed` UIKit build output to ES5 instead of ES6.
- `Added` Tag, Switch, Radio component.

## 1.0.20 - 11/05/09

- `Added` `iconProps` to `<Button/>` component.

## 1.0.19 - 11/05/09

- `Fixed` broken colors page.

## 1.0.18 - 11/02/09

- `Fixed` broken sections in `/icon` doc.
- `Added` HTML attributes support to `<Icon/>` component.
- `Added` `<Icon/>` tests.

## 1.0.17 - 11/01/09

- `Added` `tooltip` prop for `<Button/>` and `<Link/>` components, implemented using Popover.

## 1.0.16 - 10/31/09

- `Added` StyledProps `width` and `height`.
- `Added` support `top`, `right`, `bottom`, `left` Spacing for `margin` and `padding`.

## 1.0.15 - 10/31/09

- `Added` Cypress snapshot tests for Button, Link, Container, Heading, Container, and Text.
- `Added` Button, Link, Container, Heading, Container, and Text now support their respective HTML standard attributes (id, data-\*, etc...).
- `Added` CSS variable `--font-size` under StyledProps to allow component to override font size.

## 1.0.14 - 10/28/09

- `Added` `<Container/>` component. Support `tag` name.
- `Changed` `<Icon/>` defaults size to `16`.

## 1.0.13 - 10/28/09

- `Added` Tab component.
- `Added` Link component.
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
