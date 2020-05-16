import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { MultiSelect, IItemRendererProps, IMultiSelectProps } from '@blueprintjs/select'
import { MenuItem, Button, Spinner, Icon, ITagProps } from '@blueprintjs/core'
import { Text } from '../Text/Text'
import { useIsMounted } from '../../hooks/useIsMounted'
import css from './TagInput.css'
import { Container } from '../Container/Container'
import { I18nResource } from 'core/Types'
import i18nBase from './TagInput.i18n'

const isNext =
  typeof window !== 'undefined' && typeof window.next !== 'undefined' && typeof window.__NEXT_DATA__ !== 'undefined'

export interface TagInputItemsFutureResult<T> {
  items?: T[]
  error?: string
  success?: boolean
}

export type TagInputItemsFuture<T> = () => Promise<TagInputItemsFutureResult<T>>

export interface TagInputProps<T> extends Partial<Omit<IMultiSelectProps<T>, 'items'>> {
  items: T[] | TagInputItemsFuture<T>
  labelFor: (item: T) => string
  keyOf: (item: T) => string | number | undefined

  allowNewTag?: boolean
  addOnBlur?: boolean
  itemFromNewTag?: (newTag: string) => T
  onNewItemCreated?: (newItem: T, selectedItems: T[], createdItems: T[], items: T[]) => void

  onChange?: (selectedItems: T[], createdItems: T[], items: T[]) => void

  getTagProps?: (value: React.ReactNode, index: number, selectedItems: T[], createdItems: T[], items: T[]) => ITagProps

  showClearAllButton?: boolean

  i18n?: I18nResource
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
    itemFromNewTag,
    onNewItemCreated,
    getTagProps,
    onChange,
    showClearAllButton,
    i18n: _i18n = {},
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
  }, [_items])
  const clearButton = showClearAllButton
    ? useMemo(() => (selectedItems.length > 0 ? <Button icon="cross" minimal onClick={clear} /> : undefined), [
        _items,
        selectedItems?.length
      ])
    : undefined
  const onItemSelect = useCallback(
    (item: T) => {
      const index = selectedItems.findIndex(_item => keyOf(_item) === keyOf(item))

      if (index >= 0) {
        selectedItems.splice(index, 1)
        setSelectedItems(selectedItems)
        onChange?.(selectedItems, createdItems, items)
      } else if (items.find(_item => keyOf(_item) === keyOf(item))) {
        const _selectedItems = selectedItems.concat(item)
        setSelectedItems(_selectedItems)
        onChange?.(_selectedItems, createdItems, items)
      } else {
        const _createdItems = createdItems.concat(item)
        const _selectedItems = selectedItems.concat(item)

        setCreatedItems(_createdItems)
        setSelectedItems(_selectedItems)
        onNewItemCreated?.(item, _selectedItems, _createdItems, items)
        onChange?.(_selectedItems, _createdItems, items)
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
  const fetchData = useCallback(() => {
    if (_items instanceof Function) {
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
  }, [])
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
      return (
        getTagProps?.(value, index, selectedItems, createdItems, items) || {
          minimal: true
        }
      )
    },
    [selectedItems, createdItems, items]
  )

  useEffect(fetchData, [_items])

  return (
    <LocalMultiSelect
      items={items
        .concat(createdItems)
        .sort((a, b) => (labelFor(a).toLocaleLowerCase() < labelFor(b).toLocaleLowerCase() ? -1 : 1))}
      selectedItems={selectedItems}
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
      tagRenderer={(item: T) => labelFor(item)}
      tagInputProps={{
        onRemove: (_value: string, index: number) => {
          setSelectedItems(selectedItems.filter((_item, _index) => _index !== index))
        },
        rightElement: loading ? SPINNER : clearButton,
        tagProps: _getTagProps
      }}
      noResults={
        loading ? null : (
          <MenuItem disabled={true} text={error ? <FailToFetch error={error} retry={fetchData} /> : i18n.noResult} />
        )
      }
      itemPredicate={itemPredicate}
      popoverProps={{
        popoverClassName: css.popover,
        minimal: true,
        usePortal: !isNext
      }}
      {...options}
    />
  )
}
