import React from 'react'
import {
  ButtonProps,
  Button,
  Color,
  Heading,
  Container,
  Icon,
  Layout,
  IconName,
  Text,
  ButtonVariation,
  ButtonSize
} from '../../'
import classNames from 'classnames'
import css from './NoDataCard.css'
export interface NoDataCardProps {
  icon?: IconName
  iconSize?: number
  noIconColor?: boolean
  image?: string
  imageClassName?: string
  messageTitle?: string
  message?: string | React.ReactElement
  width?: number
  buttonText?: string
  button?: React.ReactElement
  onClick?: ButtonProps['onClick']
  className?: string
  containerClassName?: string
  buttonDisabled?: boolean
  buttonDisabledTooltip?: string
}

export const NoDataCard: React.FC<NoDataCardProps> = props => {
  // there are icons to which color prop shouldn't be passed to
  // as it brokes complex svg gradients and a
  // simple ternary condition doesn't work
  const iconProps: { name: IconName; size: number; color?: string } = {
    name: props.icon as IconName,
    size: props.iconSize || 48,
    color: Color.GREY_600
  }
  if (props.noIconColor) {
    delete iconProps.color
  }
  const buttonDisabled = typeof props.buttonDisabled !== undefined && props.buttonDisabled
  return (
    <Container className={classNames(css.noDataCard, props.containerClassName)} flex={{ align: 'center-center' }}>
      <Layout.Vertical
        spacing="medium"
        width={props?.width || 470}
        style={{ alignItems: 'center', marginTop: '-48px' }}
        className={props.className}>
        {props.image ? <img src={props.image} className={props.imageClassName} /> : null}
        {props.icon ? <Icon {...iconProps} /> : null}
        {props.messageTitle ? (
          <Heading level={2} font={{ weight: 'bold', align: 'center' }} color={Color.GREY_600}>
            {props.messageTitle}
          </Heading>
        ) : null}
        {typeof props.message === 'string' ? (
          <Text font={{ align: 'center' }} color={Color.GREY_600} className={css.message}>
            {props.message}
          </Text>
        ) : (
          <>{props.message}</>
        )}
        <div className={css.buttonContainer}>
          {props.button ? (
            props.button
          ) : props.buttonText ? (
            <Button
              size={ButtonSize.LARGE}
              variation={ButtonVariation.PRIMARY}
              text={props.buttonText}
              font={{ size: 'medium', weight: 'semi-bold' }}
              onClick={props.onClick}
              tooltip={
                props.buttonDisabledTooltip ||
                (buttonDisabled ? "You don't have permission to perform this action" : undefined)
              }
              disabled={buttonDisabled}
            />
          ) : null}
        </div>
      </Layout.Vertical>
    </Container>
  )
}
