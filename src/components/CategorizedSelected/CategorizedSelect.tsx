import React, { useCallback, useMemo, useState } from 'react'
import css from './CategorizedSelect.css'
import { SelectOption, Select, SelectProps } from '../Select/Select'
import selectCss from '../Select/Select.css'
import { IItemRendererProps } from '@blueprintjs/select'
import cx from 'classnames'
import { Icon } from '../../icons/Icon'

export interface CategorizedSelectOption extends SelectOption {
  category: string
}

export interface SelectWithCategoriesProps {
  selectProps?: Omit<SelectProps, 'items' | 'itemRenderer'>
  items: CategorizedSelectOption[]
}

function createItemToCategoryMap(items: CategorizedSelectOption[] = []): Map<string, string> {
  const itemToCategory = new Map<string, string>()
  items.forEach(({ label, category }) => {
    itemToCategory.set(label, category)
  })
  return itemToCategory
}

function createSelectOptionList(items: CategorizedSelectOption[]): SelectOption[] {
  const itemsGroupedByCategory = new Map<string, SelectOption[]>()
  items.forEach(({ label, value, category }) => {
    let categorizedItems = itemsGroupedByCategory.get(category)
    if (!categorizedItems) {
      categorizedItems = []
      categorizedItems.push({ label: category, value: `is-dropdown-category-${category}` })
    }
    categorizedItems.push({ label, value })
    itemsGroupedByCategory.set(category, categorizedItems)
  })

  const selectItems: SelectOption[] = []
  Array.from(itemsGroupedByCategory.values()).forEach(categorizedItems => {
    selectItems.push(...categorizedItems)
  })
  return selectItems
}

export function CategorizedSelect(props: SelectWithCategoriesProps): JSX.Element {
  const { items = [], selectProps } = props
  const [collapsedCategories, setCollapsed] = useState<string[]>([])
  const itemToCategory = useMemo(() => createItemToCategoryMap(items), [items])
  const selectOptions = useMemo(() => createSelectOptionList(items), [items])

  const itemListPredicate = useCallback(
    (query: string, unfilteredItems: SelectOption[]) => {
      const filteredItems = new Map<string, SelectOption[]>()
      for (const item of unfilteredItems) {
        const isCategory = item.value?.toString().startsWith('is-dropdown-category-')
        const categoryName = isCategory ? item.label : itemToCategory.get(item.label) || ''
        let categorizedItems = filteredItems.get(categoryName)
        if (isCategory && !categorizedItems) {
          filteredItems.set(categoryName, [item])
        } else if (
          !isCategory &&
          item.label
            .toString()
            .toLowerCase()
            .includes(query.toLowerCase())
        ) {
          if (!categorizedItems) {
            categorizedItems = []
            categorizedItems.push({ label: categoryName, value: `is-dropdown-category-${categoryName}` })
          }
          categorizedItems.push(item)
          filteredItems.set(categoryName, categorizedItems)
        }
      }

      const itemsToReturn: SelectOption[] = []
      Array.from(filteredItems.values()).forEach(selectItems => {
        if (selectItems?.length > 1) {
          itemsToReturn.push(...selectItems)
        }
      })

      return itemsToReturn
    },
    [itemToCategory]
  )

  // function to customize each option rendered in the drop down
  const itemRenderer = useCallback(
    (item: SelectOption, { handleClick, modifiers }: IItemRendererProps) => {
      const isCategory = typeof item.value === 'string' && item.value.startsWith('is-dropdown-category-')
      const categoryName = isCategory ? item.label : itemToCategory.get(item.label) || ''
      const collapsedCategoryIndex = collapsedCategories.findIndex(category => category === categoryName)
      const isCategoryCollapsed = collapsedCategoryIndex > -1

      if (!isCategory) {
        return isCategoryCollapsed ? (
          <span key={item.value?.toString()} />
        ) : (
          <li key={item.value?.toString()} onClick={handleClick} className={selectCss.menuItem} {...modifiers}>
            {item.label}
          </li>
        )
      }

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

  return (
    <Select
      {...selectProps}
      allowCreatingNewItems={false}
      items={selectOptions}
      itemRenderer={itemRenderer}
      itemListPredicate={itemListPredicate}
    />
  )
}
