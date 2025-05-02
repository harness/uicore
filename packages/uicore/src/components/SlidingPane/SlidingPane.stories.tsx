/*
 * Copyright 2025 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-alert */
import { ArgsTable, Description, Primary, PRIMARY_STORY, Stories, Title } from '@storybook/addon-docs/blocks'
import type { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import { Button, Container, Layout, SlidingPane, Text } from '../..'
import { Icon } from '@harness/icons'
import { SlidingPaneState, MinimizedPosition } from './SlidingPane'
import { noop } from 'lodash-es'

export default {
  title: 'Components/SlidingPane',
  component: SlidingPane,
  parameters: {
    docs: {
      page: function Page() {
        return (
          <>
            <Title />
            <Description>
              SlidingPane is a panel that slides in from the right side of the screen. It can be in one of three states:
              open, closed, or minimized. When minimized, the component is not unmounted, allowing for state
              preservation.
            </Description>
            <Primary />
            <ArgsTable story={PRIMARY_STORY} />
            <Stories />
          </>
        )
      }
    }
  }
} as ComponentMeta<typeof SlidingPane>

const Template: ComponentStory<typeof SlidingPane> = args => {
  const [state, setState] = useState<SlidingPaneState>(args.state || 'closed')

  return (
    <Container style={{ padding: '20px' }}>
      <Layout.Horizontal spacing="medium">
        <Button onClick={() => setState('open')}>Open</Button>
        <Button onClick={() => setState('minimized')}>Minimize</Button>
        <Button onClick={() => setState('closed')}>Close</Button>
      </Layout.Horizontal>

      <Text style={{ marginTop: '10px' }}>Current state: {state}</Text>

      <SlidingPane {...args} state={state} onStateChange={setState} />
    </Container>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'Sliding Pane',
  width: '400px',
  children: (
    <Container>
      <Text>This is the content of the sliding pane.</Text>
      <Text>You can put any content here.</Text>
    </Container>
  ),
  minimizedComponent: (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--primary-7)',
        color: 'white',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
      }}>
      <Icon name="expand-all" size={16} />
    </div>
  )
}

export const CustomHeader = Template.bind({})
CustomHeader.args = {
  width: '400px',
  headerContent: (
    <Layout.Horizontal padding="medium" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
      <Layout.Horizontal spacing="small" style={{ alignItems: 'center' }}>
        <Icon name="settings" size={16} />
        <Text style={{ fontWeight: 'bold' }}>Custom Header</Text>
      </Layout.Horizontal>
      <Layout.Horizontal spacing="small">
        <Button minimal onClick={noop} icon="minimize" />
        <Button minimal onClick={noop} icon="cross" />
      </Layout.Horizontal>
    </Layout.Horizontal>
  ),
  children: (
    <Container>
      <Text>This pane has a custom header.</Text>
    </Container>
  )
}

export const DifferentPositions: ComponentStory<typeof SlidingPane> = () => {
  const [position, setPosition] = useState<MinimizedPosition>('bottom')
  const [state, setState] = useState<SlidingPaneState>('minimized')

  return (
    <Container style={{ padding: '20px' }}>
      <Text>Select minimized position:</Text>
      <Layout.Horizontal spacing="medium" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
        <Button onClick={() => setPosition('top')}>Top</Button>
        <Button onClick={() => setPosition('bottom')}>Bottom</Button>
        <Button onClick={() => setPosition('right')}>Right</Button>
        <Button onClick={() => setPosition('left')}>Left</Button>
      </Layout.Horizontal>

      <Layout.Horizontal spacing="medium">
        <Button onClick={() => setState('open')}>Open</Button>
        <Button onClick={() => setState('minimized')}>Minimize</Button>
        <Button onClick={() => setState('closed')}>Close</Button>
      </Layout.Horizontal>

      <Text style={{ marginTop: '10px' }}>
        Current state: {state}, Position: {position}
      </Text>

      <SlidingPane title="Positioned Pane" state={state} onStateChange={setState} minimizedPosition={position}>
        <Text>Content of the pane</Text>
      </SlidingPane>
    </Container>
  )
}

export const WithCustomMinimizedView = Template.bind({})
WithCustomMinimizedView.args = {
  title: 'Custom Minimized View',
  width: '400px',
  children: (
    <Container>
      <Text>This pane has a custom minimized view.</Text>
    </Container>
  ),
  minimizedComponent: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--white)',
        color: 'var(--primary-7)',
        width: '60px',
        height: '100px',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--grey-200)',
        padding: '8px'
      }}>
      <Icon name="chat" size={24} />
      <Text style={{ marginTop: '8px', fontSize: '12px' }}>Chat</Text>
    </div>
  )
}
