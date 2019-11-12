const Spacing = {
  NONE: 'none' as 'none',
  XSMALL: 'xsmall' as 'xsmall',
  SMALL: 'small' as 'small',
  MEDIUM: 'medium' as 'medium',
  LARGE: 'large' as 'large',
  XLARGE: 'xlarge' as 'xlarge',
  XXLARGE: 'xxlarge' as 'xxlarge',
  XXXLARGE: 'xxxlarge' as 'xxxlarge',
  HUGE: 'huge' as 'huge'
}

type Spacing = typeof Spacing[keyof typeof Spacing]

export { Spacing }
