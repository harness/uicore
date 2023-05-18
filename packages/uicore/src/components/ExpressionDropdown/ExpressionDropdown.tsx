/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
import React, { useState } from 'react'
import { Boundary, Card, Menu, OverflowList, Popover } from '@blueprintjs/core'
import { Icon } from '@harness/icons'
import { Layout } from '../../layouts/Layout'
import { isUndefined } from 'lodash-es'
import css from './ExpressionDropdown.css'
import { getDropDownIcon, setOpenTargetElement } from './utils'

export interface ChildKeyNode {
  key: string
  value: string
}

export interface TrieNode {
  value: string
  valueTillHere: string
  children: TrieNode[]
  childKeys: ChildKeyNode[]
  childExpressions: string[]
}

interface NewExpressionDropdownProps {
  rootTrieNode: TrieNode
  setQueryValue: React.Dispatch<React.SetStateAction<string>>
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  query: string
  itemRenderer: React.ReactNode
}

interface getVisibleItemRendererProps {
  dropDownItemClickHandler: (value: string) => void
  isOpen: boolean[]
  setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>
}

function getOverflowRenderer(props: getVisibleItemRendererProps): any {
  const { dropDownItemClickHandler, isOpen, setIsOpen } = props

  const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false)

  // eslint-disable-next-line react/display-name
  return (items: TrieNode[]): JSX.Element => {
    function itemClickHandler(valueTillHere: string): void {
      setIsPopoverOpen(!isPopoverOpen)
      setOpenTargetElement(isOpen, setIsOpen, valueTillHere, true)
    }

    return (
      <Layout.Horizontal>
        <Popover isOpen={isPopoverOpen}>
          <Layout.Horizontal className={css.visibleItemText} onClick={() => itemClickHandler(items[0].valueTillHere)}>
            <div className={css.visibleItemTextHeader}>{items[0].value}</div>
            <Icon name={getDropDownIcon(items[0], isOpen)} padding={{ left: '5px', right: '10px' }} size={10} />
          </Layout.Horizontal>
          <Menu>
            {items[0].children.map(
              (child, ind) =>
                child.children.length !== 0 && (
                  <Menu.Item
                    key={`${ind} ${child.value}`}
                    onClick={() => {
                      dropDownItemClickHandler(child.valueTillHere)
                      setOpenTargetElement(isOpen, setIsOpen, items[0].valueTillHere, false)
                    }}
                    text={child.value}
                  />
                )
            )}
          </Menu>
        </Popover>
        {items.length > 1 ? (
          <Popover>
            <div style={{ cursor: 'pointer' }}>...</div>
            <Menu>
              {items.map((item, index) => {
                if (index !== 0) {
                  return (
                    <Menu.Item
                      key={index}
                      text={item.value}
                      onClick={() => dropDownItemClickHandler(item.valueTillHere)}
                    />
                  )
                }
              })}
            </Menu>
          </Popover>
        ) : null}
      </Layout.Horizontal>
    )
  }
}

function getVisibleItemRenderer(props: getVisibleItemRendererProps): any {
  const { dropDownItemClickHandler, isOpen, setIsOpen } = props

  // eslint-disable-next-line react/display-name
  return (item: TrieNode, index: number): JSX.Element => {
    function itemClickHandler(valueTillHere: string): void {
      setOpenTargetElement(isOpen, setIsOpen, valueTillHere, true)
    }

    // return the visible item JSX from here

    const shallShowNesting = item.children.some(child => child.children.length !== 0)

    return (
      <Popover key={index}>
        <Layout.Horizontal className={css.visibleItemText} onClick={() => itemClickHandler(item.valueTillHere)}>
          <div className={css.visibleItemTextHeader}>{item.value}</div>
          {shallShowNesting && <Icon name={getDropDownIcon(item, isOpen)} className={css.paddingLeft} size={10} />}
        </Layout.Horizontal>
        <Menu>
          {item.children.map(
            (child, ind) =>
              child.children.length !== 0 && (
                <Menu.Item
                  key={`${ind} ${child.value}`}
                  onClick={() => {
                    dropDownItemClickHandler(child.valueTillHere)
                    setOpenTargetElement(isOpen, setIsOpen, item.valueTillHere, false)
                  }}
                  text={child.value}
                />
              )
          )}
        </Menu>
      </Popover>
    )
  }
}

export const NewExpressionDropdown = (props: NewExpressionDropdownProps): JSX.Element => {
  const { rootTrieNode, query = '', itemRenderer, setQueryValue } = props

  const [overflowListItems, setOverflowListItems] = useState<TrieNode[]>([])

  const [isOpen, setIsOpen] = useState<boolean[]>([])

  React.useEffect(() => {
    // set list items here and get the correct currentTrieNode
    let currentNode: TrieNode | undefined = rootTrieNode
    const listItems: TrieNode[] = [currentNode]
    const queryItems = query.substring(query.lastIndexOf('+') + 1).split('.')

    queryItems.forEach(word => {
      const wordIndex = currentNode?.children.findIndex(child => child.value === word)

      if (!isUndefined(wordIndex) && wordIndex !== -1) {
        currentNode = currentNode?.children?.[wordIndex]
        listItems.push(currentNode as TrieNode)
      } else {
        currentNode = undefined
      }
    })

    setOverflowListItems(listItems)
  }, [query])

  const dropDownItemClickHandler = (value: string): void => {
    const valueBefore = query.substring(0, query.lastIndexOf('<'))
    setQueryValue(`${valueBefore}<+${value}`)
  }

  const visibleItemRenderer = getVisibleItemRenderer({ dropDownItemClickHandler, isOpen, setIsOpen })

  const overflowListRenderer = getOverflowRenderer({ dropDownItemClickHandler, isOpen, setIsOpen })
  return (
    <Card className={css.dropdown}>
      <OverflowList
        items={overflowListItems}
        collapseFrom={Boundary.START}
        visibleItemRenderer={visibleItemRenderer}
        overflowRenderer={overflowListRenderer}
        className={css.overflowList}
      />
      {itemRenderer}
    </Card>
  )
}
