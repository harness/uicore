import React, { Fragment } from 'react'

type SubstituteVars = Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
const MATCH_ELSE_KEY = '___'
const MAX_EXPRESSION_TRANSLATIONS_PER_KEY = 1000

function translateExpression(str: string, key: string, vars: SubstituteVars) {
  let startFrom = 0
  let loopCount = 0 // to prevent complex strings that may cause infinite loop

  // Replace simple i18n expression {key|match1:value1,match2:value2}
  // Sample: '{user} wants to merge {number} {number|1:commit,commits} into {target} from {source}'
  // Find `{number|`
  do {
    loopCount++
    const startIndex = str.indexOf(`{${key}|`, startFrom)

    if (startIndex === -1) {
      return str
    }

    // Find closing `}`
    const endIndex = str.indexOf('}', startIndex)

    if (endIndex === -1) {
      return str
    }

    // Get whole expression of `{number|1:commit,commits}`
    const expression = str.substring(startIndex, endIndex + 1)

    // Build value mapping from expression
    const mapping = expression
      .split('|')[1] // Get `1:commit,commits}`
      .slice(0, -1) // Remove last closing `}`
      .split(',') // ['1:commit', 'commits']
      .reduce((map, token) => {
        // Convert to a map { 1: commit, [MATCH_ELSE_KEY]: commits }
        const [k, v] = token.split(':')
        map[v ? k : MATCH_ELSE_KEY] = v || k
        return map
      }, {} as Record<string, string>)

    const matchedValue = mapping[vars[key]] || mapping[MATCH_ELSE_KEY]

    if (matchedValue) {
      startFrom = startIndex + matchedValue.length
      str = str.replace(expression, matchedValue)
    } else {
      startFrom = endIndex + 1
    }
  } while (startFrom < str.length && loopCount <= MAX_EXPRESSION_TRANSLATIONS_PER_KEY)

  return str
}

export function stringSubstitute(str: string, vars: SubstituteVars = {}, asTokens = false): string | string[] {
  const re = Object.keys(vars)
    .map(key => {
      str = translateExpression(str, key, vars)
      return `{${key}}`
    })
    .join('|')

  if (!re) {
    return str
  }

  const tokens = str
    .split(new RegExp('(' + re + ')', 'gi'))
    .filter(token => !!(token || '').trim())
    .map(token =>
      token.startsWith('{') && token.endsWith('}') ? vars[token.substring(1, token.length - 1)] || token : token
    )
  return asTokens ? tokens : tokens.join('')
}

export const StringSubstitute: React.FC<{
  str: string
  vars?: SubstituteVars
}> = ({ str, vars = {} }) => {
  const tokens = stringSubstitute(str, vars, true)

  return (
    <>{typeof tokens === 'string' ? str : tokens.map((token, index) => <Fragment key={index}>{token}</Fragment>)}</>
  )
}
