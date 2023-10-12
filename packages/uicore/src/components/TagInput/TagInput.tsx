/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { Button, Icon, ITagProps, MenuItem, Spinner, HTMLInputProps } from '@blueprintjs/core'
import { IItemRendererProps, IMultiSelectProps, MultiSelect } from '@blueprintjs/select'
import cx from 'classnames'
import { I18nResource } from '@harness/design-system'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useIsMounted } from '../../hooks/useIsMounted'
import { Container } from '../Container/Container'
import { Text } from '../Text/Text'
import { Utils } from '../../core/Utils'
import css from './TagInput.css'
import i18nBase from './TagInput.i18n'

const isNext =
  typeof window !== 'undefined' && typeof window.next !== 'undefined' && typeof window.__NEXT_DATA__ !== 'undefined'

export interface TagInputItemsFutureResult<T> {
  items?: T[]
  error?: string
  success?: boolean
}

export type TagInputItemsFuture<T> = () => Promise<TagInputItemsFutureResult<T>>
export type TagValidator = (tag: string) => boolean | Promise<boolean>

export interface TagInputProps<T> extends Partial<Omit<IMultiSelectProps<T>, 'items'>> {
  /** Array of items possible to be added as tags, could be a future to be resolved as well */
  items: T[] | TagInputItemsFuture<T>

  /** Label for item */
  labelFor: (item: T) => string

  /** Key of item */
  keyOf: (item: T) => string | number | undefined

  /** When passed as true, new tag is allowed to be created */
  allowNewTag?: boolean

  /** Optional validator for new tag. If it's resolved true then new tag is added */
  validateNewTag?: TagValidator

  /** Item builder from newly created string tag (must be provided when `allowNewTag` is true) */
  itemFromNewTag: (newTag: string) => T

  /** Callback when a new item is created (`allowNewTag` must be true) */
  onNewItemCreated?: (newItem: T, selectedItems: T[], createdItems: T[], items: T[]) => void

  /** If true, newly created items will be shown in items list. Default to false. */
  showNewlyCreatedItemsInList?: boolean

  /** Whenever there is an interaction (add/remove event), onChange will be called */
  onChange?: (selectedItems: T[], createdItems: T[], items: T[]) => void

  /** Custom generator for tag props */
  getTagProps?: (
    value: React.ReactNode,
    index: number,
    selectedItems: T[],
    createdItems: T[],
    items: T[]
  ) => ITagProps | undefined

  /** Show clear all button to clear all current selected tags */
  showClearAllButton?: boolean

  /** No input border (NextGen styling) */
  noInputBorder?: boolean

  /** Show `+ tag` button at the end of the tags list, if true */
  showAddTagButton?: boolean

  /** True if editing is disallowed */
  readonly?: boolean

  /** i18n object */
  i18n?: I18nResource

  /** pass props to input, e.g. "data-name" */
  inputProps?: HTMLInputProps & Record<string, string>
}

const SPINNER = <Spinner className={css.spinner} size={Icon.SIZE_STANDARD} />

function FailToFetch({ error, retry }: { error: string; retry: () => void }) {
  return (
    <Container padding="xsmall" flex>
      <Text intent="danger" width={300}>
        {error}
      </Text>
      <Button text="Retry" onClick={retry} />
    </Container>
  )
}

