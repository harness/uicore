import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { StackTraceList, StackTraceListProps } from '../..'
import { omit } from 'lodash-es'

export default {
  title: 'Components / StackTraceList',

  component: StackTraceList,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>StackTraceList</Title>
            <Subtitle>
              <pre>
                <code>{`import {StackTraceList} from '@harness/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{`StackTraceList renders a list of stack traces (or logs) using the code block component with "pre" as the format.`}</Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  },
  decorators: [Story => <Story />]
} as Meta
export const Basic: Story<StackTraceListProps> = args => {
  const {
    stackTraceList = [
      `java.lang.RuntimeException: java.lang.InterruptedException  at com.thread.MultiThreadProcessor.process(MultiThreadProcessor.java:16)  at inside.RequestException.doGet(RequestException.java:113)  at javax.servlet.http.HttpServlet.service(HttpServlet.java:635)  at javax.servlet.http.HttpServlet.service(HttpServlet.java:742)  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)  at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:199)  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)  at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:493)  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:137)  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81)  at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:660)  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87)  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)  at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:798)  at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66)  at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:808)  at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1498)  at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)  at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)  at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)  at java.lang.Thread.run(Thread.java:748) Caused by: java.lang.InterruptedException: please let me do my stuff`,
      'small exception that resulted in a small stack trace'
    ]
  } = args
  const argsCopy = omit(args, ['stackTraceList'])
  return <StackTraceList heading="Java Stack Trace" stackTraceList={stackTraceList} {...argsCopy} />
}
export const WithoutHeadingAndWithTimestamp: Story<StackTraceListProps> = args => {
  const {
    stackTraceList = [
      {
        timestamp: new Date().toLocaleString(),
        stackTrace: `java.lang.RuntimeException: java.lang.InterruptedException  at com.thread.MultiThreadProcessor.process(MultiThreadProcessor.java:16)  at inside.RequestException.doGet(RequestException.java:113)  at javax.servlet.http.HttpServlet.service(HttpServlet.java:635)  at javax.servlet.http.HttpServlet.service(HttpServlet.java:742)  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:231)  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)  at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:52)  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166)  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:199)  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96)  at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:493)  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:137)  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:81)  at org.apache.catalina.valves.AbstractAccessLogValve.invoke(AbstractAccessLogValve.java:660)  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:87)  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343)  at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:798)  at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66)  at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:808)  at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1498)  at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49)  at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)  at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61)  at java.lang.Thread.run(Thread.java:748) Caused by: java.lang.InterruptedException: please let me do my stuff`
      },
      'small exception that resulted in a small stack trace'
    ]
  } = args
  const argsCopy = omit(args, ['stackTraceList'])
  return <StackTraceList stackTraceList={stackTraceList} {...argsCopy} />
}
