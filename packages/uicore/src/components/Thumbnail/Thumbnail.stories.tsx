/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Thumbnail, ThumbnailProps } from './Thumbnail'

export default {
  title: 'Components / Thumbnail',

  component: Thumbnail,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Thumbnail</Title>
            <Subtitle>
              <pre>
                <code>{`import {Thumbnail} from '@harness/uicore'`}</code>
              </pre>
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

export const Basic: Story<ThumbnailProps> = args => {
  return (
    <>
      <Thumbnail {...args} />
    </>
  )
}

Basic.args = {
  label: 'Kubernetes',
  icon: 'service-kubernetes',
  value: 'kubernetes',
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-alert
    alert(`Value: ${e.target.value}`)
  }
}

export const WithoutIcon: Story<ThumbnailProps> = args => {
  return (
    <>
      <Thumbnail {...args} />
    </>
  )
}

WithoutIcon.args = {
  label: 'Non Production',
  value: 'non-production',
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-alert
    alert(`Value: ${e.target.value}`)
  }
}

export const WithImage: Story<ThumbnailProps> = args => {
  return <Thumbnail {...args} />
}

WithImage.args = {
  label: 'Kubernetes',
  value: 'kubernetes',
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-alert
    alert(`Value: ${e.target.value}`)
  },
  imageProps: {
    src:
      'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMzIgMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbC1ydWxlPSJub256ZXJvIiBmaWxsPSJub25lIj48cGF0aCBkPSJNMTUuOTQuMDIzYy0uMjI4IDAtLjQ1NyAwLS42ODUuMjI5TDQuNTEyIDUuMjhjLS40NTcuMjI5LS45MTUuNjg2LTEuMTQzIDEuMzcyTC42MjYgMTguMDhjLS4yMjkuNDU3IDAgMS4xNDMuMjI5IDEuNmwuMjI4LjIyOSA3LjMxNCA5LjE0M2MuNDU4LjQ1Ny45MTUuNjg1IDEuNi42ODVoMTEuODg2Yy42ODYgMCAxLjE0My0uMjI4IDEuNi0uNjg1bDcuMzE0LTkuMTQzYy40NTgtLjQ1Ny40NTgtMS4xNDMuNDU4LTEuNkwyOC41MTIgNi44OGMtLjIyOS0uNjg1LS40NTctMS4xNDMtMS4xNDMtMS4zNzFMMTYuNjI2LjQ4YzAtLjIyOC0uNDU3LS40NTctLjY4Ni0uNDU3eiIgZmlsbD0iIzMyNkNFNSIvPjxwYXRoIGQ9Ik0xNS45NCAzLjkwOWMtLjQ1NyAwLS42ODUuMjI4LS42ODUuNjg2djIuMDU3YzAgLjIyOC0uMjI5LjIyOC0uMjI5LjIyOHYuMjI5Yy0uNDU3IDAtLjY4NiAwLTEuMTQzLjIyOC0xLjYuNDU4LTMuMiAxLjE0My00LjExNCAyLjI4NmwtLjIyOS0uMjI4aC0uNDU3Yy0uMjI4LS4yMy0uNDU3LS40NTgtLjkxNC0uNjg2bC0uNDU3LS40NTdoLS4yMjljLS4yMjggMC0uMjI4LS4yMjktLjQ1Ny0uMjI5cy0uNDU3IDAtLjQ1Ny4yMjljLS4yMjkuMjI4LS4yMjkuNjg1LjIyOC45MTRoLjIzYy4yMjguMjI5LjQ1Ni4yMjkuNDU2LjIyOS40NTcuMjI4LjY4Ni40NTcuOTE0LjY4NSAwIDAgLjIzLjIyOS4yMy40NTdsLjIyOC4yMjljLTEuMTQzIDEuNi0xLjYgMy42NTctMS4zNzIgNS43MTRoLS4yMjhsLS4yMjkuMjI5Yy0uMjI5IDAtLjY4Ni4yMjgtMS4xNDMuMjI4SDQuOTdjLS40NTcgMC0uNjg2LjQ1OC0uNDU3LjY4NiAwIC4yMjkuNDU3LjQ1Ny45MTQuNDU3aC4yMjljLjIyOCAwIC40NTctLjIyOC42ODUtLjIyOC40NTctLjIyOS42ODYtLjIyOSAxLjE0My0uMjI5LjIyOSAwIC4yMjkgMCAuNDU3LjIyOWguMjI5Yy42ODYgMi4wNTcgMi4wNTcgMy42NTcgMy42NTcgNC41NzFsLS4yMjkuMjI5di40NTdjLS4yMjguMjI4LS4yMjguNjg2LS42ODUgMS4xNDMtLjIyOS4yMjgtLjIyOS4yMjgtLjIyOS40NTd2LjIyOGMtLjIyOC40NTggMCAuNjg2LjIyOS45MTUuMjI4LjIyOC42ODUgMCAuOTE0LS40NTd2LS4yM2MwLS4yMjguMjI5LS40NTYuMjI5LS42ODUuMjI4LS40NTcuMjI4LS45MTQuNDU3LTEuMTQzIDAgMCAuMjI4IDAgLjIyOC0uMjI4bC4yMjktLjIyOWMxLjM3MS40NTcgMy4yLjY4NiA0LjguNDU3LjQ1NyAwIC42ODYtLjIyOCAxLjE0My0uMjI4bC4yMjguMjI4cy4yMjkgMCAuMjI5LjIyOWMuMjI4LjIyOS4yMjguNjg2LjQ1NyAxLjE0MyAwIC4yMjggMCAuNDU3LjIyOS42ODZ2LjIyOGMuMjI4LjQ1Ny40NTcuNDU3LjkxNC40NTcuMjI4LS4yMjguNDU3LS40NTcuMjI4LS45MTR2LS4yMjljMC0uMjI4LS4yMjgtLjIyOC0uMjI4LS40NTctLjIyOS0uNDU3LS40NTctLjY4NS0uNDU3LS45MTR2LS42ODZjMS44MjgtMS4xNDMgMi45NzEtMi43NDMgMy42NTctNC41NzFoLjIyOHMuMjMtLjIyOS40NTgtLjIyOS42ODUuMjI5IDEuMTQyLjIyOWMuMjMgMCAuNDU4LjIyOC42ODYuMjI4aC4yMjljLjQ1NyAwIC42ODUtLjIyOC45MTQtLjQ1NyAwLS4yMjgtLjIyOS0uNjg1LS40NTctLjY4NWgtLjkxNGMtLjQ1OCAwLS45MTUgMC0xLjE0My0uMjMtLjIyOSAwLS4yMjktLjIyOC0uMjI5LS4yMjhoLS4yMjhjLjIyOC0uOTE0IDAtMi4wNTctLjIyOS0yLjk3MS0uMjI5LS45MTQtLjY4Ni0yLjA1Ny0xLjE0My0yLjc0M2wuMjI5LS4yMjhjMC0uMjMgMC0uMjMuMjI4LS40NTguMjI5LS4yMjguNDU3LS40NTcuOTE1LS42ODUuMjI4IDAgLjQ1Ny0uMjI5LjQ1Ny0uMjI5aC4yMjhjLjIyOS0uMjI4LjQ1Ny0uNjg2LjIyOS0uOTE0LS4yMjktLjIyOS0uNjg2LS4yMjktLjkxNCAwaC0uMjI5bC0uNDU3LjQ1N2MtLjIyOS4yMjktLjY4Ni42ODYtLjkxNC42ODZoLS40NThsLS4yMjguMjI4YTguNzc4IDguNzc4IDAgMDAtNS4yNTctMi41MTR2LS4yMjlsLS4yMjktLjIyOFY1Ljk2NnYtLjkxNGMtLjQ1Ny0uNjg2LS42ODYtMS4xNDMtMS4xNDMtMS4xNDN6bS0uNjg1IDUuMDI4bC0uMjI5IDMuNDI5YS40OTIuNDkyIDAgMDEtLjQ1Ny40NTdoLS4yMjlsLTIuNzQzLTIuMDU3Yy45MTUtLjkxNCAxLjgzLTEuMzcxIDMuMi0xLjgyOWguNDU4em0xLjYgMGMxLjM3MS4yMjkgMi43NDIuOTE1IDMuODg1IDEuODI5bC0yLjc0MyAxLjgyOWMtLjIyOC4yMjgtLjY4NS4yMjgtLjY4NSAwbC0uMjI5LS4yMy0uMjI4LTMuNDI4em0tNi40IDMuMmwyLjUxNCAyLjI4NmMuMjI4LjIyOS4yMjguNDU3IDAgLjY4NmwtLjIyOS4yMjgtMy4yLjkxNWMtLjIyOC0xLjYgMC0yLjk3Mi45MTUtNC4xMTV6bTExLjIgMGMuNDU3LjY4Ni42ODUgMS4zNzIuOTE0IDIuMDU4LjIyOC42ODUuMjI4IDEuMzcuMjI4IDIuMDU3bC0zLjItLjkxNWMtLjIyOCAwLS40NTctLjQ1Ny0uNDU3LS42ODUgMC0uMjI5IDAtLjIyOS4yMjktLjIyOWwyLjI4Ni0yLjI4NnptLTYuMTcyIDIuMjg2aC45MTRsLjY4Ni42ODYtLjIyOC45MTQtLjkxNS40NTctLjkxNC0uNDU3LS4yMjktLjkxNC42ODYtLjY4NnptMy4yIDIuNzQzYy4yMjkgMCAuMjI5IDAgMCAwbDMuNDI5LjQ1N2MtLjQ1NyAxLjM3Mi0xLjM3MiAyLjUxNC0yLjc0MyAzLjQyOWwtMS4zNzItMy4yYy4yMy0uMjI5LjIzLS40NTcuNjg2LS42ODZoMHptLTUuNDg2IDBjLjIzIDAgLjQ1OC4yMjkuNDU4LjQ1N3YuNDU3bC0xLjM3MiAzLjJjLTEuMTQzLS42ODUtMi4wNTctMS44MjgtMi43NDMtMy40MjhsMy42NTctLjY4NnptMi43NDMgMS4zNzFoLjIyOWwuMjI4LjIyOSAxLjYgMi45NzFjLS4yMjggMC0uNDU3LjIyOS0uNjg1LjIyOS0xLjE0My4yMjktMi41MTUuMjI5LTMuNjU3LS4yMjlsMS42LTIuOTcxYy40NTcgMCAuNDU3LS4yMjkuNjg1LS4yMjloMHoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIuMjUiIGZpbGw9IiNGRkYiLz48L2c+PC9zdmc+',
    alt: 'A logo of Kubernetes'
  }
}
