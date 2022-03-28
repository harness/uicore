/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useMemo, useState } from 'react'
import css from './CategorizedSelect.css'
import { SelectOption, Select, SelectProps } from '../Select/Select'
import selectCss from '../Select/Select.css'
import { IItemRendererProps } from '@blueprintjs/select'
import cx from 'classnames'
import { Icon } from '@harness/icons'
import { Text } from '../Text/Text'
import { Container } from '../Container/Container'
import { Classes } from '@blueprintjs/core'
import { Formik, FormikForm, FormInput } from '../FormikForm/FormikForm'
import { Button } from '../Button/Button'

const CATEGORY_SELECT_VALUE = 'is-dropdown-category-'
const CREATABLE_OPTION_VALUE = 'is-new-option-value'

export interface CategorizedSelectOption extends SelectOption {
  category: string
}

type AddNewOptionFormValues = {
  name?: string
  category?: string
}

export interface CategorizedSelectProps {
  selectProps?: Omit<SelectProps, 'items' | 'itemRenderer' | 'value'>
  items: CategorizedSelectOption[]
  creatableOption?: {
    allowableCategoriesForNewOption?: (labels: string[]) => string[]
    validateNewOption?: (formValue: AddNewOptionFormValues) => { [fieldName: string]: string }
    creatableOptionLabel?: string
  }
  value?: string
  onChange?: (selectedItem: CategorizedSelectOption) => void
}

interface AddNewOptionFormProps {
  categoryOptions: SelectOption[]
  existingItems: SelectOption[]
  validate?: (formValue: AddNewOptionFormValues) => { [fieldName: string]: string }
  onComplete: (formValue?: AddNewOptionFormValues) => void
}

function AddNewOptionForm(props: AddNewOptionFormProps): JSX.Element {
  const { categoryOptions, validate, onComplete, existingItems } = props
  const defaultValidateFunction = (vals: AddNewOptionFormValues) => {
    const error: { name?: string; category?: string } = {}
    if (!vals?.name?.trim().length) {
      error.name = 'Name is required.'
      // ensure uniqueness
    } else if (!existingItems?.every(categoryOption => categoryOption.label !== vals.name)) {
      error.name = `${vals.name} already exists. Please provide a unique name.`
    }
    if (!vals?.category) {
      error.category = 'Category is required.'
    }
    return error
  }
  return (
    <Formik
      initialValues={{}}
      validate={validate ?? defaultValidateFunction}
      onSubmit={onComplete}
      formName="formikCategorizedSelect">
      {formikProps => (
        <FormikForm className={css.addNewOptionForm}>
          <FormInput.Text label="Name" name="name" />
          <FormInput.Select
            label="Category"
            name="category"
            items={categoryOptions}
            placeholder="Select category the new option is a part of"
          />
          <Button onClick={() => onComplete()} margin={{ right: 'small' }}>
            Cancel
          </Button>
          <Button
            intent="primary"
            onClick={() => {
              formikProps.submitForm()
            }}>
            Submit
          </Button>
        </FormikForm>
      )}
    </Formik>
  )
}

function createCategoryMaps(
  items: CategorizedSelectOption[] = []
): { itemToCategory: Map<string, string>; categoryList: string[] } {
  const itemToCategory = new Map<string, string>()
  const categoryList: string[] = []
  items.forEach(({ label, category }) => {
    itemToCategory.set(label, category)
    if (categoryList.every(addedCategory => addedCategory !== category)) {
      categoryList.push(category)
    }
  })
  return { itemToCategory, categoryList }
}

function createSelectOptionList(
  items: CategorizedSelectOption[],
  creatableOption?: CategorizedSelectProps['creatableOption']
): SelectOption[] {
  const itemsGroupedByCategory = new Map<string, SelectOption[]>()
  items.forEach(({ label, value, category }) => {
    const categorizedItems = itemsGroupedByCategory.get(category) || [
      { label: category, value: `${CATEGORY_SELECT_VALUE}${category}` }
    ]
    categorizedItems.push({ label, value })
    itemsGroupedByCategory.set(category, categorizedItems)
  })

  const selectItems: SelectOption[] = []
  Array.from(itemsGroupedByCategory.values()).forEach(categorizedItems => {
    selectItems.push(...categorizedItems)
  })
  if (creatableOption) {
    selectItems.unshift({
      label: creatableOption.creatableOptionLabel ?? 'Add new option',
      value: CREATABLE_OPTION_VALUE
    })
  }
  return selectItems
}

