/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
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
