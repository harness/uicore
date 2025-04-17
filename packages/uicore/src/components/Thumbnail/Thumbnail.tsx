/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { ImgHTMLAttributes, isValidElement, useMemo } from 'react'
import cx from 'classnames'

import css from '../Thumbnail/Thumbnail.css'
import { Card } from '../Card/Card'
import { Icon, IconName } from '@harnessio/icons'
import { Text } from '../Text/Text'
import { Color } from '@harnessio/design-system'

export interface ThumbnailProps {
  name?: string
  label?: string | React.ReactElement
  /** Don't pass icon or imageProps.src to render label as a React Element */
  value?: string
  icon?: IconName | React.ReactElement
  /** renders image instead of icon when imageProps.src is passed */
  imageProps?: ImgHTMLAttributes<HTMLOrSVGImageElement>
  disabled?: boolean
  selected?: boolean
  cornerSelected?: boolean
  className?: string
  size?: 'large'
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Thumbnail: React.FC<ThumbnailProps> = props => {
  const {
    label,
    value,
    icon,
    disabled,
    selected,
    onClick,
    className,
    name,
    size,
    imageProps,
    cornerSelected = true
  } = props

  const getContainerClass = () => {
    if (size === 'large') {
      return css.large
    }
    if (!icon && !imageProps?.src) {
      return css.bigger
    }
  }

  const cardContent = useMemo(() => {
    if (imageProps?.src) {
      const { className: imageClassName, ...rest } = imageProps
      return <img {...rest} className={cx(css.image, imageClassName)} />
    }

    if (icon) {
      return isValidElement(icon) ? icon : <Icon name={icon} size={26} />
    }

    if (label) {
      return isValidElement(label) ? (
        label
      ) : (
        <Text className={css.label} color={Color.BLACK}>
          {label}
        </Text>
      )
    }

    return null
  }, [imageProps, icon, label])

  return (
    <label className={cx(css.squareCardContainer, getContainerClass(), className)}>
      <Card
        disabled={disabled}
        interactive={!disabled && !selected}
        selected={selected}
        cornerSelected={cornerSelected}
        className={css.squareCard}>
        {cardContent}
      </Card>
      {(icon || imageProps?.src) && label && !isValidElement(label) && (
        <Text
          className={css.label}
          font={{ weight: 'semi-bold' }}
          color={disabled ? Color.GREY_500 : Color.GREY_600}
          margin={{ top: 'small' }}>
          {label}
        </Text>
      )}
      {(icon || imageProps?.src) && label && isValidElement(label) && label}
      <input type="checkbox" name={name} value={value} onChange={onClick} checked={selected} disabled={disabled} />
    </label>
  )
}
