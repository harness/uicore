import { useCallback, ReactNode, useEffect } from 'react'
import { ModalInfo, ModalOptions } from './ModalTypes'
import { useModalContext, useModalInfoContext } from './ModalContext'

let key = 1

export function useModal() {
  const { mountModal, unmountModal } = useModalContext()
  const { modalInfo } = useModalInfoContext()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const open = useCallback(async (Component: ReactNode, options: ModalOptions): Promise<any> => {
    const info: ModalInfo = {
      key,
      parentKey: modalInfo?.key ?? 0,
      options,
      Component
    }

    key++
    mountModal(info)

    return new Promise(resolve => (info.resolve = resolve))
  }, [])

  const close = useCallback(
    (result = undefined) => {
      if (modalInfo) {
        unmountModal(modalInfo)
        modalInfo.resolve?.(result)
      }
    },
    [modalInfo]
  )

  useEffect(() => {
    // Clean up opened modals when component is unmounted
    // They all are closed without a resolved result (undefined)
    return close
  }, [close])

  return { open, close }
}
