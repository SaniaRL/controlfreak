import { useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import { CreateTaskData } from '../../../types/CreateTaskData'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './TaskList.css'
import RRPicker from '../../../shared/RRPicker'
import { Frequency, RRule } from 'rrule'

function CreateTask({updateTasks}: {updateTasks : () => void}) {
  const [ description, setDescription ] = useState('')
  const [ deadline, setDeadline ] = useState<Date | null>(null)
  const [ recurrence, setRecurrence ] = useState<string | undefined>(undefined)
  const [ showRRPicker, setShowRRPicker ] = useState(false)

    const createNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(description);
  
      let data: CreateTaskData = { title: description, deadline: deadline, rrule: recurrence }
    
      try {
        await fetch(`https://localhost:7159/APIv1/tasks/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        updateTasks()
        setDescription('')
        setDeadline(null)
      } catch (error) {
          console.error("Error creating new post:", error)
      }
    };

  const setDate = (date: Date | null) => {
    if(date != null) {
      date.setHours(23, 59, 59, 999)
    }
    setDeadline(date)
  }  

  function CreateRRule(freq: Frequency, until: Date | undefined) {
    const rule: RRule = new RRule({
      dtstart: deadline ? deadline : new Date(),
      freq: freq,
      until: until
    })
    const rruleString: string = rule.toString()

    console.log(rruleString)

    setRecurrence(rruleString)
    setShowRRPicker(false)
  }

  function onCancelRRPicker() {
    setRecurrence(undefined)
    setShowRRPicker(false)
  }

  return(
    <Form onSubmit={createNewTask}>
      <InputGroup className='task-input-group'>
        <span className='task-input-area'>

          <FormControl 
          className='task-input'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}/>

          <DatePicker
          selected={deadline}
          onChange={(date: Date | null) => setDate(date)}
          dateFormat='yyyy/MM/dd'
          showTimeSelect={false}
          popperPlacement='bottom-start'
          customInput={
            <Button className={`create-task-btn ${deadline? 'active-deadline' : ''}`}>
                <img src='/icons/skull.png' alt='deadline skull icon' />
            </Button>
            }
          />

          <Button 
          className='create-task-btn'
          variant='outline-secondary' 
          onClick={() => setShowRRPicker(!showRRPicker)}
          disabled={deadline === null}>
            <img src='/icons/recurrence_icon.png' alt='recurrence picker icon' />            
          </Button>
        </span>

      </InputGroup>

      {showRRPicker && deadline !== null &&
          <div 
          className='rr-picker-container'>
            <RRPicker 
              start={deadline ? deadline : new Date()} 
              onCreateRRule={(freq: Frequency, until: Date | undefined) => CreateRRule(freq, until)}
              onAbort={() => onCancelRRPicker()} 
            />
          </div>}
    </Form>
  );
}

export default CreateTask
