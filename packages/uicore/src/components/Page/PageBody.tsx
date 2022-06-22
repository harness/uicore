/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import cx from 'classnames'
import { Container, IconName, ButtonProps } from '../../'

import { PageSpinner } from './PageSpinner'
import { PageError } from './PageError'
import { NoDataCard } from './NoDataCard'

import css from './PageBody.css'

export interface PageBodyProps {
  /** If set to true, spinner should be shown */
  loading?: boolean

  /** message to pass to <PageSpinner/> */
  loadingMessage?: string

  /** If not nullable, show page error */
  error: React.ReactNode

  /** If passed, render 'Retry' button alongside error message */
  retryOnError?: ButtonProps['onClick']

  /** noData structure */
  noData?: {
    /** when true, show <NoDataCard/> */
    when: () => boolean

    /** icon to pass to <NoDataCard/> */
    icon?: IconName

    /** disables color passing to icon in <NoDataCard />  */
    noIconColor?: boolean

    /** image to pass to <NoDataCard/> */
    image?: string

    /** image class name to pass to <NoDataCard/> */
    imageClassName?: string

    /** message title to pass to <NoDataCard/> */
    messageTitle?: string

    /** message to pass to <NoDataCard/> */
    message?: string

    /** Button to render with custom styles */
    button?: React.ReactElement

    /** button text to pass to <NoDataCard/> */
    buttonText?: string

    /** onClick event handler to pass to <NoDataCard/> */
    onClick?: ButtonProps['onClick']

    /** class name to pass for no data */
    className?: string

    /** boolean value to decide button state in <NoDataCard/> */
    buttonDisabled?: boolean

    /** string to add tooltip on the button if disabled */
    buttonDisabledTooltip?: string
  }

  /** True if Page does not have header */
  filled?: boolean

  /** Optional classname */
  className?: string
}

/**
 * PageBody implements page body container with some decorations like background image,
 * alignments, etc...
 */
export const PageBody: React.FC<PageBodyProps> = ({
  children,
  loading,
  loadingMessage,
  error,
  retryOnError,
  noData,
  filled,
  className
}) => {
  return (
    <Container className={cx(css.pageBody, filled && css.filled, className)} data-name="page-body">
      {loading && <PageSpinner message={loadingMessage} />}
      {!loading && error && <PageError message={error} onClick={retryOnError} />}
      {!loading && !error && noData?.when?.() && (
        <NoDataCard
          icon={noData?.icon}
          noIconColor={noData?.noIconColor}
          image={noData.image}
          imageClassName={noData.imageClassName}
          messageTitle={noData.messageTitle}
          message={noData?.message || ''}
          button={noData?.button}
          buttonText={noData?.buttonText || ''}
          onClick={noData?.onClick}
          className={noData?.className}
          buttonDisabled={noData?.buttonDisabled || false}
          buttonDisabledTooltip={noData.buttonDisabledTooltip}
        />
      )}
      {!error && !noData?.when?.() && children}
    </Container>
  )
}
