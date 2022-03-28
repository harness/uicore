/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { ReactElement } from 'react'
import css from './ThumbnailSelect.css'
import { IconName } from '@harness/icons'
import { Layout, LayoutProps } from '../../layouts/Layout'
import { Button } from '../Button/Button'
import { FormGroup } from '@blueprintjs/core'
import { connect, FormikContext } from 'formik'
import { get, isEmpty } from 'lodash-es'
import { Intent } from '@harness/design-system'
import { errorCheck, WrapOptionalTooltip } from '../../core/Utils'
import { Thumbnail, ThumbnailProps } from '../Thumbnail/Thumbnail'
import { FormError } from '../FormError/FormError'
import { PopoverProps } from 'components/Popover/Popover'
import cx from 'classnames'

export interface Item {
  label: string
  icon?: IconName
  value: string
  disabled?: boolean
  tooltip?: ReactElement | string
  tooltipProps?: PopoverProps
}

export interface ConnectedThumbnailSelectProps extends ThumbnailSelectProps {
  formik: FormikContext<Record<string, never>>
}

export interface ThumbnailSelectProps extends Pick<ThumbnailProps, 'size'> {
  name: string
  items: Item[]
  isReadonly?: boolean
  layoutProps?: Partial<LayoutProps>
  changeText?: string
  cancelText?: string
  className?: string
  thumbnailClassName?: string
  onChange?(val: string): void
  expandAllByDefault?: boolean
}

const ThumbnailSelect: React.FC<ConnectedThumbnailSelectProps> = props => {
  const {
    name,
    formik,
    items,
    isReadonly = false,
    layoutProps,
    changeText = 'Change',
    cancelText = 'Close',
    className,
    thumbnailClassName,
    size,
    onChange,
    expandAllByDefault
  } = props
  const value = get(formik.values, name)

  const [showAllOptions, setShowAllOptions] = React.useState(!isEmpty(value) || expandAllByDefault)

  const hasError = errorCheck(name, formik)
  const intent = hasError ? Intent.DANGER : Intent.NONE
  const helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null

  React.useEffect(() => {
    setShowAllOptions(isEmpty(value) || expandAllByDefault)
  }, [value])

  const selectedItemIndex = value ? items.findIndex(item => item.value === value) : -1
  let visibleItems: Item[] =
    selectedItemIndex > -1
      ? [items[selectedItemIndex], ...items.slice(0, selectedItemIndex), ...items.slice(selectedItemIndex + 1)]
      : items

  if (!showAllOptions) {
    visibleItems = visibleItems.slice(0, 1)
  }

  function handleChangeClick(): void {
    setShowAllOptions(true)
  }

  function handleCancelClick(): void {
    setShowAllOptions(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target

    formik.setFieldValue(name, value)
    formik.setFieldTouched(name, true)

    onChange?.(value)
  }

  return (
    <FormGroup className={cx(css.mainContainer, className)} helperText={helperText} intent={intent}>
      <Layout.Horizontal spacing={'medium'} {...layoutProps}>
        {visibleItems.map(item => {
          return (
            <WrapOptionalTooltip key={item.value} tooltip={item.tooltip} tooltipProps={item.tooltipProps}>
              <Thumbnail
                size={size}
                name={name}
                key={item.value}
                label={item.label}
                value={item.value}
                icon={item.icon}
                disabled={item.disabled || isReadonly}
                selected={item.value === value}
                onClick={handleChange}
                className={thumbnailClassName}
              />
            </WrapOptionalTooltip>
          )
        })}
        {showAllOptions ? null : (
          <Button
            className={css.changeButton}
            disabled={isReadonly}
            minimal
            icon="Edit"
            iconProps={{ size: 12 }}
            withoutCurrentColor={true}
            intent="primary"
            data-testid="thumbnail-select-change"
            onClick={handleChangeClick}
            text={changeText}
          />
        )}
        {showAllOptions && value ? (
          <Button
            className={css.changeButton}
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

export default connect<ThumbnailSelectProps>(ThumbnailSelect)
