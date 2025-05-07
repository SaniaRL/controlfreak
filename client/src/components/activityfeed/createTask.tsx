import { Form, Button } from 'react-bootstrap'

function CreateTask() {

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