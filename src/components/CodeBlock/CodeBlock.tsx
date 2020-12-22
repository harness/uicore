import React from 'react'
import { Container } from '../Container/Container'
import { Button } from '../Button/Button'
import { Text } from '../Text/Text'
import { Utils } from '../../core/Utils'
import { Color } from '../../core/Color'
import css from './CodeBlock.css'

export interface CodeBlockProps {
  snippet?: string
  allowCopy?: boolean
  format?: string
  lineClamp?: number
  height?: number
}

export function CodeBlock(props: CodeBlockProps) {
  const { snippet = '', allowCopy, format = 'Text', lineClamp, height } = props

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
      {allowCopy && <Button icon="duplicate" minimal onClick={() => Utils.copy(snippet)} iconProps={{ size: 12 }} />}
    </Container>
  )
}
