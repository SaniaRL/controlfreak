import { useState } from 'react'

import { DateDisplayProps } from '../../types/props/DateDisplayProps'

import DateIconButton from './DateIconButton'
import DateDisplay from './DateDisplay'
import DatePicker from './DatePicker'

import './DateDisplay.css'
import { DatePickerProps } from '../../types/props/DatePickerProps'

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
          start={start} 
          end={end} 
          allDay={allDay} />
      }
    </div>
  )
}