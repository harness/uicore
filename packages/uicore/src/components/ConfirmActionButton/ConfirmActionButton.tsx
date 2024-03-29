/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { Classes } from '@blueprintjs/core'
import { Container } from '../Container/Container'
import { Heading } from '../Heading/Heading'
import { Text } from '../Text/Text'
import { Layout } from '../../layouts/Layout'
import { ButtonProps, Button, ButtonVariation } from '../Button/Button'

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
              <Button text={cancelText} className={Classes.POPOVER_DISMISS} variation={ButtonVariation.TERTIARY} />
              <Button
                intent="danger"
                variation={ButtonVariation.PRIMARY}
                text={confirmText}
                className={Classes.POPOVER_DISMISS}
                onClick={onClick}
              />
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
