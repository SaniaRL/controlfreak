import { Form } from 'react-bootstrap'
import DateTimePicker from 'react-flatpickr'

import { DatePickerProps } from '../../types/props/DatePickerProps'

import './DateDisplay.css'
import 'flatpickr/dist/flatpickr.min.css'

export default function DatePicker({start, end, allDay, handleChange}: DatePickerProps) {

  const onDateChange = (name: string) => (dates: Date[]) => {
    const event = {
      target: {
        name: name,
        value: dates[0].toISOString(),
      }
    } as React.ChangeEvent<HTMLInputElement>
    handleChange(event)
  }
  
  return(
    <div className='date-picker-wrapper'>

      <DateTimePicker 
        value={start}
        required
        options={{
          enableTime: true,
          time_24hr: true,
          dateFormat: 'Y-m-d H:i',
          maxDate: end
        }}
        onChange={onDateChange('start')}/>

      { !allDay 
      ? <DateTimePicker 
          value={end}
          required={false}
          placeholder='----------'
          options={{
            enableTime: true,
            time_24hr: true,
            dateFormat: 'Y-m-d H:i',
            minDate: start,
          }}
          onChange={onDateChange('end')}/>
      : <div></div>
      }

      <div className='allDay-input'>
        <Form.Check
          name='allDay' 
          type='checkbox' 
          checked={allDay || end === null || end === undefined}
          onChange={handleChange} 
        />
        <Form.Label>All day</Form.Label>
      </div>
    </div>
   )
}