/*
 * Copyright 2022 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

/* eslint-disable no-console */
/* eslint-disable no-alert */
import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { SimpleTagInput, TagInputProps, Container, Text } from '../..'
import { omit } from 'lodash-es'

export default {
  title: 'Components / SimpleTagInput',

  component: SimpleTagInput,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>SimpleTagInput</Title>
            <Description>{`This component handles tags as an array of strings.`}</Description>
            <Subtitle>
              <>
                <pre>
                  <code>{`import {SimpleTagInput} from '@harness/uicore'`}</code>
                </pre>
              </>
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
export const Basic: Story<
  Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
> = args => {
  const {
    items = [
      'The Godfather',
      'The Godfather: Part II',
      'The Dark Knight',
      '12 Angry Men',
      "Schindler's List",
      'Special'
    ]
  } = args
  const argsCopy = omit(args, ['items'])
  return (
    <Container width={500}>
      <SimpleTagInput
        fill
        noInputBorder
        openOnKeyDown={false}
        showAddTagButton
        showClearAllButton
        showNewlyCreatedItemsInList={false}
        allowNewTag
        placeholder="Enter tags..."
        getTagProps={(value: any, _index, _selectedItems, createdItems: any, items: any) => {
          const isItemNewlyCreated = createdItems.includes(value) || !items.includes(value)
          const isExpression = isItemNewlyCreated && value.startsWith('${') && value.endsWith('}')
          return isExpression
            ? { intent: 'none', minimal: true }
            : isItemNewlyCreated
            ? { intent: 'danger', minimal: true }
            : { intent: 'primary', minimal: true }
        }}
        selectedItems={['The Shawshank Redemption', '${service.name}']}
        validateNewTag={tag => {
          // Allow Harness expression and alpha numeric
          const isValidTag = (tag.startsWith('${') && tag.endsWith('}')) || new RegExp('^[a-z0-9-]+$').test(tag)
          if (!isValidTag) {
            alert('Tag is not allowed')
          }
          return isValidTag
        }}
        items={items}
        onChange={(selectedItems, createdItems, items) => {
          console.log('onChange', { selectedItems, createdItems, items })
        }}
        inputProps={{ 'data-foo': 'bar' }}
        {...argsCopy}
      />
    </Container>
  )
}

export const LabelValueItemsAndExpressionsexcludesCustomValues: Story<
  Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
> = args => {
  const {
    items = [
      {
        label: 'perpetual-tasks',
        value: '10488'
      },
      {
        label: 'test-framework',
        value: '10489'
      },
      {
        label: 'watcher',
        value: '10501'
      }
    ]
  } = args
  const argsCopy = omit(args, ['items'])
  return (
    <Container width={500}>
      <SimpleTagInput
        fill
        noInputBorder
        openOnKeyDown={false}
        showAddTagButton
        showClearAllButton
        showNewlyCreatedItemsInList={false}
        allowNewTag
        placeholder="Enter tags..."
        getTagProps={(value: any, _index, _selectedItems, createdItems, items) => {
          const isItemNewlyCreated = createdItems.includes(value) || !items.includes(value)
          const isExpression = isItemNewlyCreated && value.startsWith('${') && value.endsWith('}')
          return isExpression
            ? { intent: 'none', minimal: true }
            : isItemNewlyCreated
            ? { intent: 'none', minimal: true }
            : { intent: 'danger', minimal: true }
        }}
        selectedItems={['10488', '10489', '${service.name}']}
        validateNewTag={tag => {
          // Allow valid Harness expression
          const isValidTag = tag.startsWith('${') && tag.endsWith('}')
          if (!isValidTag) {
            alert('Tag is not allowed')
          }
          return isValidTag
        }}
        items={items}
        onChange={(selectedItems, createdItems, items) => {
          console.log('onChange', { selectedItems, createdItems, items })
        }}
        inputProps={{ 'data-foo': 'bar' }}
        {...argsCopy}
      />
    </Container>
  )
}
export const ReadOnly: Story<
  Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
> = args => {
  return (
    <Container width={500}>
      <SimpleTagInput
        readonly
        fill
        noInputBorder
        selectedItems={['The Shawshank Redemption', 'The Godfather', 'The Godfather: Part II', 'The Dark Knight']}
        {...args}
      />
    </Container>
  )
}
export const StaticDataset: Story<
  Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
> = args => {
  const {
    items = [
      'The Shawshank Redemption',
      'The Godfather',
      'The Godfather: Part II',
      'The Dark Knight',
      '12 Angry Men',
      "Schindler's List",
      'Special'
    ]
  } = args
  const argsCopy = omit(args, ['items'])
  return (
    <Container width={500}>
      <SimpleTagInput
        fill
        allowNewTag={true}
        showClearAllButton={true}
        onNewItemCreated={(newItem, selectedItems, createdItems, items) =>
          console.log({ newItem, selectedItems, createdItems, items })
        }
        getTagProps={(value: any, _index, _selectedItems, createdItems, items) => {
          const isItemNewlyCreated = createdItems.includes(value) || !items.includes(value)
          const isExpression = isItemNewlyCreated && value.startsWith('${') && value.endsWith('}')

          return isExpression
            ? { intent: 'none', minimal: true }
            : isItemNewlyCreated
            ? { intent: 'danger', minimal: true }
            : { intent: 'primary', minimal: true }
        }}
        items={items}
        onChange={(selectedItems, createdItems, items) => {
          console.log('onChange', { selectedItems, createdItems, items })
        }}
        {...argsCopy}
      />
    </Container>
  )
}
export const DynamicDataset: Story<
  Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
> = args => {
  const {
    items = async () => {
      return new Promise(r => {
        setTimeout(() => {
          r({
            items: ['aws', 'ecs', 'k8s', 'gcp']
          })
        }, 5000)
      })
    }
  } = args
  const argsCopy = omit(args, ['items'])
  return (
    <Container width={500}>
      <Text>
        SimpleTagInput accepts items prop as a TagInputItemsFutureResult (a promise) which will resolve as a typical
        xhr-async result.
      </Text>
      <pre>
        <code>
          {` interface TagInputItemsFutureResult {
  items: string[]
  error: string
  success: boolean
}`}
        </code>
      </pre>
      <Text>Meaning you can use xhr-async to fetch for tag dataset. SimpleTagInput handles error internally.</Text>
      <SimpleTagInput fill items={items} {...argsCopy} />
    </Container>
  )
}
export const DynamicDatasetErrorHandlingRetrying: Story<
  Omit<TagInputProps<string | { label: string; value: string }>, 'labelFor' | 'keyOf' | 'itemFromNewTag'>
> = args => {
  const {
    items = async () => {
      return new Promise(r => {
        setTimeout(() => {
          r({ error: 'Failed to fetch tags...' })
        }, 10000)
      })
    }
  } = args
  const argsCopy = omit(args, ['items'])
  return (
    <Container width={500}>
      <SimpleTagInput fill items={items} {...argsCopy} />
    </Container>
  )
}
