import React, { useState } from 'react'
import { Color, FontVariation } from '@harness/design-system'
import { Layout, Text } from '../../../index'
import css from './HelpfulButton.css'

export interface HelpfulButtonProps {
  messageId: string
  onHelpfulClick?: (messageId: string, isHelpful: boolean) => void
}

export function HelpfulButton({ messageId, onHelpfulClick }: HelpfulButtonProps): React.ReactElement {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null)

  const handleClick = (isHelpful: boolean) => {
    setFeedback(isHelpful ? 'yes' : 'no')
    if (onHelpfulClick) {
      onHelpfulClick(messageId, isHelpful)
    }
  }

  if (feedback) {
    return (
      <Layout.Horizontal padding="small" flex={{ justifyContent: 'flex-end' }} className={css.container}>
        <Text
          font={{ variation: FontVariation.SMALL, italic: true }}
          className={css.feedbackText}
          color={Color.GREY_500}>
          {feedback === 'yes' ? 'Thanks for your feedback!' : 'Thanks for letting us know.'}
        </Text>
      </Layout.Horizontal>
    )
  }

  return (
    <Layout.Horizontal flex={{ justifyContent: 'flex-end' }} className={css.container} padding="small">
      <Text font={{ variation: FontVariation.SMALL }} color={Color.GREY_500}>
        Helpful?
      </Text>
      <Layout.Horizontal spacing="small">
        <Text
          className={css.action}
          onClick={() => handleClick(true)}
          font={{ variation: FontVariation.SMALL }}
          color={Color.GREY_500}>
          Yes
        </Text>
        <Text
          className={css.action}
          onClick={() => handleClick(false)}
          font={{ variation: FontVariation.SMALL }}
          color={Color.GREY_500}>
          No
        </Text>
      </Layout.Horizontal>
    </Layout.Horizontal>
  )
}
