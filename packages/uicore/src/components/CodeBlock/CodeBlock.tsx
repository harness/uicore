/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useMemo } from 'react'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import { Utils } from '../../core/Utils'
import { Color } from '@harness/design-system'
import css from './CodeBlock.css'

export interface CodeBlockProps {
  snippet?: string
  allowCopy?: boolean
  codeToCopy?: string
  format?: string
  lineClamp?: number
  height?: number
  onCopySuccess?: (arg: string) => void
  onCopyError?: (arg: unknown) => void
}

export function CodeBlock(props: CodeBlockProps) {
  const { snippet = '', allowCopy, codeToCopy, format = 'Text', lineClamp, height, onCopySuccess, onCopyError } = props

  const floatButton = useMemo<boolean>(() => {
    return lineClamp !== 1 && snippet.split(/\n/).length >= 2
  }, [lineClamp, snippet])

  const handleCopyButtonClick = useCallback(async () => {
    const copyContent = codeToCopy || snippet
    try {
      await Utils.copy(copyContent)
      onCopySuccess?.(copyContent)
    } catch (e) {
      onCopyError?.(e)
    }
  }, [codeToCopy, snippet])

  return (
    <Container
      padding={format === 'pre' ? 'xsmall' : 'small'}
      background={Color.GREY_100}
      margin="none"
      flex
      height={height}
      className={css.codeBlock}>
      {format !== 'pre' && (
        <Text
          color={Color.GREY_350}
          lineClamp={lineClamp}
          font={{
            size: 'normal',
            italic: true
          }}>
          {snippet}
        </Text>
      )}
      {format === 'pre' && <pre>{snippet}</pre>}
      {allowCopy && (
        <Button
          icon="duplicate"
          minimal
          onClick={handleCopyButtonClick}
          iconProps={{ size: 12 }}
          className={floatButton ? css.floatingCopyButton : undefined}
        />
      )}
    </Container>
  )
}
