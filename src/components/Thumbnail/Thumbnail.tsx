import React from 'react'
import cx from 'classnames'

import css from '../Thumbnail/Thumbnail.css'
import { Card } from '../Card/Card'
import { Icon, IconName } from '../../icons/Icon'
import { Text } from '../Text/Text'
import { Color } from '../../core/Color'

export interface ThumbnailProps {
  name?: string
  label?: string
  value?: string
  icon: IconName
  disabled?: boolean
  selected?: boolean
  className?: string
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Thumbnail: React.FC<ThumbnailProps> = props => {
  const { label, value, icon, disabled, selected, onClick, className,  name } = props

  return (
    <label className={cx(css.squareCardContainer, className)}>
      <Card
        disabled={disabled}
        interactive={!disabled && !selected}
        selected={selected}
        cornerSelected={selected}
        className={css.squareCard}>
        <Icon name={icon} size={26} />
      </Card>
      <Text
        style={{
          textAlign: 'center'
        }}
        font={{ size: 'small' }}
        color={disabled ? Color.GREY_350 : Color.GREY_600}>
        {label}
      </Text>
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onClick}
        checked={selected}
        disabled={disabled}
      />
    </label>
  )
}
