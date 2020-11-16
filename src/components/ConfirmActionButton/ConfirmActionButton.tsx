import React from 'react'
import { Classes } from '@blueprintjs/core'
import { Container } from '../Container/Container'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Layout } from '../../layouts/Layout'
import { ButtonProps, Button } from '../Button/Button'

export interface ConfirmActionButtonProps extends ButtonProps {
  title: string
  message: string
  cancelText: string
  confirmText: string
  width?: number
}

export const ConfirmActionButton: React.FC<ConfirmActionButtonProps> = ({
  title,
  message,
  cancelText,
  confirmText,
  width,
  onClick,
  ...props
}) => {
  return (
    <Button
      tooltip={
        <Container width={width || '350px'} padding="medium">
          <Heading level={2} font={{ weight: 'semi-bold' }} margin={{ bottom: 'small' }}>
            {title}
          </Heading>
          <Text margin={{ bottom: 'medium' }}>{message}</Text>
          <Container flex>
            <span />
            <Layout.Horizontal spacing="small">
              <Button text={cancelText} className={Classes.POPOVER_DISMISS} />
              <Button intent="danger" text={confirmText} className={Classes.POPOVER_DISMISS} onClick={onClick} />
            </Layout.Horizontal>
          </Container>
        </Container>
      }
      tooltipProps={{
        interactionKind: 'click'
      }}
      {...props}
    />
  )
}
