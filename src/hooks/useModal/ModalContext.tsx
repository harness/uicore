import React, { useState, useCallback, useEffect } from 'react'
import { ModalInfo } from './ModalTypes'

const initialDataset: ModalInfo[] = []

export interface ModalContextData {
  dataset: ModalInfo[]
  mountModal(modal: ModalInfo): void
  unmountModal(modal: ModalInfo): void
}

const ModalContext = React.createContext<ModalContextData>({
  dataset: [],
  mountModal: () => void 0,
  unmountModal: () => void 0
})

export interface ModalInfoContextData {
  modalInfo?: ModalInfo
  setModalInfo(modal: ModalInfo): void
}

const ModalInfoContext = React.createContext<ModalInfoContextData>({
  setModalInfo: () => void 0
})

export function useModalInfoContext(): ModalInfoContextData {
  return React.useContext(ModalInfoContext)
}

export function ModalContextProvider(props: React.PropsWithChildren<unknown>): React.ReactElement {
  const [dataset, setDataset] = useState(initialDataset)
  const mountModal = useCallback((modal: ModalInfo) => {
    setDataset(ds => ds.concat(modal))
  }, [])
  const unmountModal = useCallback(
    (modal: ModalInfo) => {
      if (modal && dataset?.length) {
        setDataset(ds => ds.filter(info => info.key !== modal.key))
      }
    },
    [dataset]
  )
  return (
    <ModalContext.Provider value={{ dataset, mountModal, unmountModal }}>
      <ModalInfoContextProvider>{props.children}</ModalInfoContextProvider>
    </ModalContext.Provider>
  )
}

export function ModalInfoContextProvider(props: React.PropsWithChildren<unknown>): React.ReactElement {
  const [modalInfo, setModalInfo] = useState<ModalInfo>()
  return <ModalInfoContext.Provider value={{ modalInfo, setModalInfo }}>{props.children}</ModalInfoContext.Provider>
}

export const ModalInfoContextSetter = (props: { modalInfo: ModalInfo }): null => {
  const { setModalInfo } = useModalInfoContext()
  useEffect(() => {
    setModalInfo(props.modalInfo)
  }, [])
  return null
}

export function useModalContext(): ModalContextData {
  return React.useContext(ModalContext)
}