export function TagInput<T>(props: TagInputProps<T>) {
  const {
    selectedItems: _selectedItems,
    items: _items,
    labelFor,
    keyOf,
    allowNewTag,
    validateNewTag,
    itemFromNewTag,
    onNewItemCreated,
    showNewlyCreatedItemsInList,
    getTagProps,
    onChange,
    showClearAllButton,
    noInputBorder,
    showAddTagButton,
    readonly,
    i18n: _i18n = {},
    inputProps,
    ...options
  } = props
  const [items, setItems] = useState<T[]>(Array.isArray(_items) ? _items : [])
  const [createdItems, setCreatedItems] = useState<T[]>([])
  const [selectedItems, setSelectedItems] = useState<T[]>(_selectedItems || [])
  const LocalMultiSelect = useMemo(() => MultiSelect.ofType<T>(), [])
  const [error, setError] = useState<string>()
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const i18n = useMemo(() => Object.assign({}, i18nBase, _i18n), [])
  const clear = useCallback(() => {
    setSelectedItems([])
    setCreatedItems([])
    onChange?.([], [], items)
  }, [items])
  const clearButton =
    showClearAllButton && !readonly
      ? useMemo(() => (selectedItems.length > 0 ? <Button icon="cross" minimal onClick={clear} /> : undefined), [
          _items,
          selectedItems?.length
        ])
      : undefined
  const onItemSelect = useCallback(
    (item: T) => {
      const index = selectedItems.findIndex(_item => keyOf(_item) === keyOf(item))
      const isSelectedItemAlreadyCreated = createdItems.find((_item: T) => keyOf(_item) === keyOf(item))
      if (index >= 0 && !isSelectedItemAlreadyCreated) {
        // item was already selected before
        // If the current selected item is already in created items, do not clear the already selected item.
        // CDNG-8531. If we enter 'tag1' twice, the values were being cleared because of below logic. But they should not.
        // The else block from line 163 will make sure tag1 is visible even after entering the value multiple times
        // So entering this if block only if current selecteditem is not part of the created item list
        const newSelectedItems = selectedItems.filter((_v, _index) => _index !== index)
        setSelectedItems(newSelectedItems)
        onChange?.(newSelectedItems, createdItems, items)
      } else if (items.find(_item => keyOf(_item) === keyOf(item))) {
        // item is contained inside items
        const _selectedItems = selectedItems.concat(item)
        setSelectedItems(_selectedItems)
        onChange?.(_selectedItems, createdItems, items)
      } else {
        ;(async () => {
          if (validateNewTag) {
            const isValidated = await validateNewTag(labelFor(item))

            if (!isValidated) {
              return
            }
          }
          const _createdItems = isSelectedItemAlreadyCreated ? createdItems : createdItems.concat(item)
          const _selectedItems = selectedItems.find((_item: T) => keyOf(_item) === keyOf(item))
            ? selectedItems
            : selectedItems.concat(item)

          setCreatedItems(_createdItems)
          setSelectedItems(_selectedItems)
          onNewItemCreated?.(item, _selectedItems, _createdItems, items)
          onChange?.(_selectedItems, _createdItems, items)
        })()
      }
    },
    [items, selectedItems, createdItems]
  )
  const renderCreateNewTag = useCallback(
    (query: string, active: boolean, handleClick: React.MouseEventHandler<HTMLElement>) => (
      <MenuItem icon="add" text={i18n.newTag(query)} active={active} onClick={handleClick} />
    ),
    []
  )
  const isItemSelected = useCallback((item: T) => !!selectedItems.find(_item => keyOf(_item) === keyOf(item)), [
    selectedItems
  ])
  const updateData = useCallback(() => {
    if (Array.isArray(_items)) {
      setItems(_items)
    } else if (_items instanceof Function) {
      ;(async () => {
        setLoading(true)
        setError(undefined)

        const { items: results, error } = await _items()

        if (isMounted.current) {
          setLoading(false)
          if (error) {
            setError(error)
            setItems([])
          } else if (results) {
            setItems(results)
          }
        }
      })()
    }
  }, [_items, isMounted])

  const itemPredicate = useCallback((query, item: T, _index, exactMatch) => {
    const itemLabel = labelFor(item)
    const normalizedTitle = itemLabel.toLowerCase()
    const normalizedQuery = query.toLowerCase()

    setError(undefined)

    if (exactMatch) {
      return normalizedTitle === normalizedQuery
    } else {
      return normalizedTitle.indexOf(normalizedQuery) >= 0
    }
  }, [])
  const _getTagProps = useCallback(
    (value: React.ReactNode, index: number): ITagProps => {
      if (showAddTagButton && !readonly && !selectedItems[index]) {
        return {
          intent: 'none',
          minimal: true,
          className: cx(css.tag, css.addTagButton)
        }
      }

      return Object.assign({}, getTagProps?.(value, index, selectedItems, createdItems, items), {
        minimal: true,
        className: css.tag
      })
    },
    [selectedItems, createdItems, items, readonly, showAddTagButton]
  )
  const renderedSelectedItems = useMemo(
    () => selectedItems.concat(showAddTagButton && !readonly ? itemFromNewTag(i18n.addTag) : []),
    [selectedItems, showAddTagButton, readonly]
  )

  useEffect(updateData, [_items])

  useEffect(() => {
    setSelectedItems(_selectedItems || [])
  }, [_selectedItems])

  return (
    <LocalMultiSelect
      className={css.tagInput}
      items={items
        .concat(showNewlyCreatedItemsInList ? createdItems : [])
        .sort((a, b) => (labelFor(a).toLocaleLowerCase() < labelFor(b).toLocaleLowerCase() ? -1 : 1))}
      selectedItems={renderedSelectedItems}
      itemRenderer={(item: T, itemProps: IItemRendererProps) => {
        return (
          <MenuItem
            key={keyOf(item)}
            text={labelFor(item)}
            icon={isItemSelected(item) ? 'tick' : 'blank'}
            onClick={itemProps.handleClick}
            active={itemProps.modifiers.active}
          />
        )
      }}
      createNewItemFromQuery={(allowNewTag && itemFromNewTag) || undefined}
      createNewItemRenderer={renderCreateNewTag}
      onItemSelect={onItemSelect}
      tagRenderer={labelFor}
      tagInputProps={{
        disabled: readonly,
        onRemove: (_value: string, index: number) => {
          const _selectedItems = selectedItems.filter((_item, _index) => _index !== index)
          setSelectedItems(_selectedItems)
          onChange?.(_selectedItems, createdItems, items)
        },
        onKeyDown: (event: React.KeyboardEvent) => {
          if (event.keyCode === 13) {
            Utils.stopEvent(event)
          }
        },
        rightElement: loading ? SPINNER : clearButton,
        tagProps: _getTagProps,
        className: cx(noInputBorder && css.input, readonly && css.readonly),
        inputProps
      }}
      noResults={
        loading ? null : (
          <MenuItem disabled={true} text={error ? <FailToFetch error={error} retry={updateData} /> : i18n.noResult} />
        )
      }
      itemPredicate={itemPredicate}
      popoverProps={{
        popoverClassName: css.popover,
        minimal: true,
        usePortal: !isNext
      }}
      resetOnSelect={true}
      {...options}
    />
  )
}
