import { useState } from 'react'
import { Button, Dropdown, DropdownButton, Form, FormControl, InputGroup } from 'react-bootstrap'
import { CreateTaskData } from '../../../types/CreateTaskData'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './TaskList.css'

function CreateTask({updateTasks}: {updateTasks : () => void}) {
  const [ description, setDescription ] = useState('')
  const [ deadline, setDeadline ] = useState<Date | null>(null)
  const [ recurrence, setRecurrence ] = useState(0)

    const createNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(description);
  
      let data: CreateTaskData = { title: description, deadline, recurrence }
    
      try {
        await fetch(`https://localhost:7159/APIv1/tasks/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
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

  return(
    <Form onSubmit={createNewTask}>
      <InputGroup className='task-input-group'>
        <span className='task-input-area'>

          <FormControl 
          className='task-input'
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}/>

          <DropdownButton 
          className='create-task-btn'
          variant='outline-secondary' 
          title={<img src='/icons/recurrence_icon.png' 
          alt='recurrence icon dropdown' />}>
            <Dropdown.Item>Alternativ 1</Dropdown.Item>
            <Dropdown.Item>Alternativ 2</Dropdown.Item>
          </DropdownButton>

          <DatePicker
          className='date-picker'
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
        </span>
      </InputGroup>
    </Form>
  );
}

export default CreateTask
