import React, { useMemo, useState } from 'react'
import type { Meta, Story } from '@storybook/react'
import { Title, Subtitle, ArgsTable, Stories, PRIMARY_STORY, Primary, Description } from '@storybook/addon-docs/blocks'
import { Table, TableProps, Text, Select, TextProps } from '../..'
import { omit } from 'lodash-es'

import pokedex from '../../_stories/components/pokedex.json'
import { Cell, Row } from 'react-table'
export default {
  title: 'Components / Table',

  component: Table,

  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code'
      },

      page: function PageDescription() {
        return (
          <>
            <Title>Table</Title>
            <Subtitle>
              <pre>
                <code>{`import {Table} from '@wings-software/uicore'`}</code>
              </pre>
            </Subtitle>
            <Description>{`Table uses react-table underneath to render a table.<br/>
Link to react-table documentation - https://github.com/tannerlinsley/react-table/<br/>
Link to further examples with code sandboxes - https://github.com/tannerlinsley/react-table/blob/master/docs/examples.md

`}</Description>
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
export const Basic: Story<TableProps<any>> = args => {
  const {
    columns = useMemo(
      () => [
        {
          Header: 'Pokemon Name',
          accessor: 'name'
        },
        {
          Header: 'Pokemon Type',
          accessor: 'type',
          Cell: (props: any) => {
            if (props.value.length === 1) {
              const textProps =
                props.value[0] === 'Fire'
                  ? {
                      intent: 'danger',
                      icon: 'flame'
                    }
                  : {
                      intent: 'primary',
                      icon: 'tint'
                    }
              return <Text {...(textProps as TextProps)}>{props.value}</Text>
            }
            const items = props.value.map((label: any) => ({ label: label, value: label }))
            return <Select items={items} />
          }
        }
      ],
      []
    )
  } = args
  const { data = useMemo(() => pokedex.slice(0, 7), []) } = args
  const { bpTableProps = { bordered: true, condensed: true, striped: true } } = args
  const argsCopy = omit(args, ['bpTableProps', 'columns', 'data'])
  return <Table bpTableProps={bpTableProps} columns={columns} data={data} {...argsCopy} />
}
export const WithCustomRowRenderer: Story<TableProps<any>> = args => {
  function renderCell(
    cell: Cell<{ tier: string; service: string }>,
    index: number,
    setChecked: { (): void; (): void }
  ) {
    if (index === 0) {
      return <input type="checkbox" onClick={() => setChecked()} />
    }
    if (index == 1) {
      return cell.value
    }

    return (
      <Select
        items={[
          { value: 'service1_uuid', label: 'service1' },
          { value: 'service1_uuid', label: 'service2' }
        ]}
      />
    )
  }

  function CustomRow(props: Row<{ tier: string; service: string }>) {
    const { cells, ...otherProps } = props
    const [isChecked, setChecked] = useState(false)

    return (
      <tr {...otherProps} style={{ backgroundColor: isChecked ? 'var(--blue-700)' : '' }}>
        {cells.map((cell, index) => {
          const { key: cellKey, ...otherCellProps } = cell.getCellProps()
          return (
            <td key={cellKey} {...otherCellProps}>
              {renderCell(cell, index, () => setChecked(!isChecked))}
            </td>
          )
        })}
      </tr>
    )
  }

  const {
    columns = useMemo(
      () => [
        {
          // eslint-disable-next-line react/display-name
          Header: () => {
            return <input type="checkbox" />
          },
          accessor: 'tierSelected'
        },
        {
          Header: 'Tier',
          accessor: 'tier'
        },
        {
          Header: 'Service',
          accessor: 'service'
        }
      ],
      []
    )
  } = args
  const {
    data = useMemo(
      () => [
        { tier: 'Tier1', service: '' },
        { tier: 'Tier2', service: '' },
        { tier: 'Tier3', service: '' },
        { tier: 'Tier4', service: '' },
        { tier: 'Tier5', service: '' },
        { tier: 'Tier6', service: '' }
      ],
      []
    )
  } = args
  const { bpTableProps = { bordered: true, condensed: true, striped: true } } = args
  const argsCopy = omit(args, ['bpTableProps', 'columns', 'data'])
  return (
    <Table
      columns={columns}
      bpTableProps={bpTableProps}
      data={data}
      renderCustomRow={row => <CustomRow {...row} />}
      {...argsCopy}
    />
  )
}
