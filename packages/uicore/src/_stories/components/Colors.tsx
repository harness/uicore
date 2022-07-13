/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { HTMLTable } from '@blueprintjs/core'
import { Popover, Utils, Text } from '../../'

export const names = {
  '--primary-10': '#1a1a1a',
  '--primary-9': '#0a3364',
  '--primary-8': '#004ba4',
  '--primary-7': '#0278d5',
  '--primary-6': '#0092e4',
  '--primary-5': '#00ade4',
  '--primary-4': '#3dc7f6',
  '--primary-3': '#a3e9ff',
  '--primary-2': '#cdf4fe',
  '--primary-1': '#effbff',
  '--primary-bg': '#fafcff',
  '--grey-1000': '#000000',
  '--grey-900': '#0b0b0d',
  '--grey-800': '#22222a',
  '--grey-700': '#383946',
  '--grey-600': '#4f5162',
  '--grey-500': '#6b6d85',
  '--grey-400': '#9293ab',
  '--grey-300': '#b0b1c4',
  '--grey-200': '#d9dae5',
  '--grey-100': '#f3f3fa',
  '--grey-50': '#fafbfc',
  '--grey-0': '#ffffff',
  '--green-900': '#1e5c1f',
  '--green-800': '#1b841d',
  '--green-700': '#299b2c',
  '--green-600': '#42ab45',
  '--green-500': '#4dc952',
  '--green-400': '#86d981',
  '--green-300': '#a2e29b',
  '--green-200': '#bdeab7',
  '--green-100': '#d8f3d4',
  '--green-50': '#e4f7e1',
  '--blue-900': '#2d376d',
  '--blue-800': '#39478f',
  '--blue-700': '#4c5cb0',
  '--blue-600': '#6374d0',
  '--blue-500': '#798bec',
  '--blue-400': '#8598ff',
  '--blue-300': '#97a7ff',
  '--blue-200': '#b1beff',
  '--blue-100': '#dae0ff',
  '--blue-50': '#f4f6ff',
  '--yellow-900': '#fcb519',
  '--yellow-800': '#fcc026',
  '--yellow-700': '#fcc62d',
  '--yellow-600': '#fdcc35',
  '--yellow-500': '#fdd13b',
  '--yellow-400': '#fedf76',
  '--yellow-300': '#fee89d',
  '--yellow-200': '#fef1c4',
  '--yellow-100': '#fff9e7',
  '--yellow-50': '#fffbee',
  '--orange-900': '#ff5310',
  '--orange-800': '#ff661a',
  '--orange-700': '#ff7020',
  '--orange-600': '#ff7b26',
  '--orange-500': '#ff832b',
  '--orange-400': '#ffa86b',
  '--orange-300': '#ffc195',
  '--orange-200': '#ffdabf',
  '--orange-100': '#fff0e6',
  '--orange-50': '#fff5ed',
  '--red-900': '#b41710',
  '--red-800': '#c41f17',
  '--red-700': '#cf2318',
  '--red-600': '#da291d',
  '--red-500': '#e43326',
  '--red-400': '#ee5f54',
  '--red-300': '#ef9790',
  '--red-200': '#f5c0bc',
  '--red-100': '#fbe6e4',
  '--red-50': '#fcedec',
  '--teal-900': '#07a0ab',
  '--teal-800': '#05aab6',
  '--teal-700': '#06b7c4',
  '--teal-600': '#03c0cd',
  '--teal-500': '#0bc8d6',
  '--teal-400': '#47d5df',
  '--teal-300': '#73dfe7',
  '--teal-200': '#a9eff2',
  '--teal-100': '#c0fbfe',
  '--teal-50': '#d3fcfe',
  '--lime-900': '#487a34',
  '--lime-800': '#558b2f',
  '--lime-700': '#689f38',
  '--lime-600': '#76af34',
  '--lime-500': '#7fb800',
  '--lime-400': '#9ccc65',
  '--lime-300': '#aadc72',
  '--lime-200': '#c5e1a5',
  '--lime-100': '#eaf8db',
  '--lime-50': '#f1fae6',
  '--purple-900': '#4d0b8f',
  '--purple-800': '#4d278f',
  '--purple-700': '#592baa',
  '--purple-600': '#6938c0',
  '--purple-500': '#7d4dd3',
  '--purple-400': '#ae82fc',
  '--purple-300': '#c19eff',
  '--purple-200': '#cfb4ff',
  '--purple-100': '#e1d0ff',
  '--purple-50': '#eadeff',
  '--magenta-900': '#ca136c',
  '--magenta-800': '#d91f79',
  '--magenta-700': '#ee2a89',
  '--magenta-600': '#f53693',
  '--magenta-500': '#ff479f',
  '--magenta-400': '#ff8ac1',
  '--magenta-300': '#ffabd3',
  '--magenta-200': '#ffcde4',
  '--magenta-100': '#ffeef7',
  '--magenta-50': '#fff3f9',
  '--sea-green-500': '#35d6cb',
  '--aqua-500': '#61c1dd',
  '--corporate-cd-border': 'var(--corporate-cd-border)',
  '--corporate-cd-foreground': 'var(--corporate-cd-foreground)',
  '--corporate-cd-background': 'var(--corporate-cd-background)',
  '--corporate-ci-border': 'var(--corporate-ci-border)',
  '--corporate-ci-foreground': 'var(--corporate-ci-foreground)',
  '--corporate-ci-background': 'var(--corporate-ci-background)',
  '--corporate-ccm-border': 'var(--corporate-ccm-border)',
  '--corporate-ccm-foreground': 'var(--corporate-ccm-foreground)',
  '--corporate-ccm-background': 'var(--corporate-ccm-background)',
  '--corporate-f-border': 'var(--corporate-ff-border)',
  '--corporate-ff-foreground': 'var(--corporate-ff-foreground)',
  '--corporate-ff-background': 'var(--corporate-ff-background)',
  '--corporate-srm-border': 'var(--corporate-srm-border)',
  '--corporate-srm-foreground': 'var(--corporate-srm-foreground)',
  '--corporate-srm-background': 'var(--corporate-srm-background)',
  '--corporate-sto-border': 'var(--corporate-sto-border)',
  '--corporate-sto-foreground': 'var(--corporate-sto-foreground)',
  '--corporate-sto-background': 'var(--corporate-sto-background)',
  '--corporate-ce-border': 'var(--corporate-ce-border)',
  '--corporate-ce-foreground': 'var(--corporate-ce-foreground)',
  '--corporate-ce-background': 'var(--corporate-ce-background)',
  '--theme-light-bg': 'var(--grey-0)',
  '--theme-light-nav-panel-bg': '#07182b',
  '--theme-dark-bg': 'var(--grey-800)',
  '--theme-dark-canvas-bg': '#090909',
  '--theme-dark-canvas-dot': '#585b81',
  '--theme-dark-nav-panel-bg': '#030d19',
  '--white': 'var(--grey-0)',
  '--black': 'var(--grey-1000)',
  '--black-100': 'var(--grey-900)',
  '--grey': 'var(--grey-500)',
  '--grey-bg': 'var(--grey-50)',
  '--pipeline-bg': '#f6fcff',
  '--pipeline-bg-dot': '#bbc1c4'
}

