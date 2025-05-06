/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, useEffect, useCallback, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import { Icon } from '@harness/icons'
import { Color, FontVariation } from '@harness/design-system'
import { Container } from '../Container/Container'
import { Text } from '../Text/Text'
import css from './SlidingPane.css'

export type SlidingPaneState = 'open' | 'closed' | 'minimized'

export type MinimizedPosition = 'top' | 'bottom' | 'right' | 'left'

export interface SlidingPaneProps {
  state?: SlidingPaneState
  onStateChange?: (state: SlidingPaneState) => void
  onClose?: () => void
  width?: string
  height?: string
  title?: string
  children?: ReactNode
  minimizedComponent?: ReactNode
  minimizedPosition?: MinimizedPosition
  className?: string
  headerClassName?: string
  contentClassName?: string
  minimizedClassName?: string
  showCloseButton?: boolean
  showMinimizeButton?: boolean
  headerContent?: ReactNode
  zIndex?: number
  usePortal?: boolean
  /**
   * Custom DOM node to render the portal into
   * Only used when usePortal is true
   * Defaults to document.body
   */
  portalContainer?: HTMLElement
  hideOverlay?: boolean
}

export const SlidingPane: React.FC<SlidingPaneProps> = ({
  state: externalState,
  onStateChange,
  onClose,
  width = '400px',
  height = '100%',
  title,
  children,
  minimizedComponent,
  minimizedPosition = 'bottom',
  className,
  headerClassName,
  contentClassName,
  minimizedClassName,
  showCloseButton = true,
  showMinimizeButton = true,
  headerContent,
  zIndex = 1000,
  usePortal = false,
  portalContainer,
  hideOverlay = false
}) => {
  const [internalState, setInternalState] = useState<SlidingPaneState>(externalState || 'closed')
  const currentState = externalState !== undefined ? externalState : internalState

  useEffect(() => {
    if (externalState !== undefined) {
      setInternalState(externalState)
    }
  }, [externalState])

  // Effect to disable body scroll when pane is open
  useEffect(() => {
    const isOpen = currentState === 'open'

    if (isOpen) {
      const originalOverflow = document.body.style.overflow

      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [currentState])

  const handleStateChange = useCallback(
    (newState: SlidingPaneState) => {
      if (externalState === undefined) {
        setInternalState(newState)
      }
      onStateChange?.(newState)
    },
    [externalState, onStateChange]
  )

  const handleOpen = useCallback(() => handleStateChange('open'), [handleStateChange])
  const handleClose = useCallback(() => {
    handleStateChange('closed')
    if (onClose) onClose()
  }, [handleStateChange])
  const handleMinimize = useCallback(() => handleStateChange('minimized'), [handleStateChange])

  const renderMinimizedView = () => {
    if (currentState !== 'minimized' || !minimizedComponent) return null

    return (
      <div
        className={cx(
          css.minimizedContainer,
          minimizedPosition === 'right' && css.minimizedRight,
          minimizedPosition === 'left' && css.minimizedLeft,
          minimizedPosition === 'top' && css.minimizedTop,
          minimizedPosition === 'bottom' && css.minimizedBottom,
          minimizedClassName
        )}
        style={{ zIndex }}
        onClick={handleOpen}>
        {minimizedComponent}
      </div>
    )
  }

  const renderBackdrop = (): React.ReactNode => {
    if (currentState === 'closed' || hideOverlay) return null

    const isVisible = currentState === 'open'

    return (
      <div className={css.backdrop} data-visible={isVisible} onClick={handleClose} style={{ zIndex: zIndex - 1 }} />
    )
  }

  const renderPane = () => {
    // Always render the pane, but control its visibility with CSS
    const isOpen = currentState === 'open'
    const isClosed = currentState === 'closed'

    return (
      <Container
        className={cx(css.paneContainer, { [css.open]: isOpen }, { [css.paneMinimized]: !isOpen }, className)}
        style={{
          height,
          zIndex,
          width
        }}>
        <div className={cx(css.paneContent, { [css.visible]: isOpen })}>
          {/* Only render internal content when not closed to improve performance */}
          {!isClosed ? (
            <>
              <div className={cx(css.header, headerClassName)}>
                {headerContent || (
                  <>
                    {title && (
                      <Text color={Color.GREEN_900} font={{ variation: FontVariation.CARD_TITLE }}>
                        {title}
                      </Text>
                    )}
                    <div className={css.actions}>
                      {showMinimizeButton && (
                        <button className={css.actionButton} onClick={handleMinimize}>
                          <Icon name="minimize" size={16} />
                        </button>
                      )}
                      {showCloseButton && (
                        <button className={css.actionButton} onClick={handleClose}>
                          <Icon name="cross" size={16} />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className={cx(css.content, contentClassName)}>{children}</div>
            </>
          ) : null}
        </div>
      </Container>
    )
  }

  const renderContent = () => (
    <>
      {renderBackdrop()}
      {renderPane()}
      {renderMinimizedView()}
    </>
  )

  // If usePortal is true, render the content in a portal
  if (usePortal) {
    const container = portalContainer || document.body
    return ReactDOM.createPortal(renderContent(), container)
  }

  // Otherwise render normally
  return renderContent()
}

export default SlidingPane
