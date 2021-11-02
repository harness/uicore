import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { ReactTable, TableProps } from './ReactTable'

interface Data {
  name: string
  age: number
}

export default {
  title: 'Common / Table',
  component: ReactTable,
  argTypes: {}
} as Meta

const Template: Story<TableProps<Data>> = args => <ReactTable {...args} sortable={true} />

export const Basic = Template.bind({})

Basic.args = {
  columns: [
    {
      Header: 'Name',
      accessor: row => row.name,
      id: 'name'
    },
    {
      Header: 'Age',
      accessor: row => row.age,
      id: 'age'
    }
  ],
  data: [
    {
      name: 'User 1',
      age: 20
    },
    {
      name: 'User 2',
      age: 25
    }
  ]
}
