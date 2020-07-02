//
// Read:
//  - https://harness.atlassian.net/wiki/spaces/EN/pages/531103761/UI+Modal+Drawer+Error+Handling
//  - https://harness.atlassian.net/wiki/spaces/CDNG/pages/736298085/Next+Gen+APIs+specification
//
import { Color, Container, Icon, Link, Text, IconName, Intent } from '../../'
import React, { useEffect, useMemo, useState } from 'react'

export const GENERAL_ERROR = 'We cannot perform your request at the moment. Please try again.'

export interface ErrorEntry {
  code: string
  level: string
  message: string
}

export interface NGErrorEntry {
  status?: 'SUCCESS' | 'ERROR' | 'FAILURE'
  code?: string
  message?: string
  detailedMessage?: string
  validationErrors?: Array<{ field: string; message: string }>
  correlationId?: string
}

export type ErrorInfo = ErrorEntry[] | NGErrorEntry

export interface ModalErrorHandlerBinding {
  /**
   * Show errors object returned from Backend API.
   * @param _errors ErrorInfo: Error info.
   * @param iconName string: optional UIKit icon name.
   */
  show: (_errors: ErrorInfo, iconName?: IconName) => void

  /**
   * Show a success message.
   * @param message string: message to show.
   * @param helpLink: optional help link url.
   * @param iconName string: optional UIKit icon name.
   */
  showSuccess: (message: string, helpLink?: string, iconName?: IconName) => void

  /**
   * Show a warning message.
   * @param message string: message to show.
   * @param helpLink: optional help link url.
   * @param iconName string: optional UIKit icon name.
   */
  showWarning: (message: string, helpLink?: string, iconName?: IconName) => void

  /**
   * Show a danger message.
   * @param message string: message to show.
   * @param helpLink: optional help link url.
   * @param iconName string: optional UIKit icon name.
   */
  showDanger: (message: string, helpLink?: string, iconName?: IconName) => void

  /**
   * Hide visible error/warning/success message(s).
   */
  hide: () => void
}

export interface ModalErrorHandlerProps {
  bind: (modalErrorHandler: ModalErrorHandlerBinding) => void
  style?: React.CSSProperties
}

const breakWorkStyle = { overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' } as React.CSSProperties
const DEFAULT_ICON_NAME = 'warning-sign'

function renderMessage(message: string, color: Color) {
  return (
    <Container padding="small">
      <Text data-type="single-message" font={{ weight: 'bold' }} color={color} style={breakWorkStyle} lineClamp={5}>
        {message}
      </Text>
    </Container>
  )
}

//
// Note: correlationId and code are not yet considered
//
function buildNGMessage(errors?: NGErrorEntry) {
  const msg = []

  if (errors) {
    if (errors.message) {
      msg.push({ message: errors.message, code: '', level: '' })
    }

    if (errors.detailedMessage) {
      msg.push({ message: errors.detailedMessage, code: '', level: '' })
    }

    if (errors.validationErrors?.length) {
      errors.validationErrors.forEach(({ message }) => {
        msg.push({ message, code: '', level: '' })
      })
    }
  } else {
    msg.push({ message: GENERAL_ERROR, code: '', level: '' })
  }

  return msg
}

function renderErrors(errors: ErrorInfo | undefined, color: Color) {
  errors = Array.isArray(errors) ? errors : buildNGMessage(errors)

  return (
    <Container padding="small">
      {errors.map(({ message }) => (
        <Text
          key={message}
          data-type="single-message"
          font={{ weight: 'bold' }}
          color={color}
          style={breakWorkStyle}
          lineClamp={5}>
          {message}
        </Text>
      ))}
    </Container>
  )
}

export const ModalErrorHandler: React.FC<ModalErrorHandlerProps> = ({ bind, style }) => {
  const [intent, setIntent] = useState<Intent>(Intent.DANGER)
  const [errors, setErrors] = useState<ErrorInfo>()
  const [message, setMessage] = useState<string | undefined>()
  const [iconName, setIconName] = useState<IconName>(DEFAULT_ICON_NAME)
  const [helpLink, setHelpLink] = useState<string | undefined>()

  const handler = useMemo(
    () =>
      ({
        show: (_errors: ErrorInfo, iconName?: IconName) => {
          setMessage(undefined)
          setIconName(iconName || DEFAULT_ICON_NAME)
          setErrors(_errors)
          setHelpLink(undefined)
          setIntent(Intent.DANGER)
        },
        showSuccess: (message: string, helpLink?: string, iconName?: IconName) => {
          setIconName(iconName || DEFAULT_ICON_NAME)
          setMessage(message)
          setHelpLink(helpLink)
          setIntent(Intent.SUCCESS)
        },
        showWarning: (message: string, helpLink?: string, iconName?: IconName) => {
          setIconName(iconName || DEFAULT_ICON_NAME)
          setMessage(message)
          setHelpLink(helpLink)
          setIntent(Intent.WARNING)
        },
        showDanger: (message: string, helpLink?: string, iconName?: IconName) => {
          setIconName(iconName || DEFAULT_ICON_NAME)
          setMessage(message)
          setHelpLink(helpLink)
          setIntent(Intent.DANGER)
        },
        hide: () => {
          setErrors([])
          setMessage(undefined)
          setIconName(DEFAULT_ICON_NAME)
          setIntent(Intent.DANGER)
        }
      } as ModalErrorHandlerBinding),
    []
  )

  useEffect(() => {
    bind(handler)
  }, [bind, handler])

  if (!(errors as ErrorEntry[])?.length && !(errors as NGErrorEntry)?.message && !message) {
    return null
  }

  let color: Color, background: Color, borderColor: Color

  switch (intent) {
    case Intent.SUCCESS:
      color = Color.GREEN_500
      background = Color.GREEN_200
      borderColor = Color.GREEN_300
      break
    case Intent.WARNING:
      color = Color.YELLOW_500
      background = Color.YELLOW_200
      borderColor = Color.YELLOW_300
      break
    default:
      color = Color.RED_500
      background = Color.RED_200
      borderColor = Color.RED_300
      break
  }

  return (
    <Container
      background={background}
      padding="medium"
      flex
      style={{ padding: '10px 20px', ...style }}
      border={{ color: borderColor, bottom: true }}>
      <Container flex style={{ justifyContent: 'flex-start' }}>
        <Icon name={iconName} color={color} size={24} margin={{ right: 'xsmall' }} />
        {!message && renderErrors(errors, color)}
        {message && renderMessage(message, color)}
      </Container>
      {helpLink && (
        <Link href={helpLink} target="_blank">
          Help?
        </Link>
      )}
    </Container>
  )
}
