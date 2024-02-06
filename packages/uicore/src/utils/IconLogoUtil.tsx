/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLAttributes } from 'react'
import { Icon as IconOriginal, IconName as IconOriginalName, HarnessIcons, IconProps } from '@harnessio/icons'
import { IconName as BIconName } from '@blueprintjs/core'
import { Logo, LogoName, Logos } from '@harness/logos'
import { StyledProps } from '@harnessio/design-system'

interface IconLogoProps extends HTMLAttributes<HTMLHeadingElement>, Omit<StyledProps, 'children'> {
  name: IconName | LogoName
  size?: number
  color?: string
  className?: string
}

export const Icon: React.FC<IconLogoProps> = props => {
  const { name, ...rest } = props

  if (isIconName(name)) {
    return <IconOriginal name={name as IconOriginalName} {...rest} />
  } else if (isLogoName(name)) {
    return <Logo name={name as LogoName} {...rest} />
  } else {
    return <IconOriginal name={name as BIconName} {...rest} />
  }
}

function isIconName(name: string): boolean {
  return Object.keys(HarnessIcons).includes(name)
}

function isLogoName(name: string): boolean {
  return Object.keys(Logos).includes(name)
}

export type IconName = IconOriginalName | LogoName
export { IconProps }
