/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CardBody, Icon, Layout, Text } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Card, CardMenuProps } from '../Card/Card'
import { omit } from 'lodash-es'

import * as BP from '@blueprintjs/core'
export default {
  title: 'Components / CardMenu',

  component: CardBody.Menu,
  subcomponents: { Card },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CardMenu</Title>
            <Description>{`Card Icon component reuses Card Component and lets you to write body for menu [CD Next Gen](https://harness.atlassian.net/wiki/spaces/UI/pages/668271019/Card)
`}</Description>
            <Subtitle>
              <>
                <pre>
                  <code>{`import { CardBody }  from '@harness/uicore'`}</code>
                </pre>
                <pre>
                  <code>{`interface CardProps {
  elevation: number (0|1|2|3|4);
  interactive: boolean (false);
  selected: boolean (false);
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface CardMenuProps extends HTMLDivProps {
  menuContent: JSX.Element
  title?: string
  colorIdentifier?: Color
}

// Example
// Card Menu
<Card>
    <CardBody.Menu colorIdentifier={'red'} title="Jenkins Artifact" menuContent={<div>Menu</div>}>
        <Text font="small">Referencing the configuration file</Text>
    </CardBody.Menu>
</Card>`}</code>
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
  },
  decorators: [Story => <Story />]
} as Meta
export const Basic: Story<CardMenuProps> = args => {
  const {
    colorIdentifier = 'red',
    title = 'Jenkins Artifact',
    menuContent = (
      <BP.Menu>
        <BP.Menu.Item icon="edit" text="Edit" />
        <BP.Menu.Item icon="duplicate" text="Clone" />
        <BP.Menu.Item icon="cross" text="Delee" />
      </BP.Menu>
    )
  } = args
  const argsCopy = omit(args, ['menuContent', 'colorIdentifier', 'title'])
  return (
    <>
      <Layout.Horizontal spacing="large">
        <Card onClick={() => alert('Clicked')}>
          <CardBody.Menu colorIdentifier={colorIdentifier} title={title} menuContent={menuContent} {...argsCopy}>
            <div style={{ height: '200px', width: '150px' }}>
              <Layout.Vertical spacing="large">
                <div>
                  <Icon name="service-jenkins" size={30} />
                  <Text style={{ marginTop: '5px' }} font="small">
                    ToDolist.war
                  </Text>
                </div>
                <div>
                  <Text font="small" style={{ marginBottom: '5px', color: 'var(--grey-350)' }}>
                    GETTING THE ARTEFACT
                  </Text>
                  <Text font="small">Referencing the configuration file</Text>
                </div>
                <div>
                  <hr style={{ margin: '0px 0px 10px', border: '1px dashed var(--grey-350)' }} />
                  <Text font="small" style={{ marginBottom: '5px', color: 'var(--grey-350)' }}>
                    ARTEFACT SOURCE
                  </Text>
                  <Text font="small">Fixed</Text>
                </div>
              </Layout.Vertical>
            </div>
          </CardBody.Menu>
        </Card>
      </Layout.Horizontal>
    </>
  )
}
