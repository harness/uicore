import React from 'react'
import { noop } from 'lodash-es'
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
  enableIconClick?: boolean
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
    className,
    enableIconClick
  } = props

  const handleClick = (e: React.MouseEvent<HTMLHeadingElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleOpen(!isOpen)
  }

  return (
    <Container className={cx(css.main, className)}>
      <Container className={css.leftSection} onClick={!enableIconClick ? handleClick : noop}>
        <Icon
          name={isOpen ? expandedIcon || 'main-caret-down' : collapsedIcon || 'main-caret-right'}
          color={Color.GREY_400}
          size={10}
          {...iconProps}
          onClick={enableIconClick ? () => onToggleOpen(!isOpen) : noop}
        />
        {typeof heading === 'string' ? <Text className={css.title}>{heading}</Text> : heading}
      </Container>

      <Container>
        {isRemovable && <Button icon="main-close" minimal onClick={onRemove} iconProps={{ size: 10 }} />}
      </Container>
    </Container>
  )
}
