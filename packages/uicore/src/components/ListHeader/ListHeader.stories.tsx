/*
 * Copyright 2024 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary } from '@storybook/addon-docs/blocks'
import {
  Layout,
  ListHeader,
  sortByName,
  sortByEmail,
  sortByCreated,
  sortByStatus,
  sortByVersion,
  SortMethod,
  Select
} from '../..'
import { ListHeaderProps } from './ListHeader'
import { IconName } from '@blueprintjs/core'
import css from './ListHeaderStory.css'
import cx from 'classnames'
import { noop } from 'lodash-es'

const selectOptions = [
  {
    label: 'Service Kubernetes',
    value: 'service-kubernetes',
    icon: { name: 'service-kubernetes' as IconName }
  },
  {
    label: 'Service Github',
    value: 'service-github',
    icon: { name: 'service-github' as IconName }
  },
  { label: 'ELK', value: 'service-elk', icon: { name: 'service-elk' as IconName } },
  { label: 'Jenkins', value: 'service-jenkins', icon: { name: 'service-jenkins' as IconName } },
  { label: 'GCP', value: 'service-gcp', icon: { name: 'service-gcp' as IconName } }
]

export default {
  title: 'Components / ListHeader',

  component: ListHeader,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>ListHeader</Title>
            <Subtitle>
              <code>{`import {ListHeader} from '@harness/uicore'`}</code>
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
      <Layout.Horizontal spacing="small">
        <Story />
      </Layout.Horizontal>
    )
  ]
} as Meta

export const ListHeaderWithoutContent: Story<ListHeaderProps> = () => {
  return (
    <ListHeader
      totalCount={100}
      sortOptions={[...sortByName, ...sortByEmail, ...sortByCreated, ...sortByStatus, ...sortByVersion]}
      selectedSortMethod={SortMethod.NameAsc}
      onSortMethodChange={() => {
        //
      }}
      className={cx(css.listHeaderStory)}
    />
  )
}

export const ListHeaderWithPreDropdownContent: Story<ListHeaderProps> = () => {
  return (
    <ListHeader
      totalCount={100}
      sortOptions={[...sortByName, ...sortByEmail, ...sortByCreated, ...sortByStatus, ...sortByVersion]}
      selectedSortMethod={SortMethod.NameAsc}
      onSortMethodChange={noop}
      preDropdownContent={
        <div className={cx(css.selectWrapper, css.selectWrapperPre)}>
          <Select items={selectOptions} addClearBtn={true} value={selectOptions[1]} />
        </div>
      }
      className={cx(css.listHeaderStory)}
    />
  )
}

export const ListHeaderWithPostDropdownContent: Story<ListHeaderProps> = () => {
  return (
    <ListHeader
      totalCount={100}
      sortOptions={[...sortByName, ...sortByEmail, ...sortByCreated, ...sortByStatus, ...sortByVersion]}
      selectedSortMethod={SortMethod.NameAsc}
      onSortMethodChange={noop}
      postDropdownContent={
        <div>
          <div className={cx(css.selectWrapper, css.selectWrapperPost)}>
            <Select items={selectOptions} addClearBtn={true} value={selectOptions[1]} />
          </div>
        </div>
      }
      className={cx(css.listHeaderStory)}
    />
  )
}

export const ListHeaderWithPreAndPostDropdownContent: Story<ListHeaderProps> = () => {
  return (
    <ListHeader
      totalCount={100}
      sortOptions={[...sortByName, ...sortByEmail, ...sortByCreated, ...sortByStatus, ...sortByVersion]}
      selectedSortMethod={SortMethod.NameAsc}
      onSortMethodChange={noop}
      preDropdownContent={
        <div className={cx(css.selectWrapper, css.selectWrapperPre)}>
          <Select items={selectOptions} addClearBtn={true} value={selectOptions[1]} />
        </div>
      }
      postDropdownContent={
        <div>
          <div className={cx(css.selectWrapper, css.selectWrapperPost)}>
            <Select items={selectOptions} addClearBtn={true} value={selectOptions[1]} />
          </div>
        </div>
      }
      className={cx(css.listHeaderStory)}
    />
  )
}
