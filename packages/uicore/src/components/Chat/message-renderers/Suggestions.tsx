import React from 'react'
import { Container, Layout } from '../../../index'
import css from './Suggestions.css'

export interface Suggestion {
  id: string
  text: string
}

interface SuggestionsProps {
  content: Suggestion[]
  handleClick: (suggestion: Suggestion) => void
}

const SuggestionsMessage: React.FC<SuggestionsProps> = ({ content, handleClick }) => {
  return (
    <Layout.Vertical width="100%" className={css.container}>
      {content.map((suggestion: Suggestion) => (
        <Container className={css.suggestion} key={suggestion.id} onClick={() => handleClick(suggestion)}>
          {suggestion.text}
        </Container>
      ))}
    </Layout.Vertical>
  )
}

export default SuggestionsMessage
