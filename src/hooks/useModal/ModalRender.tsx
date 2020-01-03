//
// TODO (tan) Add icon support for modal title (left icon next to title)
//
import React from 'react'
import cx from 'classnames'
import { Overlay, Classes } from '@blueprintjs/core'
import Draggable from 'react-draggable'
import { Button, Container, Text, Layout, Intent } from '../../'
import { useModal } from './useModal'
import { ModalInfo } from './ModalTypes'
import css from './ModalRenderer.css'
import { Utils } from '../../core/Utils'

export function ModalRenderer({ modalInfo }: { modalInfo: ModalInfo }) {
  const { close } = useModal()
  const intent = modalInfo?.options?.intent ?? Intent.PRIMARY
  const entityType = modalInfo?.options?.entityType
  const { color, backgroundColor } = Utils.getIntentColors(intent)

  if (!entityType) {
    throw '[Modal]: entityType option must be provided to make modal unique for tooltip and testing purposes'
  }

  let title = modalInfo.options?.title
  title =
    typeof title === 'string' ? (
      <Text color={color} font="medium">
        {title}
      </Text>
    ) : (
      title
    )
  const draggable = modalInfo?.options?.draggable
  const modalBody = (
    <Container className={cx(Classes.CARD, Classes.ELEVATION_4, css.innerContainer)}>
      <Container background={backgroundColor} flex padding="xsmall">
        <Layout.Horizontal
          spacing="xsmall"
          margin={{ left: 'xsmall' }}
          className={cx(css.title, draggable && css.draggable)}>
          {title}
        </Layout.Horizontal>
        <Button intent={intent} icon="cross" onClick={close} />
      </Container>
      <Container padding="medium" className={css.content}>
        {modalInfo.Component}
      </Container>
    </Container>
  )

  return (
    <Overlay isOpen={true} hasBackdrop={false} className={Classes.OVERLAY_SCROLL_CONTAINER} usePortal={true}>
      <Container className={cx(css.modal, modalInfo?.options?.className)} id={`modal-${entityType}`}>
        {draggable ? <Draggable handle={`.${css.title}`}>{modalBody}</Draggable> : modalBody}
      </Container>
    </Overlay>
  )
}
