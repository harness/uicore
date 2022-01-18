/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import logsJson from './logs.json'
import { LogViewer } from '../static/index'

const logs = logsJson.resource.response.map(log => ({
  logLine: log.logLine,
  logLevel: log.logLevel,
  createdAt: log.createdAt
}))

const LogsViewerExample = ({ limit = 20, isLoading = false }) => {
  return (
    <LogViewer
      logs={logs}
      defaultOptions={{ LogLimit: limit }}
      isLoading={isLoading}
      downloadLogs={() => alert('Logs downloaded')}
    />
  )
}

export default LogsViewerExample
