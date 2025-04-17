import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

function CreateActivity() {
  const [ description, setDescription ] = useState('');

  const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log(description);

    try {
        await fetch(`https://localhost:7159/posts/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(description),
        });
      } catch (error) {
        console.error("Error creating new post:", error);
      }
    };

  return(
    <div className='create-activity'>
      <Form onSubmit={createNewPost}>
        <Form.Label>New Task</Form.Label>
        <Form.Group className="d-flex gap-2 align-items-end">
          <Form.Control
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            autoFocus />
          <Button 
            variant="primary" 
            type="submit">
            Add
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CreateActivity