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
          failureThresholdType: 'percent'
        }
      }
    })
  })
}
// before Snapshot action from file
// Gradients are not rendering in Puppeteer
// Github Comment
