/*
 * Copyright 2021 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import path from 'path'
import initStoryshots from '@storybook/addon-storyshots'
import { Context, imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

interface LocalContext extends Context {
  clip: {
    x: number
    y: number
    height: number
    width: number
  }
}

const storybookUrl = `file://${path.resolve(__dirname, '../storybook-static')}`
if (storybookUrl !== null) {
  initStoryshots({
    suite: 'Puppeteer tests',
    framework: 'react',
    // storyKindRegex: /avatar/i,
    test: imageSnapshot({
      storybookUrl,
      beforeScreenshot: async (page, { context }) => {
        ;(context as LocalContext).clip = await page.evaluate(() => {
          // display 'table' is optional, but it prevents div's from using the full viewport width
          document.body.style.display = 'table'
          const { height, width, left: x, top: y } = document.body.getBoundingClientRect()
          return { x, y, height, width }
        })
      },
      getScreenshotOptions: ({ context }) => {
        const clip = (context as LocalContext).clip
        return { clip, omitBackground: true }
      },
      getMatchOptions: () => {
        return {
          failureThreshold: 0.2,
          failureThresholdType: 'percent',
          allowSizeMismatch: true
        }
      },
      chromeExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH
    })
  })
}
// before Snapshot action from file
// Gradients are not rendering in Puppeteer
// Github Comment
