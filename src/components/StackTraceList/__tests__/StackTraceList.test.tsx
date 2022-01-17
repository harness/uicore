/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { render, wait } from '@testing-library/react'
import { StackTraceList } from '../StackTraceList'

const LARGE_STACK_TRACE = `java.lang.RuntimeException:\njava.lang.InterruptedException:\nplease let me\ndo\nmy\n stuff  at com.thread.MultiThreadProcessor.process(MultiThreadProcessor.java:16)  at inside.RequestException.doGet(RequestException.java:113)  at javax.servlet.http.HttpServlet.service(HttpServlet.java:635)  at javax.servlet.http.HttpServlet.service(HttpServlet.java:742)  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)  at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:199)  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)  at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:493)  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:137)  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81)  at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:660)  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87)  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)  at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:798)  at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66)  at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:808)  at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1498)  at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)  at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)  at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)  at java.lang.Thread.run(Thread.java:748) Caused by: java.lang.InterruptedException: please let me do my stuff`

describe('StatusBar unit tests', () => {
  test('Render stack trace with small messages', async () => {
    const { container, getByText } = render(
      <StackTraceList stackTraceList={['stackTrace1', 'stackTrace2', 'stackTrace3']} />
    )
    await wait()

    getByText('stackTrace1')
    getByText('stackTrace2')
    getByText('stackTrace3')

    expect(container.querySelectorAll('button').length).toBe(0)
  })

  test('Ensure heading is rendered when passed', async () => {
    const { container, getByText, rerender } = render(
      <StackTraceList heading="Java Stack Trace" stackTraceList={[LARGE_STACK_TRACE, 'small stack trace']} />
    )
    await wait()

    getByText('Java Stack Trace')

    rerender(<StackTraceList stackTraceList={[LARGE_STACK_TRACE, 'small stack trace']} />)
    await wait()

    expect(container.querySelector('[class*="heading"]')).toBeNull()
  })
})
