import { Form } from 'react-bootstrap'

function CreateActivity() {
    return(
        <Form className='create-activity'>
            <Form.Group>
                <Form.Label controlId='post-description'>New Task</Form.Label>
                <Form.Control autoFocus />
            </Form.Group>
        </Form>
    );
}

export default CreateActivity