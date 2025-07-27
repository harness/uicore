/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { HTMLInputTypeAttribute } from 'react'
import cx from 'classnames'
import {
  InputGroupProps2 as InputGroupProps,
  Intent,
  InputGroup,
  PopoverInteractionKind,
  Classes
} from '@blueprintjs/core'
import { Popover } from '../../../Popover/Popover'
import { Icon } from '@harness/icons'
import { Text } from '../../../Text/Text'
import { Utils } from '../../../../core/Utils'

import css from './FilterTextInput.css'
import { Layout } from '../../../../layouts/Layout'
import { Color, FontVariation, StyledProps } from '@harness/design-system'
import { Container } from '../../../Container/Container'
import { PopoverProps } from '../../../Popover/Popover'

export interface FilterTextInputProps
  extends Omit<InputGroupProps, 'className' | 'leftIcon' | 'rightElement' | 'value' | 'onChange' | 'placeholder'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  type: string | HTMLInputTypeAttribute
  wrapperClassName?: string
  placeholder?: string
  onRemove?: () => void
  usePortal?: boolean
  width?: StyledProps['width']
  buttonTestId?: string
  hideItemCount?: boolean
  isLabel?: boolean
  value?: string[] | string
  onChange?: (value: string[] | string) => void
  enableMultiInput?: boolean
  inputPlaceholder?: string
  initialDropDownOpen?: boolean
  showDropDownIcon?: boolean
  tooltip?: string
  tooltipProps?: PopoverProps
}

export function FilterTextInput(props: FilterTextInputProps): React.ReactElement {
  const {
    wrapperClassName,
    placeholder,
    onRemove,
    usePortal,
    buttonTestId,
    width,
    hideItemCount,
    isLabel,
    value,
    onChange,
    enableMultiInput,
    inputPlaceholder,
    showDropDownIcon = false,
    initialDropDownOpen = false,
    disabled,
    tooltip
  } = props
  const [isOpen, setIsOpen] = React.useState(initialDropDownOpen)
  const [selectedItems, setSelectedItems] = React.useState<string[] | string>([])
  const [textInputValue, setTextInputValue] = React.useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (enableMultiInput) {
      const values = inputValue.split(',').filter(value => value.trim() !== '')
      setSelectedItems(values)
      onChange?.(values)
    } else {
      setSelectedItems(inputValue)
      onChange?.(inputValue)
    }

    setTextInputValue(inputValue)
  }

  React.useEffect(() => {
    if (value && value.length > 0) {
      setSelectedItems(value)
      if (enableMultiInput) setTextInputValue((value as string[]).join(', '))
      else setTextInputValue(value as string)
    }
  }, [])

  const TextInput = (
    <div className={cx(css.wrapper, wrapperClassName)}>
      <InputGroup
        intent={Intent.PRIMARY}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        value={textInputValue}
        className={css.input}
        placeholder={inputPlaceholder}
      />
    </div>
  )

  const getLength = (items: string[] | string): number => {
    if (Array.isArray(items)) {
      return items.length
    }
    return items ? 1 : 0
  }

  // Helper function to safely join items
  const joinItems = (items: string[] | string): string => {
    if (Array.isArray(items)) {
      return items.join(', ')
    }
    return items
  }

  const itemsLength = getLength(selectedItems)

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
      onClose={() => setIsOpen(false)}
      isOpen={!disabled ? isOpen : false}
      content={TextInput}>
      <Utils.WrapOptionalTooltip tooltip={tooltip} tooltipProps={props.tooltipProps}>
        <Layout.Horizontal
          data-testid={buttonTestId}
          style={width ? { width } : undefined}
          className={cx(
            css.dropdownButton,
            { [css.withBorder]: !isLabel },
            { [css.selected]: selectedItems.length > 0 },
            { [css.minWidth]: !width },
            { [css.disabled]: disabled }
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
                {enableMultiInput ? (
                  <Popover
                    position="top"
                    usePortal={true}
                    interactionKind={PopoverInteractionKind.HOVER}
                    className={cx(Classes.DARK, css.itemsPopover)}
                    content={
                      itemsLength > 0 ? (
                        <Container className={css.selectedItemsPopover}>
                          <Text color={Color.GREY_100} padding={'small'} font={{ variation: FontVariation.SMALL }}>
                            {joinItems(selectedItems)}
                          </Text>
                        </Container>
                      ) : (
                        <Text>No items selected</Text>
                      )
                    }>
                    <Text className={css.counter} lineClamp={1}>
                      {selectedItems.length <= 9 ? '0' : ''}
                      {selectedItems.length} selected
                    </Text>
                  </Popover>
                ) : (
                  <Text className={css.counter} lineClamp={1}>
                    {selectedItems}
                  </Text>
                )}
              </>
            )}
          </Layout.Horizontal>
          <Icon
            name={showDropDownIcon ? 'main-chevron-down' : 'cross'}
            size={showDropDownIcon ? 8 : 12}
            className={css.crossIcon}
            color={Color.GREY_400}
            onClick={e => {
              if (!showDropDownIcon) {
                e.stopPropagation()
                onRemove?.()
              }
            }}
          />
        </Layout.Horizontal>
      </Utils.WrapOptionalTooltip>
    </Popover>
  )
}
