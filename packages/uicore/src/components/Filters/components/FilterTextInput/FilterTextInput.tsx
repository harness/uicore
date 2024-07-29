/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { IInputGroupProps, Intent, TextArea } from '@blueprintjs/core'
import { Popover, PopoverProps } from '../../../Popover/Popover'
import { IconName, Icon, IconProps } from '@harness/icons'
import { Text } from '../../../Text/Text'

import css from './FilterTextInput.css'
import { Layout } from '../../../../layouts/Layout'
import { Color, StyledProps } from '@harness/design-system'

export interface FilterTextInputProps
  extends Omit<IInputGroupProps, 'className' | 'leftIcon' | 'rightElement' | 'value' | 'onChange'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  leftIcon?: IconName
  leftIconProps?: IconProps
  rightElement?: IconName
  rightElementProps?: Omit<IconProps, 'name'>
  errorText?: string
  errorInPopover?: boolean
  popoverProps?: PopoverProps
  wrapperClassName?: string
  placeholder?: string
  onRemove?: () => void
  usePortal?: boolean
  minWidth?: StyledProps['width']
  width?: StyledProps['width']
  buttonTestId?: string
  hideItemCount?: boolean
  isLabel?: boolean
  value?: string[]
  onChange?: (value: string[]) => void
}

export function FilterTextInput(props: FilterTextInputProps): React.ReactElement {
  const {
    wrapperClassName,
    placeholder,
    onRemove,
    usePortal,
    buttonTestId,
    width,
    minWidth,
    hideItemCount,
    isLabel,
    value,
    onChange
  } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const [textAreaValue, setTextAreaValue] = React.useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    const values = inputValue.split(',').filter(value => value.trim() !== '')

    setTextAreaValue(inputValue)
    setSelectedItems(values)

    onChange?.(values)
  }

  React.useEffect(() => {
    if (value && value.length > 0) {
      setSelectedItems(value)
      setTextAreaValue(value.join(', '))
    }
  }, [])

  const TextInput = (
    <div className={cx(css.wrapper, wrapperClassName)}>
      <TextArea growVertically intent={Intent.PRIMARY} onChange={e => handleChange(e)} value={textAreaValue} />
    </div>
  )

  return (
    <Popover
      targetTagName="div"
      wrapperTagName="div"
      position="bottom-left"
      usePortal={usePortal}
      minimal
      hasBackdrop
      backdropProps={{
        onClick: () => {
          setIsOpen(false)
        }
      }}
      autoFocus={false}
      enforceFocus={false}
      className={cx(css.main)}
      popoverClassName={cx(css.popover)}
      isOpen={isOpen}
      content={TextInput}>
      <Layout.Horizontal
        data-testid={buttonTestId}
        style={width ? { width } : { minWidth }}
        className={cx(
          css.dropdownButton,
          { [css.withBorder]: !isLabel },
          { [css.selected]: selectedItems.length > 0 },
          { [css.minWidth]: !width }
        )}
        onClick={() => setIsOpen(true)}
        flex>
        <Layout.Horizontal className={css.labelWrapper} flex>
          <Text data-testid="dropdown-value" className={css.label} lineClamp={1}>
            {placeholder}
          </Text>
          {!hideItemCount && selectedItems.length > 0 && (
            <>
              <div className={css.verticalDivider}></div>
              <Text className={css.counter}>
                {selectedItems.length <= 9 ? '0' : ''}
                {selectedItems.length} selected
              </Text>
            </>
          )}
        </Layout.Horizontal>
        <Icon
          name="cross"
          size={12}
          className={css.crossIcon}
          color={Color.GREY_400}
          onClick={e => {
            e.stopPropagation()
            onRemove?.()
          }}
        />
      </Layout.Horizontal>
    </Popover>
  )
}
