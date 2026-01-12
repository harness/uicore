/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
// @ts-nocheck

import React from 'react'
import cx from 'classnames'
import { PopoverInteractionKind, Classes, ITagInputProps, IPopoverProps, Position } from '@blueprintjs/core'
import { Popover } from '../../../Popover/Popover'
import { Icon } from '@harness/icons'
import { Text } from '../../../Text/Text'
import { Utils } from '../../../../core/Utils'

import css from './FilterTagInput.css'
import { Layout } from '../../../../layouts/Layout'
import { Color, FontVariation, StyledProps } from '@harness/design-system'
import { Container } from '../../../Container/Container'
import { PopoverProps } from '../../../Popover/Popover'
import { TagInput as BPTagInput, Menu, MenuItem } from '@blueprintjs/core'
import { uniq } from 'lodash-es'
import { IInputGroupProps } from '@blueprintjs/core'

export interface FilterTagInputProps
  extends Omit<IInputGroupProps, 'className' | 'leftIcon' | 'rightElement' | 'value' | 'onChange' | 'placeholder'>,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'defaultValue' | 'onChange'> {
  wrapperClassName?: string
  placeholder?: string
  onRemove?: () => void
  usePortal?: boolean
  width?: StyledProps['width']
  buttonTestId?: string
  hideItemCount?: boolean
  isLabel?: boolean
  value?: string[]
  onChange?: (value: string[]) => void
  inputPlaceholder?: string
  initialDropDownOpen?: boolean
  showDropDownIcon?: boolean
  tooltip?: string
  tooltipProps?: PopoverProps
  tagsProps?: Partial<ITagInputProps>
  popoverProps?: Pick<IPopoverProps, 'captureDismiss'>
}

export function FilterTagInput(props: FilterTagInputProps): React.ReactElement {
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
    inputPlaceholder,
    showDropDownIcon = false,
    initialDropDownOpen = false,
    disabled,
    tooltip,
    tagsProps,
    popoverProps = {}
  } = props
  const [isOpen, setIsOpen] = React.useState(initialDropDownOpen)
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = React.useState('')
  const trimmedInputValue = React.useMemo(() => inputValue.trim(), [inputValue])
  const showCreatePopover = !!trimmedInputValue

  const handleChange = (values: string[]): void => {
    const newSelectedItems = uniq(values)
    setSelectedItems(newSelectedItems)
    onChange?.(newSelectedItems)
  }

  React.useEffect(() => {
    if (value === undefined || value?.length === 0) {
      setSelectedItems([])
    }
  }, [value])

  React.useEffect(() => {
    if (value && value.length > 0) {
      setSelectedItems(value)
    }
  }, [])

  const popoverContent = (
    <Menu>
      <MenuItem
        icon="add"
        active
        text={`Add "${trimmedInputValue}"`}
        onClick={() => {
          inputRef.current?.focus()

          if (!trimmedInputValue) {
            return
          }
          const tagsToAdd = [trimmedInputValue]
          const isValid = tagsProps?.onAdd?.(tagsToAdd, 'default') ?? true

          if (!isValid) {
            return
          }

          const newValues = uniq([...selectedItems, ...tagsToAdd])
          handleChange(newValues)
          setInputValue('')
        }}
      />
    </Menu>
  )
  const TagInputElement = (
    <div className={cx(css.wrapper, wrapperClassName)}>
      <Popover
        position={Position.BOTTOM_LEFT}
        fill
        minimal
        disabled={disabled}
        isOpen={showCreatePopover}
        content={popoverContent}
        {...popoverProps}>
        <BPTagInput
          separator={false}
          values={selectedItems}
          onChange={values => handleChange(values as string[])}
          inputRef={input => {
            inputRef.current = input
          }}
          onKeyDown={(event: React.KeyboardEvent) => {
            if (event.keyCode === 13) {
              const tagsToAdd = [trimmedInputValue]
              const newValues = uniq([...selectedItems, ...tagsToAdd])
              handleChange(newValues)
              setInputValue('')
              event.preventDefault()
              event.stopPropagation()
            }
          }}
          placeholder={inputPlaceholder}
          {...tagsProps}
          inputValue={inputValue}
          onInputChange={e => {
            setInputValue(e.currentTarget.value)
            tagsProps?.onInputChange?.(e)
          }}
          onAdd={(values, method) => {
            const isValid = tagsProps?.onAdd?.(values, method) ?? true

            if (isValid) {
              setInputValue('')
            }

            return isValid
          }}
        />
      </Popover>
    </div>
  )

  const itemsLength = selectedItems.length

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
      content={TagInputElement}>
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
                <Popover
                  position="top"
                  usePortal={true}
                  interactionKind={PopoverInteractionKind.HOVER}
                  className={cx(Classes.DARK, css.itemsPopover)}
                  content={
                    itemsLength > 0 ? (
                      <Container className={css.selectedItemsPopover}>
                        <Text color={Color.GREY_100} padding={'small'} font={{ variation: FontVariation.SMALL }}>
                          {selectedItems.join(', ')}
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
