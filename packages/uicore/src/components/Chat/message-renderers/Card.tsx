import React from 'react'
import { Color, FontVariation, Layout, Text } from '../../../index'
import css from './Card.css'

export interface CardContent {
  title: string
  body: React.ReactNode
}

interface CardProps {
  content: CardContent
}

const Card: React.FC<CardProps> = ({ content }) => {
  return (
    <Layout.Vertical className={css.container}>
      <div className={css.header}>
        <Text color={Color.AI_PURPLE_600} font={{ variation: FontVariation.CARD_TITLE }}>
          {content.title}
        </Text>
      </div>
      <div className={css.body}>{content.body}</div>
    </Layout.Vertical>
  )
}

export default Card
