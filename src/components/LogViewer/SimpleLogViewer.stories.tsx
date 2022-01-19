/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { SimpleLogViewer, SimpleLogViewerProps } from './SimpleLogViewer'

export default {
  title: 'Components / SimpleLogViewer',
  component: SimpleLogViewer
} as Meta

export const Basic: Story<SimpleLogViewerProps> = args => {
  return <SimpleLogViewer {...args} />
}

Basic.args = {
  data: `
2022-01-19 09:23:16,748 [34m[1.0.73408-000][0;39m [1;32m234[0;39m [32m[localHeartbeat-0][0;39m [34mINFO [0;39m [36mio.harness.delegate.service.DelegateAgentServiceImpl[0;39m - Current performance [33m[cpu-system=3.27, maxExecutingTasksCount=0, non-heap-max=-1, heap-committed=289931264, heap-used=270568696, timeoutEnforcement=0, non-heap-used=122791400, cpu-process=0.55, maxExecutingFuturesCount=0, artifactExecutor=0, heap-max=3817865216, maxValidatingTasksCount=0, systemExecutor=1, non-heap-init=2555904, heap-init=16777216, maxValidatingFuturesCount=0, non-heap-committed=125042688, asyncExecutor=0, taskPollExecutor=0][0;39m
2022-01-19 09:23:16,748 [34m[1.0.73408-000][0;39m [1;32m234[0;39m [32m[localHeartbeat-0][0;39m [34mINFO [0;39m [36mio.harness.delegate.service.DelegateAgentServiceImpl[0;39m - Current performance [33m[cpu-system=3.27, maxExecutingTasksCount=0, non-heap-max=-1, heap-committed=289931264, heap-used=270568696, timeoutEnforcement=0, non-heap-used=122791400, cpu-process=0.55, maxExecutingFuturesCount=0, artifactExecutor=0, heap-max=3817865216, maxValidatingTasksCount=0, systemExecutor=1, non-heap-init=2555904, heap-init=16777216, maxValidatingFuturesCount=0, non-heap-committed=125042688, asyncExecutor=0, taskPollExecutor=0][0;39m
2022-01-19 09:23:21,337 [34m[1.0.73400-000][0;39m [1;32m90[0;39m [32m[ChronicleEventTailer RUNNING][0;39m [34mINFO [0;39m [36mio.harness.event.client.impl.tailer.ChronicleEventTailer[0;39m - Checking for messages to publish [33m[0;39m
2022-01-19 09:23:21,337 [34m[1.0.73400-000][0;39m [1;32m90[0;39m [32m[ChronicleEventTailer RUNNING][0;39m [34mINFO [0;39m [36mio.harness.event.client.impl.tailer.ChronicleEventTailer[0;39m - Checking for messages to publish [33m[0;39m
2022-01-19 09:23:21,337 [34m[1.0.73400-000][0;39m [1;32m90[0;39m [32m[ChronicleEventTailer RUNNING][0;39m [34mINFO [0;39m [36mio.harness.event.client.impl.tailer.ChronicleEventTailer[0;39m - Checking for messages to publish [33m[0;39m`
}
