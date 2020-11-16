import React from 'react'
import { AvatarProps, Avatar } from '../Avatar/Avatar'
import css from './AvatarGroup.css'
import { isFunction } from 'lodash'

import classnames from 'classnames'

export interface AvatarGroupProps {
  onAdd?: (e: React.MouseEvent<HTMLDivElement>) => void
  avatars: AvatarProps[]
  overlap?: boolean
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ onAdd, avatars, overlap = true }) => {
  if (isFunction(onAdd)) {
    avatars.push({ name: '+', textColor: '#25a6f7', color: '#e4e7eb', onClick: onAdd })
  }
  if (overlap) {
    avatars = avatars.reverse()
  }

  return (
    <div className={classnames(overlap ? css.stack : css.noStack)}>
      {avatars.map(avatarProps => (
        <Avatar className={classnames(overlap && css.stackAvatar)} {...avatarProps} />
      ))}
    </div>
  )
}
