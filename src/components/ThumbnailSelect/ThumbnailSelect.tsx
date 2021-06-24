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
}

const ThumbnailSelect: React.FC<ConnectedThumbnailSelectProps> = props => {
  const { name, formik, items, isReadonly = false, layoutProps } = props
  const [visibleItems, setVisibleItems] = React.useState<Item[]>(items)
  const [lastSelectedValue, setLastSelectedValue] = React.useState<string>('')

  const value = get(formik.values, name)
  const hasError = errorCheck(name, formik)
  const intent = hasError ? Intent.DANGER : Intent.NONE
  const helperText = hasError ? get(formik?.errors, name) : null

  React.useEffect(() => {
    if (!isEmpty(value)) {
      const filteredItems = items.filter(item => item.value === value)
      setVisibleItems(filteredItems)
      setLastSelectedValue(value)
    } else {
      const lastSelectedIndex = items.findIndex(item => item.value === lastSelectedValue)
      if (lastSelectedIndex > -1) {
        const newItems = [...items]
        const itemToReplace = newItems[lastSelectedIndex]
        newItems.splice(lastSelectedIndex, 1)
        newItems.unshift(itemToReplace)
        setVisibleItems(newItems)
      } else {
        setVisibleItems(items)
      }
    }
  }, [value, items])

  function handleChange(value: string): void {
    formik.setFieldValue(name, value)
    formik.setFieldTouched(name, true)
  }

  return (
    <FormGroup helperText={helperText} intent={intent}>
      <Layout.Horizontal spacing={'medium'} {...layoutProps}>
        {visibleItems.map(item => {
          return (
            <Thumbnail
              key={item.value}
              label={item.label}
              value={item.value}
              icon={item.icon}
              disabled={item.disabled || isReadonly}
              selected={item.value === value}
              onClick={handleChange}
            />
          )
        })}
        {value && (
          <Button
            className={css.changeButton}
            disabled={isReadonly}
            minimal
            icon={'Edit'}
            iconProps={{ size: 10, color: Color.GREY_450 }}
            intent="primary"
            onClick={_e => {
              handleChange('')
            }}
            text={'Change'}
          />
        )}
      </Layout.Horizontal>
    </FormGroup>
  )
}

export default connect<ThumbnailSelectProps>(ThumbnailSelect)
