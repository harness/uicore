/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes } from 'react'
import { StyledProps, styledClasses, omitStyledProps } from '@harness/design-system'
import { styledClass } from '@harness/design-system'

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
