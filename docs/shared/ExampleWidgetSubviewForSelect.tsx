/*
 * Copyright 2020 Harness Inc. All rights reserved.
 * Use of this source code is governed by the PolyForm Shield 1.0.0 license
 * that can be found in the licenses directory at the root of this repository, also available at
 * https://polyformproject.org/wp-content/uploads/2020/06/PolyForm-Shield-1.0.0.txt.
 */

import React, { useCallback, useContext, useMemo, useState, CSSProperties } from 'react'
import { Form, Formik } from 'formik'
import { SelectOption } from '../../src/components/Select/Select'
import moment from 'moment'
import { Layout, Button, Container, SelectWithSubviewContext, SelectWithSubview } from '../static/index'
import { DateRangePicker, DateRange, IDateRangePickerProps } from '@blueprintjs/datetime'

const ExampleItems: SelectOption[] = [
  { value: new Date().getTime() - 30000, label: 'Past 30 minutes' },
  { value: new Date().getTime() - 60000, label: 'Past 1 hour' }
]

interface DatePickerSubviewProps extends IDateRangePickerProps {
  onSelectRange: (range: SelectOption, dateRange: DateRange) => void
}

const mainStyle: CSSProperties = {
  border: '1px solid var(--grey-400)',
  borderTop: 'none',
  borderBottomRightRadius: '5px',
  borderBottomLeftRadius: '5px'
}

function DatePickerSubview(props: DatePickerSubviewProps) {
  const { toggleSubview } = useContext(SelectWithSubviewContext)
  const { onSelectRange, ...bpDatePickerProps } = props
  const [selectedDateRange, setDateRange] = useState<DateRange>()
  const onCancelCallback = useCallback(
    () => () => {
      toggleSubview()
    },
    [toggleSubview]
  )
  const onSelectRangeCallback = useCallback(
    () => () => {
      if (selectedDateRange && selectedDateRange[0] && selectedDateRange[1]) {
        const [startTime, endTime] = [selectedDateRange[0].getTime(), selectedDateRange[1].getTime()]
        const val = {
          label: `From ${moment(startTime).format('MMMM Do')} - ${moment(endTime).format('MMMM Do')}`,
          value: endTime - startTime
        }
        toggleSubview(val)
        if (onSelectRange) {
          onSelectRange(val, selectedDateRange)
        }
      }
    },
    [toggleSubview, onSelectRange, selectedDateRange]
  )
  const minDate = useMemo(
    () =>
      moment()
        .subtract(30, 'days')
        .toDate(),
    []
  )
  const maxDate = useMemo(() => new Date(), [])
  return (
    <Layout.Vertical style={mainStyle}>
      <DateRangePicker
        minDate={minDate}
        maxDate={maxDate}
        singleMonthOnly={true}
        shortcuts={false}
        {...bpDatePickerProps}
        onChange={setDateRange}
      />
      <Container margin="medium" flex style={{ justifyContent: 'flex-end' }}>
        <Button onClick={onCancelCallback()} style={{ marginRight: '10px' }}>
          Cancel
        </Button>
        <Button onClick={onSelectRangeCallback()} intent="primary">
          Submit
        </Button>
      </Container>
    </Layout.Vertical>
  )
}

export default function ExampleWidgetSubviewForSelect() {
  return (
    <Formik initialValues={{ selectedDate: { label: '', value: '' } }} onSubmit={() => {}}>
      {props => (
        <Form>
          <SelectWithSubview
            value={props.values.selectedDate}
            items={ExampleItems}
            renderSubviewWithoutMenuStyling={true}
            changeViewButtonLabel="Custom Date"
            subview={
              <DatePickerSubview onSelectRange={(range: SelectOption) => props.setFieldValue('selectedDate', range)} />
            }
          />
        </Form>
      )}
    </Formik>
  )
}
