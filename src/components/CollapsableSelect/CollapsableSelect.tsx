/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useEffect } from 'react'
import { FormGroup, HTMLDivProps, Intent } from '@blueprintjs/core'
import { connect, FormikContextType } from 'formik'
import cx from 'classnames'
import { isEqual, isEmpty, get } from 'lodash-es'
import { Card } from '../Card/Card'
import { Layout, LayoutProps } from '../../layouts/Layout'
import { Button } from '../Button/Button'
import { FormError } from '../FormError/FormError'
import { errorCheck } from '../../core/Utils'
import css from './CollapsableSelect.css'

export enum CollapsableSelectType {
  CardView = 'CardView'
}

export interface CollapsableSelectOptions {
  value: string | number | symbol
}

export interface CollapsableSelectProps<T> extends Omit<HTMLDivProps, 'onChange'> {
  selected: (CollapsableSelectOptions & T) | undefined
  items: Array<CollapsableSelectOptions & T>
  itemClassName?: string
  renderItem: (item: T, selected?: CollapsableSelectOptions & T) => JSX.Element
  onChange?: (selected: CollapsableSelectOptions & T, e: React.MouseEvent<HTMLDivElement>) => void
  layoutProps?: Partial<LayoutProps>
  name: string
  isReadonly?: boolean
  changeText?: string
  cancelText?: string
  type?: CollapsableSelectType
  actionBtnClassName?: string
}

export interface ConnectedCollapsableSelectProps<T> extends CollapsableSelectProps<T> {
  formik: FormikContextType<Record<string, unknown>>
}
export function CollapsableSelect<T>(props: ConnectedCollapsableSelectProps<T>) {
  const {
    className,
    itemClassName,
    actionBtnClassName,
    formik,
    name,
    items = [],
    selected,
    renderItem,
    changeText = 'Change',
    cancelText = 'Close',
    layoutProps,
    isReadonly = false,
    type = undefined
  } = props

  const value = get(formik?.values, name)

  const [showAllOptions, setShowAllOptions] = React.useState(!isEmpty(value))

  const hasError = errorCheck(name, formik)
  const intent = hasError ? Intent.DANGER : Intent.NONE
  const helperText = hasError ? <FormError errorMessage={get(formik?.errors, name)} name={name} /> : null

  function handleChangeClick(): void {
    setShowAllOptions(true)
  }

  function handleCancelClick(): void {
    setShowAllOptions(false)
  }

  function handleChange(item: CollapsableSelectOptions & T, event: React.MouseEvent<HTMLDivElement>): void {
    formik.setFieldValue(name, item.value)
    formik.setFieldTouched(name, true, false)
    props.onChange?.(item, event)
  }

  useEffect(() => {
    setShowAllOptions(isEmpty(value))
  }, [value])

  const selectedItemIndex = value ? items.findIndex(item => item.value === value) : -1
  let visibleItems =
    selectedItemIndex > -1
      ? [items[selectedItemIndex], ...items.filter((_val, index) => index !== selectedItemIndex)]
      : items

  if (!showAllOptions) {
    visibleItems = [visibleItems[0]]
  }

  return (
    <FormGroup className={className} helperText={helperText} intent={intent}>
      <Layout.Horizontal spacing={'medium'} {...layoutProps}>
        {visibleItems.map((item, index) => {
          const isSelected = isEqual(item, selected)

          return (
            <React.Fragment key={index}>
              {type === CollapsableSelectType.CardView ? (
                <Card
                  className={itemClassName}
                  interactive={true}
                  data-index={index}
                  selected={isSelected}
                  cornerSelected={true}
                  onClick={event => handleChange(item, event)}>
                  {renderItem(item, selected)}
                </Card>
              ) : (
                <div className={itemClassName} data-index={index} onClick={event => handleChange(item, event)}>
                  {renderItem(item, selected)}
                </div>
              )}
            </React.Fragment>
          )
        })}

        {showAllOptions ? null : (
          <Button
            className={cx(css.closeChangeBtn, actionBtnClassName)}
            disabled={isReadonly}
            minimal
            icon="Edit"
            iconProps={{ size: 12 }}
            withoutCurrentColor={true}
            intent="primary"
            data-testid="collapsable-select-change"
            onClick={handleChangeClick}
            text={changeText}
          />
        )}
        {showAllOptions && value ? (
          <Button
            className={cx(css.closeChangeBtn, actionBtnClassName)}
            disabled={isReadonly}
            minimal
            icon="cross"
            iconProps={{ size: 12 }}
            withoutCurrentColor={true}
            intent="primary"
            data-testid="thumbnail-select-cancel"
            onClick={handleCancelClick}
            text={cancelText}
          />
        ) : null}
      </Layout.Horizontal>
    </FormGroup>
  )
}

export const FormikCollapsableSelect = connect(CollapsableSelect) as <T>(
  props: CollapsableSelectProps<T>
) => React.ReactElement<CollapsableSelectProps<T>>
