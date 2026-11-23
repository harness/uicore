/*
 * Copyright 2026 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useState, VideoHTMLAttributes } from 'react'
import cx from 'classnames'
import { Icon } from '@harness/icons'
import { Color } from '@harness/design-system'
import { Button, ButtonVariation } from '../Button/Button'
import { Container } from '../Container/Container'
import css from './VideoPlayer.css'

const YOUTUBE_ID_REGEX = /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|shorts\/|watch\?(?:[^#]*&)?v=))([\w-]{11})/

export const getYouTubeVideoId = (url?: string | null): string | undefined => url?.match(YOUTUBE_ID_REGEX)?.[1]

export interface VideoPlayerProps {
  /** YouTube URL (watch, youtu.be, embed or shorts) or a direct video file URL */
  url: string
  /** Accessible title for the player */
  title: string
  /** Poster image. YouTube videos fall back to the video thumbnail */
  poster?: string | null
  /** Accessible label for the click-to-play button shown before a YouTube video loads */
  playLabel?: string
  /** Show player controls for both native and YouTube videos. Default is true */
  controls?: boolean
  /** Additional attributes for the native video element, e.g. autoPlay, muted, loop, preload */
  videoProps?: Omit<VideoHTMLAttributes<HTMLVideoElement>, 'src' | 'poster' | 'controls' | 'className' | 'title'>
  /** Rendered when a native video cannot be played. Defaults to a link that opens the video URL */
  fallback?: React.ReactNode
  className?: string
}

/**
 * Renders YouTube videos as a lightweight thumbnail that loads the privacy-enhanced embed on click,
 * and any other URL as a native video element with a fallback when playback fails.
 */
export function VideoPlayer({
  url,
  title,
  poster,
  playLabel = 'Play video',
  controls = true,
  videoProps,
  fallback,
  className
}: VideoPlayerProps): React.ReactElement {
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const youTubeId = getYouTubeVideoId(url)

  if (!youTubeId) {
    const fallbackContent = fallback ?? (
      <Button
        variation={ButtonVariation.LINK}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        icon="play"
        text={title}
      />
    )

    if (failed) {
      return (
        <Container className={cx(css.main, css.fallback, className)} data-testid="video-player-fallback">
          {fallbackContent}
        </Container>
      )
    }

    return (
      <video
        preload="none"
        {...videoProps}
        src={url}
        poster={poster || undefined}
        title={title}
        controls={controls}
        className={cx(css.main, className)}
        onError={event => {
          setFailed(true)
          videoProps?.onError?.(event)
        }}>
        {fallbackContent}
      </video>
    )
  }

  if (playing) {
    return (
      <iframe
        className={cx(css.main, className)}
        src={`https://www.youtube-nocookie.com/embed/${youTubeId}?autoplay=1&rel=0${controls ? '' : '&controls=0'}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    )
  }

  return (
    <Button
      noStyling
      type="button"
      className={cx(css.main, css.facade, className)}
      onClick={() => setPlaying(true)}
      aria-label={playLabel}>
      <img src={poster || `https://i.ytimg.com/vi/${youTubeId}/hqdefault.jpg`} alt="" />
      <Container className={css.playButton}>
        <Icon name="play" size={20} color={Color.BLACK} />
      </Container>
    </Button>
  )
}
