import React from 'react'
import cx from 'classnames'

import css from '../Thumbnail/Thumbnail.css'
import { Card } from '../Card/Card'
import { Icon, IconName } from '../../icons/Icon'
import { Text } from '../Text/Text'
import { Color } from '../../core/Color'

export enum ThumbnailSize {
  LARGE = 'LARGE'
}
export interface ThumbnailProps {
  name?: string
  label?: string
  value?: string
  icon?: IconName
  disabled?: boolean
  selected?: boolean
  className?: string
  size?: ThumbnailSize
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Thumbnail: React.FC<ThumbnailProps> = props => {
  const { label, value, icon, disabled, selected, onClick, className, name, size } = props

  const getContainerClass = () => {
    if (size === ThumbnailSize.LARGE) {
      return css.large
    }
    if (!icon) {
      return css.bigger
    }
  }

  return (
    <label className={cx(css.squareCardContainer, getContainerClass(), className)}>
      <Card
        disabled={disabled}
        interactive={!disabled && !selected}
        selected={selected}
        cornerSelected={selected}
        className={css.squareCard}>
        {icon ? (
          <Icon name={icon} size={26} />
        ) : label ? (
          <Text className={css.label} color={Color.BLACK}>
            {label}
          </Text>
        ) : null}
      </Card>
      {icon && label && (
        <Text
          className={css.label}
          font={{ weight: 'semi-bold' }}
          color={disabled ? Color.GREY_500 : Color.GREY_600}
          margin={{ top: 'small' }}>
          {label}
        </Text>
      )}
      <input type="checkbox" name={name} value={value} onChange={onClick} checked={selected} disabled={disabled} />
    </label>
  )
}
