/**
 * This component unifies Harness and Blueprint Icon component so all icons
 * can be referred by name like in Blueprint.
 *
 * TODO: Implement accessible attributes for icons as explained in https://blueprintjs.com/docs/#core/components/icon.
 */
import { HarnessIcons } from './HarnessIcons'
import React, { ElementType } from 'react'
import { Icon as BIcon, IconName as BIconName, Classes } from '@blueprintjs/core'
import { StyledProps, styledClasses } from '../styled-props/StyledProps'

type IconName = (typeof HarnessIcons)[keyof typeof HarnessIcons] | BIconName

interface Props extends Omit<StyledProps, 'children'> {
  name: IconName
  size?: number
}

function Icon(props: Props) {
  const name = props.name as string
  const HarnessIcon: ElementType = HarnessIcons[name]

  if (HarnessIcon) {
    return (
      <span className={styledClasses(props, Classes.ICON)}>
        <HarnessIcon width={props.size} height={props.size} />
      </span>
    )
  } else {
    return <BIcon className={styledClasses(props)} icon={name as BIconName} iconSize={props.size} />
  }
}

export { IconName, HarnessIcons, Icon }
