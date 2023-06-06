import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
import styles from './Markdown.css'

export interface MarkdownProps {
  value: string
}

const Markdown: React.FC<MarkdownProps> = ({ value }) => {
  return (
    <ReactMarkdown
      className={styles.markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <Prism {...props} style={vs} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </Prism>
          ) : (
            <code {...props} className={className}>
              {children}
            </code>
          )
        }
      }}>
      {value}
    </ReactMarkdown>
  )
}
export default Markdown
