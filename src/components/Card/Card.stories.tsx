import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, Card, Text, Icon, CardProps, Container } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { CardBody, Menu, Icon as CardBodyIcon } from './Card'

export default {
  title: 'Components / Card',
  component: Card,
  subcomponents: { ['CardBody.Menu']: Menu, ['CardBody.Icon']: CardBodyIcon },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Card</Title>
            <Description>{`Card component reuses Blueprint's card and implements the look and feel of [CD Next Gen](https://harness.atlassian.net/wiki/spaces/UI/pages/668271019/Card)`}</Description>
            <Subtitle>
              <>
                <h4>Import</h4>
                <pre>
                  <code>{`import { Card, CardBody }  from '@wings-software/uicore'`}</code>
                </pre>
                <h4>Types</h4>
                <pre>
                  <code>
                    {`interface CardProps extends ICardProps {
  selected?: boolean
  disabled?: boolean
  cornerSelected?: boolean
}
interface ICardProps extends IProps, HTMLDivProps {
    elevation?: Elevation;
    interactive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}`}
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

export const Basic: Story<CardProps> = args => (
  <Layout.Horizontal spacing="large">
    <Card interactive {...args}>
      <CardBody.Menu menuContent={<Container padding="medium">hello</Container>} />
      <div style={{ height: '200px', width: '150px' }}>
        <Layout.Vertical spacing="large">
          <div>
            <Icon name="service-jenkins" size={30} />
            <Text style={{ marginTop: '5px' }} font="medium">
              Jenkin Artifact
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
    </Card>
    <Card interactive {...args}>
      <div style={{ height: '200px', width: '150px' }}>
        <Layout.Vertical spacing="large">
          <div>
            <Icon name="service-bamboo" size={30} />
            <Text style={{ marginTop: '5px' }} font="medium">
              Bamboo Artifact
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
    </Card>
  </Layout.Horizontal>
)
