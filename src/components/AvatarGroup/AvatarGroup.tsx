/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { CSSProperties } from 'react'
import { HTMLDivProps } from '@blueprintjs/core'
import { AvatarProps, Avatar, AvatarSizes, plusIcon } from '../Avatar/Avatar'
import { Text } from '../Text/Text'
import css from './AvatarGroup.css'
import { Color } from '../../core/Color'
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
  if (onAdd) {
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
            className={classnames(overlap && css.stackAvatar)}
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
