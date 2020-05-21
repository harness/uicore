import React, { useCallback, useContext, useMemo, useState } from 'react'
import { SelectWithSubviewContext } from '../SelectWithSubview'
import { DateRangePicker, DateRange, IDateRangePickerProps } from '@blueprintjs/datetime'
import css from './DatePickerSubview.css'
import { SelectOption } from '../../Select/Select'
import { Layout } from '../../../layouts/Layout'
import { Button } from '../../Button/Button'
import { Container } from '../../Container/Container'
import moment from 'moment'

export interface DatePickerSubviewProps extends IDateRangePickerProps {
  onSelectRange: (range: SelectOption, dateRange: DateRange) => void
}

export function DatePickerSubview(props: DatePickerSubviewProps) {
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
      if (selectedDateRange?.[0] && selectedDateRange?.[1]) {
        const [startTime, endTime] = [selectedDateRange[0].getTime(), selectedDateRange[1].getTime()]
        const val = {
          label: `From ${moment(startTime).format('MMMM Do')} - ${moment(endTime).format('MMMM Do')}`,
          value: endTime - startTime
        }
        toggleSubview(val)
        onSelectRange?.(val, selectedDateRange)
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
    <Layout.Vertical className={css.main}>
      <DateRangePicker
        minDate={minDate}
        maxDate={maxDate}
        singleMonthOnly={true}
        shortcuts={false}
        {...bpDatePickerProps}
        onChange={setDateRange}
      />
      <Container margin="medium" flex style={{ justifyContent: 'flex-end' }}>
        <Button onClick={onCancelCallback()} className={css.cancelButton}>
          Cancel
        </Button>
        <Button onClick={onSelectRangeCallback()} intent="primary">
          Submit
        </Button>
      </Container>
    </Layout.Vertical>
  )
}
