/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { get } from 'lodash-es'
import type { Entry } from 'contentful'
import {
  //  IconName,
  Intent,
  Callout
} from '@blueprintjs/core'
import cx from 'classnames'
// import // Text
// // Button, ButtonVariation, Layout
// '@harness/uicore'

import { Error, HelpPanelContext } from '../../HelpPanelContext'
import { useCache } from '../../hooks/useCache'
// import DefaultContainer from './Containers/DefaultContainer/DefaultContainer'
// import FloatingContainer from './Containers/FloatingContainer/FloatingContainer'
// import BannerContent from './BannerContent/BannerContent'
import Contentful from '../../ContentfulApi'
// import { useContentful } from '../../HelpPanelContext'
import {
  ContentType
  // IHelpPanel
} from '../../types/contentfulTypes'

import css from './Banner.module.css'

export enum BannerType {
  TOP_BANNER = 'TOP_BANNER',
  POST = 'POST'
}

export interface BannerFields {
  title: string
  message?: string
  intent: Intent
}

// export interface BannerInterface {
//   id: string
//   bannerProps: {
//     title: string
//     message: string
//     intent?: Intent
//     icon?: IconName
//     bannerClass?: string
//     messageClass?: string
//     closeButtonClass?: string
//     primaryCta?: {
//       label: string
//       onClick: () => void
//     }
//     secondaryCta?: {
//       label: string
//       onClick: () => void
//     }
//     deRegisterBannerCallback?: () => void
//   }
//   bannerDismissAllowed?: boolean
// }

interface BannerProps {
  // referenceId?: string
  path: string
  type?: BannerType
  onClose?: () => void
  cacheTime?: number
}

const Banner: React.FC<BannerProps> = props => {
  const {
    // referenceId
    path,
    cacheTime
    // type
  } = props
  // const floatingBtnRef = React.useRef<HTMLButtonElement | null>(null)

  const {
    error: initialError
    // banners
  } = React.useContext(HelpPanelContext)
  const { getCache, setCache } = useCache(cacheTime)
  const CACHE_KEY = `BANNERS_${path}`
  const [urlBannerMapResponse, setUrlBannerMapResponse] = useState({})

  if (initialError === Error.ERROR_INITIALIZING_CONTENTFUL) {
    return null
  }
  useEffect(() => {
    const getUrlBannerMap = async (): Promise<void> => {
      const client = Contentful.getClient()
      const response = await client.getEntries({
        'fields.url[match]': path,
        // eslint-disable-next-line camelcase
        content_type: ContentType.urlBannerMap,
        limit: 1000
      })
      setCache(CACHE_KEY, response)
      setUrlBannerMapResponse(response)
    }

    const cachedValue = getCache(CACHE_KEY)
    console.log('CACHE_KEY:', CACHE_KEY, '   cachedValue:', cachedValue)
    if (cachedValue) {
      setUrlBannerMapResponse(cachedValue)
    } else {
      getUrlBannerMap()
    }
  }, [path])

  // const { data, loading, error } = useContentful<IHelpPanel>({
  //   referenceId,
  //   // eslint-disable-next-line camelcase
  //   content_type: ContentType.banner
  // })

  // return (
  //   <BannerContent
  //     data={banners}
  //     //  error={error}
  //     // loading={loading}
  //     onClose={props.onClose}
  //     hideFooter
  //   />
  // )
  const filteredBanners = useMemo(() => {
    const entries = get(urlBannerMapResponse, 'includes.Entry')
    return entries?.map((entry: Entry<BannerFields>) => {
      const plainBannerObj = entry?.fields
      // console.log('plainBannerObj: ', plainBannerObj)
      return plainBannerObj
    })
  }, [urlBannerMapResponse])

  // console.log('filteredBanners: ', filteredBanners)
  return (
    <div>
      {filteredBanners?.map((banner: BannerFields) => {
        // const { bannerProps } = banner
        const { message, title, intent } = banner
        // const {
        //   title,
        //   intent,
        //   // bannerClass,
        //   // messageClass,
        //   icon,
        //   message
        //   // primaryCta,
        //   // secondaryCta,
        //   // deRegisterBannerCallback
        // } = bannerProps
        return (
          <Callout
            intent={intent}
            key={banner.title}
            className={cx(
              css.banner
              //  bannerClass
            )}
            // icon={icon}
          >
            <div
              className={cx(
                css.message
                //  messageClass
              )}>
              <span className={css.titleClass}>
                INTENT: {intent} -- {title}
              </span>

              <span className={css.messageClass}>{message}</span>
            </div>

            {/* <Button
              variation={ButtonVariation.ICON}
              className={css.close}
              icon="cross"
              onClick={() => {
                if (isNil(banner.bannerDismissAllowed) || banner.bannerDismissAllowed) {
                  deRegisterBanner(banner.id)
                  deRegisterBannerCallback?.()
                }
              }}
            />
            <div className={css.cta}>
              {primaryCta && (
                <Button onClick={primaryCta.onClick} variation={ButtonVariation.LINK} intent={intent}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button onClick={secondaryCta.onClick} variation={ButtonVariation.LINK}>
                  {secondaryCta.label}
                </Button>
              )}
            </div> */}
          </Callout>
        )
      })}
    </div>
  )
}

export default Banner
