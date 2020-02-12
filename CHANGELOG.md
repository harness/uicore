# CHANGELOG

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning. Use prefixes (Added, Changed, Deprecated, Removed, Fixed, Security) for each change.

## 1.0.63 - 02/11/20

- `Fixed` build to generate latest/correct TypeScript types.

## 1.0.62 - 02/11/20

- `Added` `Utils.WrapOptionalTooltip` to wrap optional tooltip to any components.

## 1.0.61 - 02/04/20

- `Added` Skip steps Icons.

## 1.0.60 - 02/04/20

- `Changed` FieldArray now expects value in change handler to support custom elements.
- `Added` More FieldArray examples

## 1.0.59 - 02/01/20

- Multiselect to include custom renderer, Field Array to have custom label for header and updated Field Array example.

## 1.0.58 - 02/01/20

- `Changed` `Link` component to append hash to be compatible with hash routing in wingsui (can be disabled using Config).

## 1.0.57 - 01/31/20

- Export `useTween` and `Easing`.

## 1.0.56 - 01/31/20

- Date range picker now retains the selected shortcut index.

## 1.0.55 - 01/30/20

- Fixed the NaN case and date date check for `DateInput` component for fixes.

## 1.0.54 - 01/29/20

- `Changed` Added links to the Blueprint component extended in `DateRangePickerButton`, in the README.

## 1.0.53 - 01/29/20

- `Changed` flexGrow prop of `FlexExpander' to be optional.
- `Changed` CircularPercentageChart annimation from CSS to `useTween`.
- `Added` `useTween` hook.

## 1.0.52 - 01/28/20

- `Added` `DateRangePickerButton' component.

## 1.0.51 - 01/28/20

- `Added` `FlexExpander' utility component.

## 1.0.50 - 01/27/20

- `Changed` `FieldArray` interface for custom renderer to support HTMLSelectElement in onChange

## 1.0.49 - 01/25/20

- `Change` `DateInput` component for fixes.

## 1.0.48 - 01/25/20

- `Added` `DateInput` component.

## 1.0.47 - 01/22/20

- `Added` `OptionsButtonGroup` component.

## 1.0.46 - 01/21/20

- `Changed` interface for FieldArray custom renderer to support passing rowIndex

## 1.0.45 - 01/21/20

- `Changed` StyledProps `width` and `height` can be passed by number (defaulted to pixel).

## 1.0.44 - 01/21/20

- `Added` `ButtonGroup` component.

## 1.0.43 - 01/20/20

- `Added` `CircularPercentageChart` chart component.

## 1.0.42 - 01/14/20

- `Added` `Instana` icon.

## 1.0.41 - 01/07/20

- `Changed` `@blueprintjs/select` from 3.11.2 to 3.10.0.

## 1.0.40 - 01/03/20

- `Added` `UseModalBinding` export.

## 1.0.39 - 01/03/20

- `Added` `UseModalBinding` component to easily use `useModal` in class-based components.

## 1.0.38 - 01/03/20

- `Added` Modal `draggable` option.
- `Fixed` Modal title dragging icon when draggable if off.
- `Changed` script to hit UIKit documentation site to force NextJS cache.

## 1.0.37 - 01/02/20

- `Added` interface documentation for ModalOptions.
- `Fixed` `Utils.getIntentColors` logic.

## 1.0.36 - 01/02/20

- `Added` a couple of small improments.
- `Fixed` `isMounted` hook usage in `Button` component.

## 1.0.35 - 01/02/20

- `Changed` spread operator to concat to be compatible with wingsui.

## 1.0.34 - 12/30/19

- `Added` new modal system (useModal).
- `Changed` Color type definition to support reference like Intent.
- `Added` `Utils.randomId`, `Utils.getIntentColors`.
- `Changed` Layout props to have proper StyledProps typing.
- `Added` proper export for `Intent` and `Color`.
- `Added` export for `useIsMounted`.

## 1.0.33 - 12/23/19

- `Added` FieldArray component

## 1.0.32 - 12/20/09

- `Added` useIsMounted hook.
- `Fixed` React warning when `setLoading` is called while its `Button` instance is already unmounted.

## 1.0.31 - 12/06/09

- `Added` HTML attributes support to `<Button/>` component.

## 1.0.30 - 12/05/09

- `Added` useToggle, useToggleWithLocalStorage hooks.
- `Added` ServiceAzdevops icon.

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
