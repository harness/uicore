/*
 * Copyright (c) Harness Inc.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import cx from 'classnames'
import { Spinner } from '@blueprintjs/core'

import { LogLine, LogLineProps } from './LogLine'
import css from './SimpleLogViewer.css'

export interface SimpleLogViewerProps {
  data: string
  className?: string
  loading?: boolean
}

export interface SimpleLogLineProps extends LogLineProps {
  lineNumber: number
}

export function SimpleLogLine(props: SimpleLogLineProps): React.ReactElement {
  return (
    <div className={css.line}>
      <span className={css.lineNumber}>{props.lineNumber}</span>
      <LogLine data={props.data} />
    </div>
  )
}

export function SimpleLogViewer(props: SimpleLogViewerProps): React.ReactElement {
  const { data = '', className, loading } = props
  const linesData = React.useMemo(() => {
    return data.split(/\r?\n/)
  }, [data])

  return (
    <div
      className={cx(css.logViewer, className)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={{ '--char-size': `${linesData.length.toString().length + 1}ch` } as any}>
      {loading ? (
        <Spinner />
      ) : (
        <pre>
          {linesData.map((row, index) => {
            return <SimpleLogLine data={row} lineNumber={index + 1} key={`${row}_${index}`} />
          })}
        </pre>
      )}
    </div>
  )
}
