import { useState } from 'react'

import DateIconButton from './DateIconButton'
import DateDisplay from './DateDisplay'
import DatePicker from './DatePicker'
import { DatePickerProps } from '../../types/props/DatePickerProps'

import './DateDisplay.css'

export default function DateToggle({start, end, allDay, handleChange}: DatePickerProps) {
  const[editMode, setEditMode] = useState(false)

  return(
    <div className='date-toggle'>
      <DateIconButton onClick={() => setEditMode(!editMode)}/>

      {editMode 
      ? <DatePicker 
          start={start} 
          end={end}
          allDay={allDay}
          handleChange={handleChange}
        />
      : <DateDisplay 
          start={start as Date} 
          end={end} 
          allDay={allDay as boolean} />
      }
    </div>
  )
}