import React from 'react'
import { InputGroup, IInputGroupProps, Popover, Menu, IPopoverProps } from '@blueprintjs/core'
import { QueryList, IQueryListRendererProps, IItemRendererProps } from '@blueprintjs/select'

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
}

/**
 * This regex does not have ending bracket intentionally
 * because we want to match the start of the expression
 */
const EXPRESSION_START_REGEX = /<\+([A-Za-z0-9_.'"()]*?)$/

export function ExpressionInput(props: ExpressionInputProps): React.ReactElement {
  const { items = [], value, inputProps, popoverProps, onChange, name, maxHeight = 400 } = props
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

  React.useEffect(() => {
    // reset cursor position when query value is empty
    if (!queryValue) {
      cursorRef.current = null
    }
  }, [queryValue])

  React.useEffect(() => {
    onChange(inputValue)
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
            // position is sum of firstHalf.length + 2 (for '<+') + item.length + 1 (for '>')
            const position = firstHalf.length + 2 + item.length + 1

            inputRef.current.focus()
            inputRef.current.setSelectionRange(position, position)
          }
        })
      }
    }
  }

  function updateQueryBasedOnCursor(indexAt: number | null, value: string) {
    // update cursor position
    cursorRef.current = indexAt

    if (typeof indexAt === 'number') {
      // get everthing before cursor
      const query = value.slice(0, indexAt)
      const match = query.match(EXPRESSION_START_REGEX)

      // if it matches the regex, update state
      if (match) {
        setQueryValue(value.slice(0, (match.index || 0) + match[0].length))
      } else {
        resetQuery()
      }
    }
  }

  function renderer(listProps: IQueryListRendererProps<string>): JSX.Element {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { value, selectionStart } = e.target as HTMLInputElement

      listProps.handleQueryChange(e)

      setInputValue(value)
      updateQueryBasedOnCursor(selectionStart, value)
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

    function handleMouseUp(e: React.MouseEvent): void {
      const { selectionStart, value } = e.target as HTMLInputElement
      updateQueryBasedOnCursor(selectionStart, value)
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
        isOpen={items.length > 0 && !!queryValue}>
        <InputGroup
          {...inputProps}
          autoComplete={props.autoComplete}
          name={name}
          inputRef={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={listProps.handleKeyDown}
          onKeyUp={handleKeyUp}
          onMouseUp={handleMouseUp}
        />
        <Menu style={{ maxHeight, overflow: 'auto' }}>{listProps.itemList}</Menu>
      </Popover>
    )
  }

  function itemRenderer(item: string, itemProps: IItemRendererProps): JSX.Element | null {
    const { query, handleClick, modifiers, index } = itemProps
    const match = query.match(EXPRESSION_START_REGEX)

    if (!match) return null

    return (
      <Menu.Item
        key={`${item}${index}`}
        text={
          <span>
            <mark>{item.slice(0, match[1].length)}</mark>
            {item.slice(match[1].length)}
          </span>
        }
        onClick={handleClick}
        active={modifiers.active}
        disabled={modifiers.disabled}
      />
    )
  }

  return (
    <QueryList
      query={queryValue}
      itemPredicate={(query: string, item: string) => {
        const match = query.match(EXPRESSION_START_REGEX)

        return !!match && item.toLowerCase().startsWith(match[1].toLowerCase())
      }}
      items={items}
      renderer={renderer}
      itemRenderer={itemRenderer}
      onItemSelect={handleItemSelect}
    />
  )
}
