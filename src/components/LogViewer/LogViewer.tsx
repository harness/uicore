import React from 'react'
import Ansi from 'ansi-to-react'
import moment from 'moment'
import css from './LogViewer.css'
import cx from 'classnames'
import i18n from './LogViewer.i18n'
import { Button } from '../Button/Button'

const defaultLogOptions = {
  LogLimit: 10000,
  MaxLogCharPerLine: 500000,
  MaxCharLimit: 1000000
}

interface LogObject {
  logLevel?: string
  createdAt?: number
  logLine: string
}

export interface LogViewerProps {
  logs: LogObject[] // Array of log lines in ansi
  downloadLogs?: (event: React.SyntheticEvent) => void
  isLoading?: boolean // To show loading text or not (defaults to false)
  dateFormat?: string // String format of date as per moment
  linkify?: boolean // linkify whether links should be converting into clickable anchor tags.
  className?: string // Class Name for Parent
  useClasses?: boolean // useClasses should render the span with a class instead of style.
  defaultOptions?: { LogLimit?: number; MaxLogCharPerLine?: number; MaxCharLimit?: number }
}

interface LogViewerState {
  logs: LogObject[]
  isPartial: boolean
}

const tagsToReplace: { [key: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

const replaceTag = (tag: string) => {
  return tagsToReplace[tag] || tag
}

const safeTagsReplace = (str: string) => {
  return str.replace(/[&<>]/g, replaceTag)
}

const getLogInfo = (logLevel?: string, createdAt?: number, dateFormat?: string) => (
  <>
    {logLevel && <span className={css.logLevel}>{logLevel}</span>}
    {createdAt && <span className={css.logDate}>{moment(createdAt).format(dateFormat)}</span>}
  </>
)

export const LogViewer = (props: LogViewerProps) => {
  const {
    logs,
    className = '',
    isLoading = false,
    downloadLogs,
    dateFormat = 'YYYY-MM-DD HH:mm:ss',
    defaultOptions,
    ...rest
  } = props

  const [state, setState] = React.useState<LogViewerState>({ logs: [], isPartial: false })

  const { isPartial } = state

  const options = React.useMemo(() => {
    if (defaultOptions) {
      return { ...defaultLogOptions, ...defaultOptions }
    } else {
      return defaultLogOptions
    }
  }, [defaultOptions])

  React.useEffect(() => {
    // Sort before checking anything
    logs.sort((a, b) => {
      return (a.createdAt || 0) - (b.createdAt || 0)
    })
    // Take last LOG_LIMIT lines
    const limitLogs = logs.slice(-options.LogLimit)
    // Limit display content based on max number of characters to display, instead of max number of lines.
    // Some responses have few lines, but they lines are really long.
    let totalChars = 0
    let cutOffRowIndex = limitLogs.length - 1
    // going from the bottom... (of fullList) => until it exceeded LOG_MAX_CHAR_LIMIT => get cutOffRowIndex
    while (cutOffRowIndex > 0) {
      const row = limitLogs[cutOffRowIndex]
      totalChars += row.logLine.length
      cutOffRowIndex -= 1
      if (totalChars > options.MaxCharLimit) {
        break
      }
    }
    const fullListTail = limitLogs.slice(-cutOffRowIndex)
    setState({ logs: fullListTail, isPartial: fullListTail.length < logs.length })
  }, [logs, options])

  const onDownloadLogs = React.useCallback(
    (event: React.SyntheticEvent) => {
      if (downloadLogs) {
        downloadLogs(event)
      }
    },
    [downloadLogs]
  )

  const renderDownloadLogLine = React.useCallback(() => {
    if (isPartial) {
      return (
        <span>
          <hr />
          {i18n.truncatedText(
            <Button
              minimal
              className={css.downloadBtn}
              icon="main-download"
              text=" Download Logs "
              onClick={onDownloadLogs}
            />
          )}
        </span>
      )
    }
    return null
  }, [isPartial, onDownloadLogs])

  return (
    <div className={cx(css.logViewer, className)}>
      {state.logs.map((log, index) => (
        <div key={index}>
          {log.logLine.split('\n').map((lLog, idx) => (
            <div key={idx}>
              {getLogInfo(log.logLevel, log.createdAt, dateFormat)}
              <Ansi {...rest}>
                {lLog.length < options.MaxLogCharPerLine
                  ? safeTagsReplace(lLog)
                  : `${safeTagsReplace(lLog).substr(0, options.MaxLogCharPerLine)}...`}
              </Ansi>
            </div>
          ))}
        </div>
      ))}
      {isLoading && <div>{i18n.Loading}</div>}
      {renderDownloadLogLine()}
    </div>
  )
}
