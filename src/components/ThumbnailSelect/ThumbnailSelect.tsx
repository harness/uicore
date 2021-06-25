import React from 'react'
import css from './ThumbnailSelect.css'
import { IconName } from '../../icons/Icon'
import { Layout, LayoutProps } from '../../layouts/Layout'
import { Button } from '../Button/Button'
import { Color } from '../../core/Color'
import { FormGroup } from '@blueprintjs/core'
import { connect, FormikContext } from 'formik'
import { get, isEmpty } from 'lodash-es'
import { Intent } from '../../core/Intent'
import { errorCheck } from '../../core/Utils'
import { Thumbnail } from '../Thumbnail/Thumbnail'

export interface Item {
  label: string
  icon: IconName
  value: string
  disabled?: boolean
}

export interface ConnectedThumbnailSelectProps extends ThumbnailSelectProps {
  formik: FormikContext<Record<string, never>>
}

export interface ThumbnailSelectProps {
  name: string
  items: Item[]
  isReadonly?: boolean
  layoutProps?: Partial<LayoutProps>
  changeText?: string
  cancelText?: string
  className?: string
  thumbnailClassName?: string
  onChange?(val: string): void
}

const ThumbnailSelect: React.FC<ConnectedThumbnailSelectProps> = props => {
  const {
    name,
    formik,
    items,
    isReadonly = false,
    layoutProps,
    changeText = 'Change',
    cancelText = 'Cancel',
    className,
    thumbnailClassName,
    onChange
  } = props
  const value = get(formik.values, name)

  const [showAllOptions, setShowAllOptions] = React.useState(!isEmpty(value))

  const hasError = errorCheck(name, formik)
  const intent = hasError ? Intent.DANGER : Intent.NONE
  const helperText = hasError ? get(formik?.errors, name) : null

  React.useEffect(() => {
    setShowAllOptions(isEmpty(value))
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
    <FormGroup className={className} helperText={helperText} intent={intent}>
      <Layout.Horizontal spacing={'medium'} {...layoutProps}>
        {visibleItems.map(item => {
          return (
            <Thumbnail
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
          )
        })}
        {showAllOptions ? null : (
          <Button
            className={css.changeButton}
            disabled={isReadonly}
            minimal
            icon="Edit"
            iconProps={{ size: 10, color: Color.GREY_450 }}
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
            iconProps={{ size: 12, color: Color.GREY_450 }}
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
