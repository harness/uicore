/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import Markdown, { MarkdownProps } from './Markdown'

export default {
  title: 'Components / Markdown',
  component: Markdown,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Markdown</Title>
            <Description>{`Markdown component renders richtext with the markup preserved`}</Description>
            <Subtitle>
              <>
                <h4>Import</h4>
                <pre>
                  <code>{`import { Markdown }  from '@harness/uicore'`}</code>
                </pre>
                <h4>Types</h4>
                <pre>
                  <code>
                    {`interface MarkdownProps {
    value: string
}
`}
                  </code>
                </pre>
              </>
            </Subtitle>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />

            <Stories />
          </>
        )
      }
    }
  }
} as Meta

export const Basic: Story<MarkdownProps> = () => {
  const markdownContent =
    '## Error Message\r\n```\r\ncould not provision a VM from the pool: provision: failed to create instance: failed to create vm after 3 retries: client error 400: {"status":"FAIL","message":"VM not in the registry"}\r\n```\r\n\r\n## Root Cause\r\nThe error message indicates that the VM could not be provisioned from the pool because the creation of the VM failed after 3 retries due to a client error 400. The error message further specifies that the VM is not in the registry.\r\n\r\n## Remediation\r\nTo resolve the issue, the VM needs to be added to the registry. Once the VM is added to the registry, the provisioning process can be retried. Additionally, it is recommended to check the configuration of the pool and ensure that it is correctly set up to provision VMs.'
  return (
    <Layout.Horizontal spacing="large">
      <Markdown value={markdownContent} />
    </Layout.Horizontal>
  )
}
