/* eslint-disable react/jsx-no-undef */
import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { CardBody, Card, Text, Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { CardIconProps } from '../Card/Card'
import { omit } from 'lodash-es'

export default {
  title: 'Components / CardIcon',

  component: CardBody.Icon,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>CardIcon</Title>
            <Description>{`Card Icon component reuses Card Component and lets you to write body for icon [CD Next Gen](https://harness.atlassian.net/wiki/spaces/UI/pages/668271019/Card)
`}</Description>
            <Subtitle>
              <>
                <pre>
                  <code>{`import { CardBody }  from '@harness/uicore'`}</code>
                </pre>
                <pre>
                  <code>
                    {`interface CardProps {
  elevation: number (0|1|2|3|4);
  interactive: boolean (false);
  selected: boolean (false);
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// Card Body CardProps
interface CardIconProps extends HTMLDivProps {
  icon: IconName
  iconSize?: number
  iconProps?: Partial<IconProps>
}

// Example
<Card interactive selected>
    <CardBody.Icon icon="service-kubernetes" iconSize={25}>
        <Text font={{size: 'small', align: 'center', color: 'var(--grey-900)'}}>Kubernetes</Text>
    </CardBody.Icon>
</Card>`}
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
  },
  decorators: [Story => <Story />]
} as Meta
export const Basic: Story<CardIconProps> = args => {
  const { icon = 'service-kubernetes' } = args
  const argsCopy = omit(args, ['icon'])
  return (
    <Layout.Horizontal>
      <Card interactive selected style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon={icon} iconSize={25} {...argsCopy}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            TestCard
          </Text>
        </CardBody.Icon>
      </Card>

      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-github" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            Github
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-gcp" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            GCP
          </Text>
        </CardBody.Icon>
      </Card>
      <Card interactive style={{ padding: '5px', width: '80px', height: '80px' }}>
        <CardBody.Icon icon="service-elk" iconSize={25}>
          <Text font={{ size: 'small', align: 'center' }} color={'var(--grey-900)'}>
            ELK Service
          </Text>
        </CardBody.Icon>
      </Card>
    </Layout.Horizontal>
  )
}
Basic.args = { icon: 'service-kubernetes' }
