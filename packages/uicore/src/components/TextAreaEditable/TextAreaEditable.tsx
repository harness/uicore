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

function deserialize(input: string): TextObject[] {
  const split = input.split(VAR_REGEX)

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

export function setCaret(element: ChildNode, index: number): void {
  const range = document.createRange()
  range.setStart(element, index)
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
    return nextProps.value !== (this.props.inputRef.current as any)?.textContent
  }

  handleKeyDown(e: any): void {
    const { textContent } = e.target

    if (e.key === '>' && this.props.inputRef.current) {
      e.preventDefault()
      const index = getCaretIndex(e.target) + 2

      const newStr =
        (textContent.slice(0, index) as string) +
        (e.key as string) +
        (textContent.slice(index).trimEnd() as string) +
        ' '

      this.props.inputRef.current.innerHTML = highlight(deserialize(newStr))

      const childNodesTextLength = createChildNodeLengthSumArray(this.props.inputRef.current.childNodes)

      const childIndex = childNodesTextLength.findIndex(i => {
        return i >= index
      })

      const child = this.props.inputRef.current.childNodes[childIndex]
      const offset = childNodesTextLength[childIndex] - index + 1

      setCaret(child, offset)

      this.props.onInput(e)
    }
    this.props.keyDown(e)
  }

  render() {
    const { value, inputRef, textAreaClassName, ...rest } = this.props

    return (
      <div
        {...rest}
        className={cx(css.editable, textAreaClassName)}
        ref={inputRef}
        contentEditable={'plaintext-only' as any}
        onKeyDown={this.handleKeyDown.bind(this)}
        dangerouslySetInnerHTML={{ __html: highlight(deserialize(value + ' ')) }}
      />
    )
  }
}