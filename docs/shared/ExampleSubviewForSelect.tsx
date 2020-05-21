import { Form, Formik } from 'formik'
import { DatePickerSubview, SelectWithSubview } from '../static/index'
import { SelectOption } from '../../src/components/Select/Select'

const ExampleItems: SelectOption[] = [
  { value: new Date().getTime() - 30000, label: 'Past 30 minutes' },
  { value: new Date().getTime() - 60000, label: 'Past 1 hour' }
]

export default function ExampleSubviewForSelect() {
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
