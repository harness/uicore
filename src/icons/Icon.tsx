/**
 * This component unifies Harness and Blueprint Icon component so all icons
 * can be referred by name like in Blueprint.
 *
 * TODO: Implement accessible attributes for icons as explained in https://blueprintjs.com/docs/#core/components/icon.
 */
import { HarnessIcons, HarnessIconName } from './HarnessIcons'
import React, { ElementType, HTMLAttributes } from 'react'
import { Assign } from 'utility-types'
import { Icon as BIcon, IconName as BIconName, Classes } from '@blueprintjs/core'
import { StyledProps, styledClasses, omitStyledProps } from '../styled-props/StyledProps'

type IconName = HarnessIconName | BIconName

interface IconProps extends Assign<HTMLAttributes<HTMLHeadingElement>, Omit<StyledProps, 'children'>> {
  name: IconName
  size?: number
}

function Icon(props: IconProps) {
  const name = props.name as string
  const size = props.size || 16
  const HarnessIcon: ElementType = HarnessIcons[name]

  if (HarnessIcon) {
    return (
      <span {...omitStyledProps(props, 'name', 'size')} data-icon={name} className={styledClasses(props, Classes.ICON)}>
        <HarnessIcon width={size} height={size} />
      </span>
    )
  } else {
    return (
      <BIcon
        {...omitStyledProps(props, 'name', 'size')}
        className={styledClasses(props)}
        icon={name as BIconName}
        iconSize={size}
      />
    )
  }
}

export { IconName, HarnessIcons, Icon, IconProps }