export interface ColorRowProps {
  name: string
  value: string
}

const ColorRow = ({ name, value }: ColorRowProps) => {
  const style = { verticalAlign: 'middle' }
  return (
    <tr>
      <td style={style}>{name}</td>
      <td>
        <Popover
          content={<Text padding="small">var({name}) (click to copy)</Text>}
          usePortal={false}
          interactionKind="hover">
          <button
            style={{
              all: 'unset',
              background: value,
              width: '30px',
              height: '30px',
              display: 'inline-block',
              border: `1px solid ${name.includes('white') ? '#000' : '#fff'}`,
              cursor: 'pointer'
            }}
            onClick={() => Utils.copy('var(' + name + ')')}
          />
        </Popover>
      </td>
      <td style={style}>{value}</td>
      <td style={style}>{name.replace(/-/g, '')}</td>
      <td style={style}>
        Color.
        {name.replace(/--/g, '').replace(/-/g, '_').toUpperCase()}
      </td>
    </tr>
  )
}

export default function Colors(): React.ReactElement {
  return (
    <HTMLTable bordered striped style={{ width: '100%' }}>
      <thead>
        <tr>
          <th>CSS Variable Name</th>
          <th>Color</th>
          <th>Hex Value</th>
          <th>String Value</th>
          <th>Color Reference</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(names).map(([name, value]) => (
          <ColorRow name={name} value={value} key={name + value} />
        ))}
      </tbody>
    </HTMLTable>
  )
}
