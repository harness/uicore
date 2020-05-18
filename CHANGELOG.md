# CHANGELOG

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to Semantic Versioning. Use prefixes (Added, Changed, Deprecated, Removed, Fixed, Security) for each change.

## 1.0.114- 05/18/20

- `Fixed` styling for MultiLevelSelect Component.

## 1.0.113- 05/18/20

- `Added` MultiLevelSelect Component.

## 1.0.112 - 05/17/20

- `Fixed` popover unselection is not in sync with tags.

## 1.0.111 - 05/16/20

- `Fixed` SimpleTagInput's selectedItems props does not update when props are changed.

## 1.0.110 - 05/16/20

- `Changed` styling of TagInput to match NextGen UI.
- `Added` new TagInput's props: noInputBorder, showAddTagButton, readonly.

## 1.0.109 - 05/15/20

- `Added` StackTraceList and StackTracePanel Components.

## 1.0.108 - 05/15/20

- `Fixed` duplicated issue on TagInput when fetching data dynamically.

## 1.0.107 - 05/14/20

- `Added` StatusBar Component.

## 1.0.106 - 05/14/20

- `Added` Code Block Component.

## 1.0.105 - 05/14/20

- `Fixed` TagInput, SimpleTagInput typings.

## 1.0.104 - 05/14/20

- `Added` TagInput, SimpleTagInput components.

## 1.0.103 - 05/14/20

- `Added` Card and Radio Select Event.

## 1.0.102 - 05/11/20

- `Fixed` Fixed autofocus behaviour in ExpandingSearchInput.

## 1.0.101 - 05/06/20

- `Added` Harness icon (no text).

## 1.0.100 - 05/06/20

- `Fixed`: Regenerated CE Icons using ui:icons command.

## 1.0.99 - 05/04/20

- `Added`: Added new icons for CE-GCP onboarding page

## 1.0.98 - 04/30/20

- `Added`: Added new icons for CE Overview page

## 1.0.97 - 04/29/20

- `Fixed`: service-microsoft-teams icon

## 1.0.96 - 04/29/20

- `Added`: service-microsoft-teams icon

## 1.0.95 - 04/28/20

- `Fixed`: Fixed Text tooltip issue for firefox

## 1.0.94 - 04/27/20

- `Fixed`: DurationInput - don't allow invalid syntax

## 1.0.93 - 04/23/20

- `Added` command-icon, main-resume and check-alt icon.

## 1.0.92 - 04/21/20

- `Added` icon support for `Text` component.

## 1.0.91 - 04/20/20

- `Added` FieldArray onChange - any change to children fields will trigger onChange.

## 1.0.90 - 04/20/20

- `Updated` Updated DateInput field for fixed date and date time field.

## 1.0.89 - 04/17/20

- `Updated` Updated ExpandingSearchInput component to take a fixedText prop.

## 1.0.88 - 04/16/20

- `Updated` Updated FieldArray component to configure Add Label, direction of Add row and clear error on delete.

## 1.0.87 - 04/15/20

- `Updated` Enable conditional row delete in FieldArray.

## 1.0.86 - 04/14/20

- `Fixed` Enable HTTPS for uikit.harness.io website.

## 1.0.85 - 04/14/20

- `Fixed` DateRangePicker button now takes value from parent component, instead of maintaining internal state.

## 1.0.84 - 04/14/20

- `Fixed` Flickering issue in `ExpandingSearchInput' component is now fixed.

## 1.0.83 - 04/13/20

- `Fixed` DateRangePicker button now reacts to changes in the `initialButtonText` property.

## 1.0.82 - 04/13/20

- `Fixed` export default issue.

## 1.0.81 - 04/13/20

- `Added` `ExpandingSearchInput' component.

## 1.0.80 - 04/07/20

- `Changed` IconName from private to public UIKit export.

## 1.0.79 - 03/20/20

- `Added` support disabled options in multiselect
- `Fixed` Type issue in TextInput

## 1.0.78 - 03/12/20

- `Added` support for resetting select value

## 1.0.76 - 03/02/20

- `Changed` prevent onChange from being triggered for unit less values `DurationInput`
- `Changed` show warning for unit less values `DurationInput`

## 1.0.75 - 03/02/20

- `Added` word-wrapping rule for `Text` tooltip.

## 1.0.74 - 03/02/20

- `Added` document for large `Button`.

## 1.0.73 - 03/01/20

- `Removed` onQueryChange props and use the blue print multiselect.

## 1.0.72 - 02/26/20

- `Added` Allow creation of new items in select component.

## 1.0.71 - 02/20/20

- `Added` Allow handleQueryChange and loading state fixed in multiselect component.

## 1.0.70 - 02/21/20

- `Fixed` Types for FieldArray custom renderer onChange callback.

## 1.0.69 - 02/17/20

- `Added` Allow creation of new items in multiselect component.

## 1.0.68 - 02/14/20

- `Added` `noStyling` to `Button` and `Link` component to skip applying UIKit styling on them.

## 1.0.67 - 02/13/20

- `Fixed` tooltip from `lineClamp` to be overriden with nullable `tooltip` prop.

## 1.0.66 - 02/12/20

- `Fixed` tooltip not being updated when prop got changed in `Text` component.

## 1.0.65 - 02/12/20

- `Added` text truncation support for Text component.

## 1.0.64 - 02/11/20

- `Changed` npm package files to whitelist instead of blacklist.

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
