import { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { Frequency, RRule } from 'rrule'

import { UpdatePayload } from '../../../types/data/UpdatePayload'
import DatePicker from 'react-datepicker'
import RRPicker from '../../../shared/RRPicker/RRPicker'

import 'react-datepicker/dist/react-datepicker.css'
import './TaskList.css'

export default function CreateTask({ onDataChange }: {onDataChange : (updates?: UpdatePayload) => void}) {
  const [ title, setDescription ] = useState('')
  const [ deadline, setDeadline ] = useState<Date | null>(null)
  const [ recurrence, setRecurrence ] = useState<string | undefined>(undefined)
  const [ showRRPicker, setShowRRPicker ] = useState(false)

  const setDate = (date: Date | null) => {
    if(date != null) {
      date.setHours(23, 59, 59, 999)
    }
    setDeadline(date)
    console.log(deadline)
  }  

  const CreateRRule = (freq: Frequency, until: Date | null) => {
    if (!deadline) return

    const rule = new RRule({
      dtstart: deadline,
      freq: freq,
      until: until ?? undefined,
    })

    const rruleString = rule.toString()
    setRecurrence(rruleString)
    setShowRRPicker(false)
  }

  function postTask() {
    const data = {
      title: title,
      deadline: deadline,
      rrule: recurrence
    }

    onDataChange?.({
      type: 'tasks',
      CRUD: 'POST',
      updates: data
    })   
    
    //egentligen ska den sen bara rensan om post går bra annars kanske feedback med röd border idk i nuläget men ska fixa sen
    setDescription('')
    setDeadline(null)
    setRecurrence(undefined)
  }

  return(
    <Form onSubmit={(e) => {
      e.preventDefault()
      postTask()
      }}>
      <InputGroup className='task-input-group'>
        <span className='task-input-area'>

          <FormControl 
          className='task-input'
          type='text'
          value={title}
          onChange={(e) => setDescription(e.target.value)}/>

          <DatePicker
          selected={deadline}
          onChange={(date: Date | null) => setDate(date)}
          dateFormat='yyyy/MM/dd'
          showTimeSelect={false}
          popperPlacement='bottom-start'
          customInput={
            <Button className={`create-task-btn ${deadline ? 'active-deadline' : ''}`}>
                <img src='/icons/skull.png' alt='deadline skull icon' />
            </Button>
            }
          />

          <Button 
          className={`create-task-btn ${recurrence ? 'active-rrule' : ''}`}
          variant='outline-secondary' 
          onClick={() => setShowRRPicker(!showRRPicker)}>
            <img src='/icons/recurrence_icon.png' alt='recurrence picker icon' />            
          </Button>
        </span>

      </InputGroup>

      {deadline && showRRPicker &&
          <div 
          className='rr-picker-container'>
            <RRPicker 
              savedState={recurrence}
              onSave={(freq: Frequency, until: Date | null) => CreateRRule(freq, until)}
              onDelete={() => {
                setRecurrence(undefined)
                setShowRRPicker(false)
              }}
              onCancel={() => setShowRRPicker(false)} 
            />
          </div>}
    </Form>
  )
}