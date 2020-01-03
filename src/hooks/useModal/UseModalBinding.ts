import React, { useEffect } from 'react'
import { useModal } from './useModal'

interface UseModalBindingOptions {
  bind: (modal: ReturnType<typeof useModal>) => void
}

const Bind: React.FC<UseModalBindingOptions> = ({ bind }) => {
  const modal = useModal()
  useEffect(() => {
    bind(modal)
  }, [])
  return null
}

export const UseModalBinding = React.memo(Bind)
