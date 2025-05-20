import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { Frequency} from 'rrule'

import { UpdatePayload } from '../../types/data/UpdatePayload'
import { buildRRule, changeDtStart } from '../../utils/rruleUtils'
import { NewTaskPayload } from '../../types/data/NewTaskPayload'
import RRPicker from '../../shared/RRPicker/RRPicker'
import { setEndOfDay } from '../../utils/dateUtils'

import 'react-datepicker/dist/react-datepicker.css'
import './TaskList.css'

export default function CreateTask({ onDataChange }: {
  onDataChange : (updates?: UpdatePayload) => void}) {
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState<Date | null>(null)
  const [rrule, setRRule] = useState<string | undefined>(undefined)  
  const [ showRRPicker, setShowRRPicker ] = useState(false)

  useEffect(() => {
  if (deadline && rrule) {
    const updatedRRule = changeDtStart(rrule, deadline)
    setRRule(updatedRRule)
  }
  }, [deadline])

  const setDate = (date: Date | null) => {
    if(date != null) 
      setDeadline(setEndOfDay(date))
  }  

  const CreateRRule = (freq: Frequency, until: Date | null) => {
    if (!deadline) return

    const rruleString = buildRRule(deadline, freq, until)
    setRRule(rruleString)
    setShowRRPicker(false)  
  }

  function postTask() {
    const data: NewTaskPayload = {
      title: title,
      deadline: deadline,
      rrule: rrule
    }

    onDataChange?.({
      type: 'tasks',
      CRUD: 'POST',
      updates: data
    })    
  
    setTitle('')
    setDeadline(null)
    setRRule(undefined)
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
          onChange={(e) => setTitle(e.target.value)}/>

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
          className={`create-task-btn ${rrule ? 'active-rrule' : ''}`}
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
              savedState={rrule}
              onSave={(freq: Frequency, until: Date | null) => CreateRRule(freq, until)}
              onDelete={() => {
                setRRule(undefined)
                setShowRRPicker(false)
              }}
              onCancel={() => setShowRRPicker(false)} 
            />
          </div>}
    </Form>
  )
}