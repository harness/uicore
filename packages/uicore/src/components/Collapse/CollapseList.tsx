/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useCallback } from 'react'
import { Container } from '../Container/Container'
import { ListPanelInterface } from './CollapseListPanel'

interface CollapseListProps {
  defaultOpenIndex?: number
  children: JSX.Element | JSX.Element[]
}

const CollapseList: React.FC<CollapseListProps> = props => {
  const { defaultOpenIndex, children } = props
  const [openedIndices, setOpenPanelIndex] = useState<Set<number>>(
    new Set(defaultOpenIndex || defaultOpenIndex === 0 ? [defaultOpenIndex] : [])
  )
  const openNextCallback = useCallback(
    (index: number) => {
      openedIndices.delete(index)
      const newIndices = new Set<number>(Array.from(openedIndices))
      if (React.Children.count(children) > index + 1 && !newIndices.has(index + 1)) {
        newIndices.add(index + 1)
      }
      setOpenPanelIndex(newIndices)
    },
    [openedIndices, children]
  )

  const onToggleOpenCallback = useCallback(
    index => (isOpen?: boolean) => {
      const containsIndex = openedIndices.has(index)
      if (containsIndex && !isOpen) {
        openedIndices.delete(index)
        const newIndices = new Set<number>(Array.from(openedIndices))
        setOpenPanelIndex(newIndices)
      } else if (!containsIndex && isOpen) {
        openedIndices.add(index)
        const newIndices = new Set<number>(Array.from(openedIndices))
        setOpenPanelIndex(newIndices)
      }
    },
    [openedIndices]
  )

  return (
    <Container>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return child
        }
        const newProps: ListPanelInterface = {
          isOpen: openedIndices.has(index),
          onToggleOpen: onToggleOpenCallback(index),
          openNext: async () => {
            const childProps = child.props as ListPanelInterface
            if (childProps.openNext) {
              await childProps.openNext()
            }
            openNextCallback(index)
          }
        }
        return React.cloneElement(child, newProps)
      })}
    </Container>
  )
}

export { CollapseList, CollapseListProps }
