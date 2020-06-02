import React from 'react'
import { Color } from '../../core/Color'
import { Icon, IconProps, IconName } from '../../icons/Icon'
import css from './CollapseHeader.css'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import cx from 'classnames'

export interface CollapseHeaderProps {
  isOpen: boolean
  collapsedIcon?: IconName
  expandedIcon?: IconName
  iconProps?: IconProps
  heading?: string | JSX.Element
  isRemovable?: boolean
  onRemove?: () => void
  className?: string
  onToggleOpen: (isOpen?: boolean) => void
}

export function CollapseHeader(props: CollapseHeaderProps) {
  const {
    onToggleOpen,
    onRemove,
    isOpen,
    isRemovable,
    heading,
    iconProps,
    expandedIcon,
    collapsedIcon,
    className
  } = props
  return (
    <Container className={cx(css.main, className)}>
      <Container className={css.leftSection} onClick={() => onToggleOpen(!isOpen)}>
        {isOpen ? (
          <Icon name={expandedIcon || 'main-caret-down'} color={Color.GREY_400} size={10} {...iconProps} />
        ) : (
          <Icon name={collapsedIcon || 'main-caret-right'} color={Color.GREY_400} size={10} {...iconProps} />
        )}
        <Text className={css.title}>{heading}</Text>
      </Container>

      <Container className={css.rightSection} inline>
        {isRemovable && <Button icon="main-close" minimal onClick={onRemove} iconProps={{ size: 10 }} />}
      </Container>
    </Container>
  )
}
