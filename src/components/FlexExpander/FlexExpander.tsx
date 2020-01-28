import React from 'react'

export const FlexExpander: React.FC<{ flexGrow: number }> = ({ flexGrow = 1 }) => <span style={{ flexGrow }} />
