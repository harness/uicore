import React from 'react'
import { AvatarProps, Avatar, AvatarSizes } from '../Avatar/Avatar'
import css from './AvatarGroup.css'
import { Color } from '../../core/Color'
import classnames from 'classnames'

export interface AvatarGroupProps {
  onAdd?: (e: React.MouseEvent<HTMLDivElement>) => void
  avatars: Omit<AvatarProps, 'size'>[]
  overlap?: boolean
  avatarGroupProps?: Omit<AvatarProps, 'size'>
  size?: AvatarSizes
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  onAdd,
  avatars,
  overlap = true,
  avatarGroupProps,
  size = 'normal'
}) => {
  if (onAdd) {
    avatars.push({ name: '+', color: Color.BLUE_500, backgroundColor: Color.GREY_200, onClick: onAdd })
  }
  if (overlap) {
    /* in order to create a stack like effect where first avatar overlaps second and second the third one and so on,
    we used flex-direction: row-reverse; but this makes the avatars order from right to left and first avatar will
    be the last one to display from left to right, to correct this we are reversing the array elements
    */
    avatars = avatars.reverse()
  }

  return (
    <div className={classnames(overlap ? css.stack : css.noStack)}>
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
