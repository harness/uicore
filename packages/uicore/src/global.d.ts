/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.css' {
  const css: any
  export default css
}

/* Extend Window to support NextJS properties (@see Button.tsx) */
interface Window {
  next: any
  __NEXT_DATA__: any
}
