import React from 'react'

const YamlMessage: React.FC<{ content: string }> = ({ content }) => {
  return <pre>{content}</pre>
}

export default YamlMessage
