import React, { CSSProperties } from 'react'
import { HTMLDivProps } from '@blueprintjs/core'
import { AvatarProps, Avatar, AvatarSizes } from '../Avatar/Avatar'
import css from './AvatarGroup.css'
import { Color } from '../../core/Color'
import classnames from 'classnames'

export interface AvatarGroupProps extends HTMLDivProps {
  onAdd?: (e: React.MouseEvent<HTMLDivElement>) => void
  avatars: Array<Omit<AvatarProps, 'size'>>
  overlap?: boolean
  avatarGroupProps?: Omit<AvatarProps, 'size'>
  size?: AvatarSizes
  className?: string
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
  className = '',
  ...rest
}) => {
  if (!avatars || !avatars.length) {
    return null
  } else {
    // to avoid mutation of props
    avatars = [...avatars]
  }
  if (onAdd) {
    avatars.push({
      name: '+',
      color: Color.BLUE_500,
      backgroundColor: Color.GREY_200,
      onClick: onAdd,
      hoverCard: false
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
  )
}
