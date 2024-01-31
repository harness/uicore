import React, { HTMLAttributes } from 'react'
import { Icon as Icons, IconName, HarnessIcons, IconProps } from '@harnessio/icons'
import { Logo, LogoName, Logos } from '@harness/logos'
import { StyledProps } from '@harnessio/design-system'

interface IconLogoProps extends HTMLAttributes<HTMLHeadingElement>, Omit<StyledProps, 'children'> {
  name: IconName | LogoName
  size?: number
  color?: string
  className?: string
}

export const Icon: React.FC<IconLogoProps> = props => {
  const { name, size, color, className, ...rest } = props

  if (isIconName(name)) {
    return <Icons name={name as IconName} size={size} color={color} className={className} {...rest} />
  }

  if (isLogoName(name)) {
    return <Logo name={name as LogoName} size={size} color={color} className={className} {...rest} />
  }

  return null
}

function isIconName(name: string): boolean {
  return Object.keys(HarnessIcons).includes(name)
}

function isLogoName(name: string): boolean {
  return Object.keys(Logos).includes(name)
}

export type IconName = IconName | LogoName
export { IconProps }
