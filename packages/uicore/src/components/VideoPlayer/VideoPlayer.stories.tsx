/*
 * Copyright 2026 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { VideoPlayer, VideoPlayerProps } from './VideoPlayer'

export default {
  title: 'Components / VideoPlayer',
  component: VideoPlayer,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },
      page: function PageDescription() {
        return (
          <>
            <Title>VideoPlayer</Title>
            <Subtitle>
              <pre>
                <code>{`import { VideoPlayer } from '@harness/uicore'`}</code>
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
  decorators: [
    Story => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    )
  ]
} as Meta

export const YouTube: Story<VideoPlayerProps> = args => <VideoPlayer {...args} />
YouTube.args = {
  url: 'https://youtu.be/dP_Kb8q68wY',
  title: 'Harness overview'
}

export const NativeVideo: Story<VideoPlayerProps> = args => <VideoPlayer {...args} />
NativeVideo.args = {
  url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  title: 'Flower'
}

export const AutoplayWithoutControls: Story<VideoPlayerProps> = args => <VideoPlayer {...args} />
AutoplayWithoutControls.args = {
  url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  title: 'Flower',
  controls: false,
  videoProps: { autoPlay: true, muted: true, loop: true }
}

export const Fallback: Story<VideoPlayerProps> = args => <VideoPlayer {...args} />
Fallback.args = {
  url: 'https://cdn.example.com/missing-video.mp4',
  title: 'Open the video in a new tab'
}
