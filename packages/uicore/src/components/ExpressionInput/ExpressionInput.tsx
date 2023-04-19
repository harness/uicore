/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { IInputGroupProps, Popover, Menu, IPopoverProps, InputGroup } from '@blueprintjs/core'
import { QueryList, IQueryListRendererProps, IItemRendererProps, ItemRenderer } from '@blueprintjs/select'
import { debounce } from 'lodash-es'
import { escapeStringRegexp } from '../../core/Utils'

import css from './ExpressionInput.css'
import {
  createChildNodeLengthSumArray,
  getCaretIndex,
  setCaret,
  TextAreaEditable
} from '../TextAreaEditable/TextAreaEditable'

export interface ExpressionInputProps {
  items?: string[]
  value?: string
  name: string
  maxHeight?: React.CSSProperties['maxHeight']
  inputProps?: Omit<IInputGroupProps, 'value' | 'onChange'>
  popoverProps?: Omit<
    IPopoverProps,
    'isOpen' | 'interactionKind' | 'hasBackdrop' | 'backdropProps' | 'autoFocus' | 'enforceFocus'
  >
  onChange(str: string): void
  autoComplete?: string
  disabled?: boolean
  newExpressionComponent?: boolean
  textAreaClassName?: string
}

/**
 * This regex does not have ending bracket intentionally
 * because we want to match the start of the expression
 */
