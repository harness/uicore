import path from 'path'
import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

const storybookUrl = `file://${path.resolve(__dirname, '../storybook-static')}`
if (storybookUrl !== null) {
  initStoryshots({
    suite: 'Puppeteer tests',
    framework: 'react',
    test: imageSnapshot({
      storybookUrl,
      getMatchOptions: () => ({
        failureThreshold: 0.02, // 2% threshold,
        failureThresholdType: 'percent',
        beforeScreenshot: (page: any) => page.$('#root > *')
      })
    })
  })
}
