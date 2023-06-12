/*
 * Copyright 2023 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import { ChildKeyNode } from 'components/ExpressionDropdown/ExpressionDropdown'

interface TrieNode {
  value: string
  valueTillHere: string
  children: TrieNode[]
  childKeys: ChildKeyNode[]
  childExpressions: string[]
}

export function formatData(expressions: string[]): TrieNode {
  const rootTrieNode: TrieNode = {
    value: 'Main',
    valueTillHere: '',
    children: [],
    childKeys: [],
    childExpressions: []
  }
  expressions.forEach(expression => {
    const expressionWords = expression.split('.')
    let startNode = rootTrieNode

    expressionWords.forEach((word, index) => {
      startNode.childExpressions.push(expression)
      const isWordPresent = startNode.children.findIndex(child => child.value === word)
      if (isWordPresent !== -1) {
        startNode = startNode.children[isWordPresent]
      } else {
        let valueTillHere = ''
        expressionWords.forEach((w, ind) => {
          if (ind <= index) {
            if (valueTillHere.length) {
              valueTillHere = valueTillHere + '.' + w
            } else {
              valueTillHere = w
            }
          }
        })
        startNode.childKeys.push({
          key: word,
          value: valueTillHere
        })
        startNode.children.push({
          value: word,
          valueTillHere: valueTillHere,
          children: [],
          childKeys: [],
          childExpressions: []
        })
        startNode = startNode.children[startNode.children.length - 1]
      }
    })
  })
  return rootTrieNode
}
