import { useState } from 'react';
import { Form, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import { CreateTaskData } from '../../types/CreateTaskData';
import RecurrencePicker from '../../shared/RecurrencePicker';

function CreateTask() {
  // const [ description, setDescription ] = useState('')
  // const [ deadline, setDeadline ] = useState(null)
  // const [ recurrence, setRecurrence ] = useState(0)

  // const createNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log(description);

  //   // let data: CreateTaskData = { title: description, deadline, recurrence }
  
  //   try {
  //     await fetch(`https://localhost:7159/APIv1/tasks/new`, {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(data),
  //     });
  //   } catch (error) {
  //       console.error("Error creating new post:", error);
  //   }
  // };

  return(
    <Form 
    // onSubmit={createNewTask}
    >
    <Form.Label>New Task</Form.Label>
    <Form.Group className="d-flex gap-2 align-items-end">
      <Form.Control
        type='text'
        // value={description}
        // onChange={(e) => setDescription(e.target.value)}
        autoFocus />

        {/* <RecurrencePicker setRecurrence = {setRecurrence} /> */}

        <Button
          variant="primary"
          type="submit">
          Add
        </Button>          
      </Form.Group>
    </Form>
  );
}

export default CreateTask