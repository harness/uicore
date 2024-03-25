/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '@harnessio/design-system'
import { styledClass } from '@harnessio/design-system'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6 | '1' | '2' | '3' | '4' | '5' | '6'

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement>, StyledProps {
  /** Heading level ('1' -> h1, '2' -> h2, ..., '6' -> h6). Default is '1' */
  level?: HeadingLevel
}

/**
 * Heading renders consistent H1 to H6 elements.
 */
export function Heading(props: HeadingProps): React.ReactElement {
  const { level = 1, children } = props
  const Tag = `h${level}` as React.ElementType

  return (
    <Tag {...omitStyledProps(props)} className={styledClasses(props, styledClass.font, styledClass[`font-h${level}`])}>
      {children}
    </Tag>
  )
}
