import React from 'react'
import css from '../Thumbnail/Thumbnail.css'
import { Card } from '../Card/Card'
import { Icon, IconName } from '../../icons/Icon'
import { Text } from '../Text/Text'
import { Color } from '../../core/Color'

export interface ThumbnailProps {
  label?: string
  value?: string
  icon: IconName
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: (val: string) => void
}

export const Thumbnail: React.FC<ThumbnailProps> = props => {
  const { label, value, icon, isDisabled, isSelected, onClick } = props
  return (
    <label key={value} className={css.squareCardContainer}>
      <Card
        disabled={isDisabled}
        interactive={!isDisabled && !isSelected}
        selected={isSelected}
        cornerSelected={isSelected}
        className={css.squareCard}>
        <Icon name={icon} size={26} />
      </Card>
      <Text
        style={{
          textAlign: 'center'
        }}
        font={{ size: 'small' }}
        color={isDisabled ? Color.GREY_350 : Color.GREY_600}>
        {label}
      </Text>
      <input
        type="checkbox"
        value={value}
        onChange={e => {
          !!onClick && onClick(e.target.value)
        }}
        checked={isSelected}
        disabled={isDisabled}
      />
    </label>
  )
}
