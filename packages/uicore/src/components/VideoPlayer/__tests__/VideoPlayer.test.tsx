/*
 * Copyright 2026 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { VideoPlayer, getYouTubeVideoId } from '../VideoPlayer'

const YOUTUBE_URL = 'https://youtu.be/dP_Kb8q68wY'
const VIDEO_URL = 'https://cdn.example.com/demo.mp4'

describe('VideoPlayer', () => {
  test.each([
    [YOUTUBE_URL, 'dP_Kb8q68wY'],
    ['https://www.youtube.com/watch?v=dP_Kb8q68wY&t=10', 'dP_Kb8q68wY'],
    ['https://www.youtube.com/watch?feature=shared&v=dP_Kb8q68wY', 'dP_Kb8q68wY'],
    ['https://www.youtube-nocookie.com/embed/dP_Kb8q68wY', 'dP_Kb8q68wY'],
    ['https://youtube.com/shorts/dP_Kb8q68wY', 'dP_Kb8q68wY'],
    [VIDEO_URL, undefined],
    [undefined, undefined]
  ])('getYouTubeVideoId(%s) returns %s', (url, id) => {
    expect(getYouTubeVideoId(url)).toBe(id)
  })

  test('renders a native video with controls and passes through video attributes', () => {
    const { container } = render(
      <VideoPlayer
        url={VIDEO_URL}
        poster="https://cdn.example.com/poster.png"
        title="Demo"
        videoProps={{ muted: true, loop: true }}
      />
    )

    const video = container.querySelector('video') as HTMLVideoElement
    expect(video).toHaveAttribute('src', VIDEO_URL)
    expect(video).toHaveAttribute('poster', 'https://cdn.example.com/poster.png')
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('preload', 'none')
    expect(video).toHaveAttribute('loop')
    expect(video.muted).toBe(true)
  })

  test('hides native controls when controls is false', () => {
    const { container } = render(<VideoPlayer url={VIDEO_URL} title="Demo" controls={false} />)

    expect(container.querySelector('video')).not.toHaveAttribute('controls')
  })

  test.each([
    ['the default link', undefined, 'Demo'],
    ['a custom fallback', <span key="custom">Video unavailable</span>, 'Video unavailable']
  ])('shows %s when the native video fails to load', (_, fallback, expectedText) => {
    const onError = jest.fn()
    const { container } = render(
      <VideoPlayer url={VIDEO_URL} title="Demo" fallback={fallback} videoProps={{ onError }} />
    )

    fireEvent.error(container.querySelector('video') as HTMLVideoElement)

    expect(onError).toHaveBeenCalled()
    expect(container.querySelector('video')).not.toBeInTheDocument()
    expect(screen.getByTestId('video-player-fallback')).toHaveTextContent(expectedText)
  })

  test('shows the YouTube thumbnail and loads the embed only after clicking play', () => {
    const { container } = render(<VideoPlayer url={YOUTUBE_URL} title="Demo" playLabel="Watch" />)

    expect(container.querySelector('img')).toHaveAttribute('src', 'https://i.ytimg.com/vi/dP_Kb8q68wY/hqdefault.jpg')
    expect(container.querySelector('iframe')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Watch' }))

    expect(screen.getByTitle('Demo')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/dP_Kb8q68wY?autoplay=1&rel=0'
    )
  })

  test('hides YouTube controls when controls is false', () => {
    render(<VideoPlayer url={YOUTUBE_URL} title="Demo" controls={false} />)

    fireEvent.click(screen.getByRole('button', { name: 'Play video' }))

    expect(screen.getByTitle('Demo')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/dP_Kb8q68wY?autoplay=1&rel=0&controls=0'
    )
  })

  test('prefers a provided poster over the YouTube thumbnail', () => {
    const { container } = render(
      <VideoPlayer url={YOUTUBE_URL} title="Demo" poster="https://cdn.example.com/poster.png" />
    )

    expect(container.querySelector('img')).toHaveAttribute('src', 'https://cdn.example.com/poster.png')
  })
})
