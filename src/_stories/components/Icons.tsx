/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'

import { Layout, HarnessIcons, Popover, Icon, Text, IconName, Utils } from '../../'
import { IconNames as BlueprintIconNames } from '@blueprintjs/icons'

export function HarnessLogos(): React.ReactElement {
  return (
    <div style={{ background: 'var(--grey-100)', padding: '20px', borderRadius: '5px' }}>
      <Layout.Horizontal spacing="small">
        {[HarnessIcons['harness-logo-black'], HarnessIcons['harness-logo-white']].map((HarnessLogo, index) => (
          <HarnessLogo {...({ height: 48 } as any)} key={index} />
        ))}
      </Layout.Horizontal>
    </div>
  )
}

export function HarnessIconsGrid(): React.ReactElement {
  return (
    <div
      id="harness-icons"
      style={{
        padding: '20px',
        display: 'grid',
        background: 'var(--grey-100)',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        borderRadius: '5px'
      }}>
      {Object.keys(HarnessIcons).map(name => (
        <button
          key={name}
          style={{
            all: 'unset',
            justifySelf: 'center',
            alignSelf: 'center',
            display: 'inline-block',
            cursor: 'pointer'
          }}
          onClick={() => Utils.copy(name)}>
          <Popover
            key={name}
            interactionKind="hover"
            content={<Text padding="small">{name} (click to copy)</Text>}
            usePortal={false}>
            <Layout.Vertical
              spacing="small"
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon name={name as IconName} size={24} padding="small" border={{ color: 'grey300' }} />
              <Text font="small">{name}</Text>
            </Layout.Vertical>
          </Popover>
        </button>
      ))}
    </div>
  )
}

export function BlueprintIconsGrid(): React.ReactElement {
  return (
    <div
      id="blueprint-icons"
      style={{
        padding: '20px',
        display: 'grid',
        background: 'var(--grey-100)',
        gridGap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        borderRadius: '5px'
      }}>
      {Object.values(BlueprintIconNames).map(name => (
        <button
          key={name}
          style={{
            all: 'unset',
            justifySelf: 'center',
            alignSelf: 'center',
            display: 'inline-block',
            cursor: 'pointer'
          }}
          onClick={() => Utils.copy(name)}>
          <Popover
            interactionKind="hover"
            content={<Text padding="small">{name} (click to copy)</Text>}
            usePortal={false}>
            <Layout.Vertical
              spacing="small"
              style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Icon name={name} size={24} padding="small" border={{ color: 'grey300' }} />
              <Text font="small">{name}</Text>
            </Layout.Vertical>
          </Popover>
        </button>
      ))}
    </div>
  )
}