function getFilteredItems(
  query: string,
  unfilteredItems: SelectOption[],
  itemToCategory: Map<string, string>
): SelectOption[] {
  // group items by category, and for each category create a drop down option
  const filteredItems = new Map<string, SelectOption[]>()
  for (const item of unfilteredItems) {
    if (item.value === CREATABLE_OPTION_VALUE) {
      filteredItems.set('NEW_OPTION', [item])
      continue
    }
    const isCategory = item.value?.toString().startsWith(CATEGORY_SELECT_VALUE)
    const categoryName = isCategory ? item.label : itemToCategory.get(item.label) || ''
    const categorizedItems = filteredItems.get(categoryName) || [
      { label: categoryName, value: `${CATEGORY_SELECT_VALUE}${categoryName}` }
    ]
    if (isCategory && !categorizedItems) {
      filteredItems.set(categoryName, [item])
    } else if (!isCategory && item.label.toString().toLowerCase().includes(query.toLowerCase())) {
      if (item.value !== CREATABLE_OPTION_VALUE) {
        categorizedItems.push(item)
      }
      filteredItems.set(categoryName, categorizedItems)
    }
  }

  // for categories that have more than one entry, add them to drop down list
  const itemsToReturn: SelectOption[] = []
  Array.from(filteredItems.values()).forEach(selectItems => {
    if (selectItems?.length > 1 || selectItems?.[0]?.value === CREATABLE_OPTION_VALUE) {
      itemsToReturn.push(...selectItems)
    }
  })

  return itemsToReturn
}

export function CategorizedSelect(props: CategorizedSelectProps): JSX.Element {
  const { items: propItems, selectProps, creatableOption, onChange, value } = props
  const [items, setItems] = useState<CategorizedSelectOption[]>(propItems || [])
  const [collapsedCategories, setCollapsed] = useState<string[]>([])
  const { itemToCategory, categoryList } = useMemo(() => createCategoryMaps(items), [items])
  const [renderCreatableOptionForm, setDisplayCreatableOptionForm] = useState<boolean>(false)
  const selectOptions = useMemo(() => createSelectOptionList(items, creatableOption), [items])
  const selectOptionValue = value ? selectOptions?.find(option => option.value === value) : undefined
  const itemListPredicate = useCallback(
    (query: string, unfilteredItems: SelectOption[]) => getFilteredItems(query, unfilteredItems, itemToCategory),
    [itemToCategory, renderCreatableOptionForm]
  )

  // function to customize each option rendered in the drop down
  const itemRenderer = useCallback(
    (item: SelectOption, { handleClick, modifiers }: IItemRendererProps) => {
      const isCategory = typeof item.value === 'string' && item.value.startsWith(CATEGORY_SELECT_VALUE)
      const isCreatableOption = item.value === CREATABLE_OPTION_VALUE
      const categoryName = isCategory ? item.label : itemToCategory.get(item.label) || ''
      const collapsedCategoryIndex = collapsedCategories.findIndex(category => category === categoryName)
      const isCategoryCollapsed = collapsedCategoryIndex > -1

      // render creatable option in drop down
      if (isCreatableOption) {
        return (
          <li
            key={item.value?.toString()}
            className={cx(selectCss.menuItem, css.creatableOption)}
            onClick={() => setDisplayCreatableOptionForm(true)}>
            <Text intent="primary" icon="plus" iconProps={{ size: 10 }}>
              {item.label}
            </Text>
          </li>
        )
      }

      // render non category items in drop down
      if (!isCategory) {
        return isCategoryCollapsed ? (
          <span key={item.value?.toString()} />
        ) : (
          <li
            key={item.value?.toString()}
            onClick={handleClick}
            className={cx(selectCss.menuItem, css.item)}
            {...modifiers}>
            {item.label}
          </li>
        )
      }

      // render category items in the drop down
      return (
        <li
          key={item.value?.toString()}
          data-is-collapsed={isCategoryCollapsed}
          className={cx(selectCss.menuItem, css.categoryItem)}
          onClick={() => {
            if (isCategoryCollapsed) {
              collapsedCategories.splice(collapsedCategoryIndex, 1)
              setCollapsed([...collapsedCategories])
            } else {
              setCollapsed([...collapsedCategories, categoryName])
            }
          }}>
          <Icon name="chevron-down" size={14} className={css.collapseIcon} />
          {item.label}
        </li>
      )
    },
    [collapsedCategories, itemToCategory]
  )

  const itemListRenderer = useMemo(
    () =>
      renderCreatableOptionForm
        ? () => {
            const categoryOptions =
              creatableOption
                ?.allowableCategoriesForNewOption?.(categoryList)
                ?.map(newCat => ({ label: newCat, value: newCat })) ||
              categoryList.map(category => ({ label: category, value: category }))
            return (
              <Container className={Classes.MENU}>
                <AddNewOptionForm
                  existingItems={items}
                  categoryOptions={categoryOptions}
                  onComplete={formValues => {
                    if (formValues && formValues.name && formValues.category) {
                      setItems([
                        ...items,
                        { label: formValues.name, value: formValues.name, category: formValues.category }
                      ])
                    }
                    setDisplayCreatableOptionForm(false)
                  }}
                  validate={creatableOption?.validateNewOption}
                />
              </Container>
            )
          }
        : undefined,
    [renderCreatableOptionForm, categoryList, items]
  )

  return (
    <Select
      {...selectProps}
      value={selectOptionValue}
      allowCreatingNewItems={false}
      items={selectOptions}
      onChange={(item: SelectOption) => {
        const category = itemToCategory.get(item?.label || '') || ''
        onChange?.({ ...item, category })
      }}
      itemRenderer={itemRenderer}
      itemListRenderer={itemListRenderer}
      itemListPredicate={itemListPredicate}
    />
  )
}
