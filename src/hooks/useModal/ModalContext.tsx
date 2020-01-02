import React, { useState, useCallback, useEffect } from 'react'
import constate from 'constate'
import { ModalInfo } from './ModalTypes'

const initialDataset: ModalInfo[] = []

function useModalState() {
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
  return { dataset, mountModal, unmountModal }
}

function useModalInfoState() {
  const [modalInfo, setModalInfo] = useState()
  return { modalInfo, setModalInfo }
}

const [UseModalContextProvider, useModalContext] = constate(useModalState)
const [ModalInfoContextProvider, useModalInfoContext] = constate(useModalInfoState)

const ModalInfoContextSetter = (props: { modalInfo: ModalInfo }) => {
  const { setModalInfo } = useModalInfoContext()
  useEffect(() => {
    setModalInfo(props.modalInfo)
  }, [])
  return null
}

const ModalContextProvider: React.FC<{}> = props => {
  return (
    <UseModalContextProvider>
      <ModalInfoContextProvider>{props.children}</ModalInfoContextProvider>
    </UseModalContextProvider>
  )
}

export { ModalContextProvider, ModalInfoContextProvider, ModalInfoContextSetter, useModalContext, useModalInfoContext }
