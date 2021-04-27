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
