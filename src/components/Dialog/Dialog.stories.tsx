import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Dialog, Button, ButtonVariation, Layout } from '../..'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import { DialogProps } from '../Dialog/Dialog'

export default {
  title: 'Components / Dialog',

  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Dialog</Title>

            <Subtitle>
              <pre>
                <code>{`import { Dialog }  from '@wings-software/uicore'`}</code>
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
export const Basic: Story<DialogProps> = () => {
  const footerRenderer = (
    <Layout.Horizontal spacing="small" padding="none" margin="none">
      <Button text="Apply" variation={ButtonVariation.PRIMARY}></Button>
      <Button text="Cancel" variation={ButtonVariation.TERTIARY}></Button>
    </Layout.Horizontal>
  )
  return (
    <>
      <Dialog isOpen={false} title={'New User Group'} style={{ width: 461, height: 421 }} footer={footerRenderer}>
        <div>Child Element </div>
      </Dialog>
    </>
  )
}
