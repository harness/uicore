import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Layout, Card, Text, Icon, CardProps, Container } from '../..'
import { CardBody } from './Card'

export default {
  title: 'Components / Card',
  component: Card
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
    <Card interactive>
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
