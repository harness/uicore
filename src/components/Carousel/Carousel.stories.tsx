import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { Carousel, CarouselProps } from '../..'

export default {
  title: 'Components / Carousel',

  component: Carousel,
  parameters: {
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Carousel</Title>
            <Subtitle>
              <pre>
                <code>{`import {Carousel} from '@wings-software/uicore'`}</code>
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
export const Basic: Story<CarouselProps> = args => {
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <Carousel {...args}>
          <div style={{ backgroundColor: 'red', height: 400, color: 'white', textAlign: 'center' }}>Image 1</div>
          <div style={{ backgroundColor: 'blue', height: 400, color: 'white', textAlign: 'center' }}>Image 2</div>
          <div style={{ backgroundColor: 'green', height: 400, color: 'white', textAlign: 'center' }}>Image 3</div>
          <div style={{ backgroundColor: 'red', height: 400, color: 'white', textAlign: 'center' }}>Image 4</div>
          <div style={{ backgroundColor: 'blue', height: 400, color: 'white', textAlign: 'center' }}>Image 5</div>
          <div style={{ backgroundColor: 'green', height: 400, color: 'white', textAlign: 'center' }}>Image 6</div>
        </Carousel>
      </div>
    </>
  )
}
