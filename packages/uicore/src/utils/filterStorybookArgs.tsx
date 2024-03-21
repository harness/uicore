/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export default function filterStorybookArgs<ComponentProps>(args: ComponentProps): ComponentProps {
  return Object.fromEntries(
    Object.entries(args).filter(([, val]) => !(val === undefined || val === null))
  ) as ComponentProps
}
