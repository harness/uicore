import React from 'react'
import logsJson from './logs.json'
import { LogViewer } from '../static/index'

const logs = logsJson.resource.response.map(log => ({
  logLine: log.logLine,
  logLevel: log.logLevel,
  createdAt: log.createdAt
}))

export const LogsViewerExample = ({ limit = 20, isLoading = false }) => {
  return (
    <LogViewer
      logs={logs}
      defaultOptions={{ LogLimit: limit }}
      isLoading={isLoading}
      downloadLogs={() => alert('Logs downloaded')}
    />
  )
}
