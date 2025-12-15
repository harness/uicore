/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */
import React, { useState } from 'react'
import { Boundary, Card, Menu, MenuItem, OverflowList, Popover } from '@blueprintjs/core'
import { Icon } from '@harness/icons'
import { Layout } from '../../layouts/Layout'
import { isEmpty, isUndefined } from 'lodash-es'
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

export const NewExpressionDropdown = (props: NewExpressionDropdownProps): JSX.Element => {
  const { rootTrieNode, query = '', itemRenderer, setQueryValue } = props

  const [isOpen, setIsOpen] = useState<boolean[]>([])
  const [isPopoverOpen, setIsPopoverOpen] = React.useState<boolean>(false)

  const overflowListItems = React.useMemo(() => {
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
    return listItems
  }, [rootTrieNode, query])

  const dropDownItemClickHandler = React.useCallback((value: string): void => {
    setQueryValue(prevQuery => {
      const valueBefore = prevQuery.substring(0, prevQuery.lastIndexOf('<'))
      return `${valueBefore}<+${value}`
    })
  }, [])

  const itemClickHandler = React.useCallback(
    (valueTillHere: string, isOverflow = false): void => {
      setOpenTargetElement(isOpen, setIsOpen, valueTillHere, true)
      isOverflow && setIsPopoverOpen(prevState => !prevState)
    },
    [isOpen, setIsOpen]
  )

  const showDropdownIcon = (item: TrieNode) => item.children.some(child => child.children.length !== 0)

  const visibleItemRenderer = React.useMemo(() => {
    const VisibleItem = (item: TrieNode, index: number): JSX.Element => {
      const clickHandler = () => itemClickHandler(item.valueTillHere)

      // return the visible item JSX from here
      const content = (
        <Layout.Horizontal className={css.visibleItemText} onClick={clickHandler}>
          <div className={css.visibleItemTextHeader}>{item.value}</div>
          {showDropdownIcon(item) && (
            <Icon name={getDropDownIcon(item, isOpen)} className={css.paddingLeft} size={10} />
          )}
        </Layout.Horizontal>
      )

      return (
        <Popover key={index} minimal>
          {content}
          <Menu>
            {item.children.map(
              (child, ind) =>
                child.children.length !== 0 && (
                  <MenuItem
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
    return VisibleItem
  }, [dropDownItemClickHandler, isOpen, setIsOpen])

  const overflowListRenderer = React.useMemo(() => {
    const OverflowList = (items: TrieNode[]): JSX.Element => {
      const clickHandler = () => itemClickHandler(items[0].valueTillHere, true)

      return (
        <Layout.Horizontal>
          <Popover isOpen={isPopoverOpen} minimal>
            <Layout.Horizontal className={css.visibleItemText} onClick={clickHandler}>
              <div className={css.visibleItemTextHeader}>{items[0].value}</div>
              <Icon name={getDropDownIcon(items[0], isOpen)} padding={{ left: '5px', right: '10px' }} size={10} />
            </Layout.Horizontal>
            <Menu>
              {items[0].children.map(
                (child, ind) =>
                  child.children.length !== 0 && (
                    <MenuItem
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
            <Popover minimal>
              <div style={{ cursor: 'pointer' }}>...</div>
              <Menu>
                {items.map((item, index) => {
                  if (index !== 0) {
                    return (
                      <MenuItem
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

    return OverflowList
  }, [dropDownItemClickHandler, isOpen, setIsOpen])

  const queryValue = query.substring(query.lastIndexOf('+') + 1)

  if (isEmpty(queryValue)) {
    return <></>
  }

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