const EXPRESSION_START_REGEX = /<\+([A-Za-z0-9_.'"()]*?)$/

export function getItemRenderer(setActiveItem: (item: string) => void): ItemRenderer<string> {
  // eslint-disable-next-line react/display-name
  return (item: string, itemProps: IItemRendererProps): JSX.Element | null => {
    const { query, handleClick, modifiers, index } = itemProps
    const queryMatch = query.match(EXPRESSION_START_REGEX)

    if (!queryMatch || !queryMatch[1]) return null

    const match = item.match(new RegExp(escapeStringRegexp(queryMatch[1]), 'i'))

    if (!match) return null

    const matchIndex = match.index || 0
    const startText = item.slice(0, matchIndex)
    const matchedText = item.slice(matchIndex, matchIndex + queryMatch[1].length)
    const endText = item.slice(matchIndex + queryMatch[1].length)

    // bdi Tag reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
    // https://stackoverflow.com/a/24800788

    return (
      <Menu.Item
        key={`${item}${index}`}
        text={
          <span className={css.menuItem}>
            {startText ? <span className={css.group1}>{startText}</span> : null}
            {matchedText ? <mark>{matchedText}</mark> : null}
            {endText ? (
              <span className={css.group2}>
                <bdi>{endText}</bdi>
              </span>
            ) : null}
          </span>
        }
        title={item}
        onClick={handleClick}
        active={modifiers.active}
        disabled={modifiers.disabled}
        onMouseEnter={() => setActiveItem(item)}
      />
    )
  }
}

export function ExpressionInput(props: ExpressionInputProps): React.ReactElement {
  const {
    items = [],
    value,
    inputProps,
    popoverProps,
    onChange,
    name,
    maxHeight = 400,
    disabled,
    autoComplete = 'off',
    newExpressionComponent,
    textAreaClassName = ''
  } = props
  const mountRef = React.useRef(false)
  /**
   * This holds the complete value of the input
   */
  const [inputValue, setInputValue] = React.useState(value || '')

  /**
   * This holds a partial value of the input upto the current cursor position
   * This value is used to determine the logic to show the options
   */
  const [queryValue, setQueryValue] = React.useState('')

  /**
   * This holds the current cursor position
   */
  const cursorRef = React.useRef<number | null>(null)

  /**
   * This holds the input ref
   */
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  const [filteredItems, setFilteredItems] = React.useState<string[]>([])

  React.useEffect(() => {
    // reset cursor position when query value is empty
    if (!queryValue) {
      cursorRef.current = null
    }

    setFilteredItems(
      items.filter((item: string) => {
        const match = queryValue.match(EXPRESSION_START_REGEX)

        return !!match && item.toLowerCase().includes(match[1].toLowerCase())
      })
    )
  }, [queryValue])

  React.useEffect(() => {
    if (mountRef.current) {
      onChange(inputValue)
    } else {
      mountRef.current = true
    }
  }, [inputValue])

  function resetQuery(): void {
    setQueryValue('')
  }

  function handleItemSelect(item: string): void {
    // when we have valid cursor position
    if (typeof cursorRef.current === 'number') {
      // find if the value "<+" styled var at its end
      // example: "<+app.na", "<+pipe"
      const match = queryValue.match(EXPRESSION_START_REGEX)

      // if we find a match
      if (match) {
        // split the value till the match index

        // for example if the value is "This is my app <+app.name> and this is <+app.description>"
        // and the match is "<+app.name"
        // then firstHalf = "This is my app "
        // and second half = "<+app.name> and this is <+app.description>"
        const firstHalf = inputValue.slice(0, match.index)
        const secondHalf = inputValue.slice(match.index)

        // look for ">" in secondHalf
        const index = secondHalf.indexOf('>')

        // if ">" is found, use everything after that else just append ">"
        const suffix = index > -1 ? secondHalf.slice(index) : '>'

        // combine all the parts
        const newValue = `${firstHalf}<+${item}${suffix}`

        // update value
        setInputValue(newValue)

        // reset query to close
        resetQuery()

        // maintain cursor position
        window.requestAnimationFrame(() => {
          if (inputRef.current) {
            if (newExpressionComponent) {
              // the + 1 extra for this position is to put the cursor one step ahead of expression closing to bring
              // it out of the scope for editable span

              const position = firstHalf.length + 2 + item.length + 2
              // this is required to maintain the caret position

              const childNodesTextLength = createChildNodeLengthSumArray(inputRef.current.childNodes)

              const childIndex = childNodesTextLength.findIndex(i => {
                return i >= position
              })

              const child = inputRef.current.childNodes[childIndex]
              const offset = childNodesTextLength[childIndex - 1] - position + 2

              setCaret(child, offset)
            } else {
              // position is sum of firstHalf.length + 2 (for '<+') + item.length + 1 (for '>')
              const position = firstHalf.length + 2 + item.length + 1

              inputRef.current.focus()
              inputRef.current.setSelectionRange(position, position)

              // this is required to bring cursor into view for text which is longer than the field
              inputRef.current.blur()
              inputRef.current.focus()
            }
          }
        })
      }
    }
  }

  const updateQueryBasedOnCursor = React.useCallback(
    debounce((indexAt: number | null, value: string) => {
      // update cursor position
      cursorRef.current = indexAt

      if (typeof indexAt === 'number') {
        // get everything before cursor
        const query = value.slice(0, indexAt)
        const match = query.match(EXPRESSION_START_REGEX)

        // if it matches the regex, update state
        if (match) {
          setQueryValue(value.slice(0, (match.index || 0) + match[0].length))
        } else {
          resetQuery()
        }
      }
    }, 300),
    []
  )

  function handleActiveItemChange(item: string | null) {
    setActiveItem(item)
  }

  function renderer(listProps: IQueryListRendererProps<string>): JSX.Element {
    function handleChangeForTextAreaEditable(e: React.ChangeEvent<HTMLInputElement>) {
      const { textContent } = e.target as HTMLInputElement

      const selectionStart = getCaretIndex(e.target)

      listProps.handleQueryChange({ ...e, target: { ...e.target, value: textContent as string, selectionStart } })

      setInputValue(textContent as string)
      updateQueryBasedOnCursor(selectionStart, textContent as string)
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { value, selectionStart } = e.target as HTMLInputElement

      listProps.handleQueryChange(e)

      setInputValue(value)
      updateQueryBasedOnCursor(selectionStart, value)
    }

    function handleKeyUpForTextAreaEditable(e: React.KeyboardEvent<HTMLInputElement>) {
      listProps.handleKeyUp(e)

      const { key } = e
      const { textContent } = e.target as HTMLInputElement

      const selectionStart = getCaretIndex(e.target as any)

      // only update query when moving left and right
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        updateQueryBasedOnCursor(selectionStart, textContent as string)
      }
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
      listProps.handleKeyUp(e)

      const { key } = e
      const { selectionStart, value } = e.target as HTMLInputElement

      // only update query when moving left and right
      if (key === 'ArrowLeft' || key === 'ArrowRight') {
        updateQueryBasedOnCursor(selectionStart, value)
      }
    }

    function handleMouseUpForTextAreaEditable(e: React.MouseEvent): void {
      const { textContent } = e.target as HTMLInputElement
      const selectionStart = getCaretIndex(e.target as any)
      updateQueryBasedOnCursor(selectionStart, textContent as string)
    }

    function handleMouseUp(e: React.MouseEvent): void {
      const { selectionStart, value } = e.target as HTMLInputElement
      updateQueryBasedOnCursor(selectionStart, value)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
      const { key } = e

      if (key === 'Enter') {
        e.stopPropagation()
        e.preventDefault()
      } else if ((key === 'ArrowUp' || key === 'ArrowDown') && activeItem) {
        let index = filteredItems.indexOf(activeItem)
        const total = filteredItems.length

        if (key === 'ArrowUp') {
          index = (total + index - 1) % total
        } else if (key === 'ArrowDown') {
          index = (index + 1) % total
        }

        setActiveItem(filteredItems[index])
      }
    }

    return (
      <Popover
        targetTagName="div"
        wrapperTagName="div"
        position="bottom-left"
        minimal
        {...popoverProps}
        hasBackdrop
        backdropProps={{ onClick: resetQuery }}
        autoFocus={false}
        enforceFocus={false}
        popoverClassName={css.popover}
        isOpen={items.length > 0 && !!queryValue}>
        {!newExpressionComponent ? (
          <InputGroup
            {...inputProps}
            autoComplete={autoComplete}
            name={name}
            inputRef={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onMouseUp={handleMouseUp}
            disabled={disabled}
          />
        ) : (
          <TextAreaEditable
            name={name}
            inputRef={inputRef}
            value={inputValue}
            onInput={handleChangeForTextAreaEditable}
            keyDown={handleKeyDown}
            onKeyUp={handleKeyUpForTextAreaEditable}
            onMouseUp={handleMouseUpForTextAreaEditable}
            disabled={disabled}
            textAreaClassName={textAreaClassName}
          />
        )}
        <React.Fragment>
          {listProps.itemList
            ? React.cloneElement(listProps.itemList as React.ReactElement, {
                className: css.menu,
                style: { maxHeight }
              })
            : null}
        </React.Fragment>
      </Popover>
    )
  }

  const itemRenderer = React.useMemo(() => getItemRenderer(setActiveItem), [setActiveItem])

  return (
    <QueryList
      query={queryValue}
      items={filteredItems}
      renderer={renderer}
      itemRenderer={itemRenderer}
      onItemSelect={handleItemSelect}
      activeItem={activeItem}
      onActiveItemChange={handleActiveItemChange}
    />
  )
}
