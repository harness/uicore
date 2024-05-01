/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable react/no-danger */
import React from 'react'
import cx from 'classnames'
import css from './TextAreaEditable.css'

const VAR_REGEX = /(<\+[a-zA-z0-9_.]+?>)/

function sanitizeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\u00a0/g, ' ')
}

function sanitizeHTMLTextObject(input: TextObject[]): TextObject[] {
  return input.map(item => {
    if (item.type === 'text') {
      return { type: item.type, text: sanitizeHTML(item.text) }
    } else return item
  })
}

function deserialize(input: string): TextObject[] {
  const split = (typeof input !== 'string' ? String(input) : input).split(VAR_REGEX)

  return split.map(part => {
    if (part.match(VAR_REGEX)) {
      const variable = part.slice(2).slice(0, -1)
      return {
        type: 'variable',
        text: variable
      }
    }

    return { type: 'text', text: part }
  })
}

interface TextObject {
  type: string
  text: string
}

function highlight(input: TextObject[]): string {
  return input
    .map(r => {
      if (r.type === 'variable') {
        return `<span style="color:darkorange">&lt;+${r.text}&gt;</span>`
      }

      return r.text
    })
    .join('')
}

export function getCaretIndex(element: HTMLElement): number {
  let position = 0
  const selection = window.getSelection()

  if (selection?.rangeCount !== 0) {
    const range = (window.getSelection() as any).getRangeAt(0)
    const preCaretRange = range.cloneRange()
    preCaretRange.selectNodeContents(element)
    preCaretRange.setEnd(range.endContainer, range.endOffset)
    position = preCaretRange.toString().length - (range.endOffset - range.startOffset)
  }

  return position
}

export function setCaret(element: ChildNode, index: number, isCompleteElement?: boolean): void {
  const range = document.createRange()
  // DOM treats the nested element's text (isCompleteElement) as a single entity so range cannot be handled with offset length
  if (isCompleteElement) {
    range.setStartAfter(element)
  } else {
    range.setStart(element, index)
  }
  range.collapse(true)

  const sel = window.getSelection() as any
  sel.removeAllRanges()
  sel.addRange(range)
}

export function createChildNodeLengthSumArray(arr: NodeListOf<ChildNode>): number[] {
  const childNodeLengthArray = Array.from(arr).reduce((arr: number[], child, i) => {
    const l = child.textContent?.length as number
    const prev = arr[i - 1] || 0

    arr.push(l + prev)

    return arr
  }, [])

  return childNodeLengthArray
}

type TextAreaEditableProps = {
  name: string
  inputRef: React.RefObject<HTMLDivElement>
  value: string
  onInput: (e: React.ChangeEvent<HTMLInputElement>) => void
  keyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onMouseUp: (e: React.MouseEvent) => void
  disabled?: boolean
  textAreaClassName?: string
}

export class TextAreaEditable extends React.Component<TextAreaEditableProps> {
  shouldComponentUpdate(nextProps: TextAreaEditableProps) {
    return (
      nextProps.value !== (this.props.inputRef.current as any)?.textContent ||
      nextProps.disabled !== this.props.disabled
    )
  }

  handleKeyDown(e: any): void {
    const { textContent } = e.target

    if (e.key === '>' && this.props.inputRef.current) {
      e.preventDefault()
      const index = getCaretIndex(e.target)

      const newStr =
        (textContent.slice(0, index) as string) + (e.key as string) + (textContent.slice(index).trimEnd() as string)

      this.props.inputRef.current.innerHTML = highlight(sanitizeHTMLTextObject(deserialize(newStr)))

      const childNodesTextLength = createChildNodeLengthSumArray(this.props.inputRef.current.childNodes)

      const childIndex = childNodesTextLength.findIndex(i => {
        return i >= index
      })

      const child = this.props.inputRef.current.childNodes[childIndex]
      const prevChild = this.props.inputRef.current.childNodes[childIndex - 1]
      let offset = 0
      if (prevChild) {
        offset = index - childNodesTextLength[childIndex - 1] + 1
      } else {
        offset = index + 1
      }

      this.props.onInput(e)
      /**
       * node.nodeName returns #text for an exclusive Text node
       *  MDN Reference :- https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeName
       */
      setCaret(child, offset, child.nodeName.toLowerCase() !== '#text')
    }
    this.props.keyDown(e)
  }

  render() {
    const { value, inputRef, textAreaClassName, disabled, ...rest } = this.props

    return (
      <div
        {...rest}
        className={cx(css.editable, textAreaClassName, {
          [css.disabled]: disabled
        })}
        ref={inputRef}
        /**
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
         * plaintext-only is not supported in firefox
         */
        contentEditable={!disabled}
        onKeyDown={disabled ? undefined : this.handleKeyDown.bind(this)}
        dangerouslySetInnerHTML={{ __html: highlight(deserialize(value)) }}
      />
    )
  }
}
