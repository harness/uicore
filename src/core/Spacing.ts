/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

// enum Spacing {
//   NONE = 'none',
//   XSMALL = 'xsmall',
//   SMALL = 'small',
//   MEDIUM= 'medium',
//   LARGE= 'large' ,
//   XLARGE= 'xlarge' ,
//   XXLARGE= 'xxlarge' ,
//   XXXLARGE= 'xxxlarge' ,
//   HUGE= 'huge'
// }

export type Spacing =
  | 'none'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge'
  | 'huge'
  // form styles @2021-04-27
  // for paddings only
  | 'dialog'
  | 'form'
  // for paddings & margins
  | 'form-section'
  | 'form-panel'
  | 'form-subsection'
  // for margins only
  | 'form-panel-subsection'
  | 'form-action-buttons'
