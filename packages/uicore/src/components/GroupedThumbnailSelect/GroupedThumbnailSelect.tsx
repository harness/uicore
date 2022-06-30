/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import css from './GroupedThumbnailSelect.css'
import { Layout } from '../../layouts/Layout'
import { Button } from '../Button/Button'
import { FormGroup } from '@blueprintjs/core'
import { connect, FormikContextType } from 'formik'
import { clone, get, isEmpty } from 'lodash-es'
import { Intent } from '@harness/design-system'
import { errorCheck } from '../../core/Utils'
import { Thumbnail } from '../Thumbnail/Thumbnail'
import { Text } from '../Text/Text'
import { Container } from '../Container/Container'
import { Item, ThumbnailSelectProps } from '../ThumbnailSelect/ThumbnailSelect'
import { FormError } from '../FormError/FormError'
import cx from 'classnames'

export interface Group {
  items: Item[]
  groupLabel: string
}

export interface ConnectedGroupedThumbnailSelectProps extends GroupedThumbnailSelectProps {
  formik: FormikContextType<Record<string, never>>
}

export interface GroupedThumbnailSelectProps extends Omit<ThumbnailSelectProps, 'items'> {
  groups: Group[]
}

const GroupedThumbnailSelect: React.FC<ConnectedGroupedThumbnailSelectProps> = props => {
  const {
    name,
    formik,
    groups,
    isReadonly = false,
    layoutProps,
    changeText = 'Change',
    cancelText = 'Close',
    className,
    thumbnailClassName,
    onChange
  } = props
  const value = get(formik.values, name)

  const [showAllOptions, setShowAllOptions] = React.useState(isEmpty(value))
  const [visibleGroups, setVisibleGroups] = React.useState(groups)

  const hasError = errorCheck(name, formik)
  const intent = hasError ? Intent.DANGER : Intent.NONE
  const helperText = hasError ? <FormError name={name} errorMessage={get(formik?.errors, name)} /> : null

  React.useEffect(() => {
    setShowAllOptions(isEmpty(value))
  }, [value])

  React.useEffect(() => {
    if (showAllOptions) {
      setVisibleGroups(groups)
    } else {
      for (const group of groups) {
        const items = [...group.items]
        const selectedItemIndex = items.findIndex(item => item.value === value)
        if (selectedItemIndex > -1) {
          const visibleGroup = clone(group)
          visibleGroup.items = [items[selectedItemIndex]]
          setVisibleGroups([visibleGroup])
        }
      }
    }
  }, [showAllOptions])

  function handleChangeClick(): void {
    setShowAllOptions(true)
  }

  function handleCancelClick(): void {
    setShowAllOptions(false)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { value } = e.target

    formik.setFieldValue(name, value)
    formik.setFieldTouched(name, true, false)

    onChange?.(value)
  }

  return (
    <FormGroup className={cx(css.mainContainer, className)} helperText={helperText} intent={intent}>
      <Layout.Horizontal className={css.container} spacing={'medium'}>
        {visibleGroups.map((visibleGroup, index) => {
          return (
            <Container key={visibleGroup.groupLabel}>
              <Text font={{ size: 'small', weight: 'semi-bold' }} color={'black'}>
                {visibleGroup.groupLabel}
              </Text>
              <Layout.Horizontal className={css.thumbnailsRow} spacing={'medium'} {...layoutProps}>
                {visibleGroup.items.map(item => {
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
                {index === visibleGroups.length - 1 && (
                  <>
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
                  </>
                )}
              </Layout.Horizontal>
            </Container>
          )
        })}
      </Layout.Horizontal>
    </FormGroup>
  )
}

export default connect<GroupedThumbnailSelectProps>(GroupedThumbnailSelect)
