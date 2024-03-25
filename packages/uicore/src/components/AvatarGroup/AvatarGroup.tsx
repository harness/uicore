/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { CSSProperties } from 'react'
import { HTMLDivProps } from '@blueprintjs/core'
import { AvatarProps, Avatar, AvatarSizes, plusIcon } from '../Avatar/Avatar'
import { Text } from '../Text/Text'
import css from './AvatarGroup.css'
import { Color } from '@harnessio/design-system'
import classnames from 'classnames'
import { Layout } from '../../layouts/Layout'

export interface AvatarGroupProps extends HTMLDivProps {
  onAdd?: (e: React.MouseEvent<HTMLDivElement>) => void
  avatars: Array<Omit<AvatarProps, 'size'>>
  overlap?: boolean
  avatarGroupProps?: Omit<AvatarProps, 'size'>
  size?: AvatarSizes
  restrictLengthTo?: number
  className?: string
  onAddTooltip?: JSX.Element
  avatarClassName?: string
  hideAddOption?: boolean
}
type overLap = {
  [key in AvatarSizes]: string
}
const avatarOverLap: overLap = { xsmall: '-8px', small: '-10px', large: '-20px', medium: '-13px', normal: '-13px' }
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  onAdd,
  avatars,
  overlap = true,
  avatarGroupProps,
  size = 'normal',
  restrictLengthTo,
  onAddTooltip,
  className = '',
  avatarClassName,
  hideAddOption,
  ...rest
}) => {
  let remainingLength

  if (restrictLengthTo) {
    remainingLength = avatars.length - restrictLengthTo
    avatars = avatars.slice(0, restrictLengthTo)
  }

  if (!avatars || !avatars.length) {
    return null
  } else {
    // to avoid mutation of props
    avatars = [...avatars]
  }
  if (onAdd && !hideAddOption) {
    avatars.push({
      name: plusIcon,
      color: Color.PRIMARY_7,
      backgroundColor: 'transparent',
      onClick: onAdd,
      hoverCard: onAddTooltip ? true : false,
      tooltip: onAddTooltip,
      borderColor: Color.PRIMARY_2
    })
  }
  if (overlap && avatars.length) {
    /* in order to create a stack like effect where first avatar overlaps second and second the third one and so on,
    we used flex-direction: row-reverse; but this makes the avatars order from right to left and first avatar will
    be the last one to display from left to right, to correct this we are reversing the array elements
    */
    avatars = avatars.reverse()
  }

  const cssProperties = { '--avatar-over-lap': avatarOverLap[size] }
  return (
    <Layout.Horizontal flex={{ alignItems: 'center', justifyContent: 'flex-start' }}>
      <div
        className={classnames(overlap ? css.stack : css.noStack, className)}
        {...rest}
        style={cssProperties as CSSProperties}>
        {avatars.map(avatarProps => (
          <Avatar
            key={Object.values(avatarProps).join('')}
            className={classnames(overlap && css.stackAvatar, avatarClassName)}
            {...avatarGroupProps}
            {...avatarProps}
            {...{ size }}
          />
        ))}
      </div>
      {remainingLength && remainingLength > 0 ? <Text>{`+ ${remainingLength}`}</Text> : null}
    </Layout.Horizontal>
  )
}
