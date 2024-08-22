/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Popover } from '../../../Popover/Popover'
import { Icon } from '@harness/icons'
import { Text } from '../../../Text/Text'

import css from './FilterTagInput.css'
import { Layout } from '../../../../layouts/Layout'
import { Color, StyledProps } from '@harness/design-system'
import { TagInput, TagInputProps } from '../../../TagInput/TagInput'

export interface FilterTagInputProps extends TagInputProps<any> {
  wrapperClassName?: string
  placeholder?: string
  onRemove?: () => void
  usePortal?: boolean
  width?: StyledProps['width']
  buttonTestId?: string
  hideItemCount?: boolean
  isLabel?: boolean
  value?: string[] | string
  onTagInputChange?: (
    selectedItems: Array<string | { key: string; value: string | null | undefined }>,
    createdItems: Array<string | { key: string; value: string | null | undefined }>,
    items: Array<string | { key: string; value: string | null | undefined }>
  ) => void
  enableMultiInput?: boolean
  inputPlaceholder?: string
  disabled?: boolean
  items: Array<string | { key: string; value: string | null | undefined }>
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
    onTagInputChange,
    enableMultiInput,
    itemFromNewTag,
    items,
    disabled,
    labelFor,
    ...tagInputProps
  } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedItems, setSelectedItems] = React.useState<any>(items)

  const TextInput = (
    <div className={cx(css.wrapper, wrapperClassName)}>
      <TagInput
        fill={true}
        {...tagInputProps}
        itemFromNewTag={itemFromNewTag}
        keyOf={labelFor}
        labelFor={labelFor}
        readonly={disabled}
        className={css.input}
        items={items}
        selectedItems={tagInputProps?.selectedItems || []}
        onChange={(
          selectedItems: Array<string | { key: string; value: string | null | undefined }>,
          createdItems: Array<string | { key: string; value: string | null | undefined }>,
          items: Array<string | { key: string; value: string | null | undefined }>
        ) => {
          setSelectedItems(selectedItems)
          onTagInputChange?.(selectedItems, createdItems, items)
        }}
      />
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
        style={width ? { width } : undefined}
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
              {enableMultiInput ? (
                <Text className={css.counter} lineClamp={1}>
                  {selectedItems.length <= 9 ? '0' : ''}
                  {selectedItems.length} selected
                </Text>
              ) : (
                <Text className={css.counter} lineClamp={1}>
                  {selectedItems}
                </Text>
              )}
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
