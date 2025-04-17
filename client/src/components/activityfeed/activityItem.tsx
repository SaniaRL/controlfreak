import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import '../../App.css'
import DeleteButton from  '../../shared/deleteButton.tsx'
import UpdateButton from '../../shared/updateButton.tsx'

function ActivityItem({ id, description, isCompleted }: { id: number, description: string; isCompleted: boolean }) {
    const [ completed, setCompleted ] = useState(isCompleted);

    const changeCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {

        const newCompleted = e.target.checked;
        setCompleted(newCompleted);

        try {
            await fetch(`https://localhost:7159/posts/${id}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCompleted),
            });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }; 

    const deletePost = async (id: number) => {

        try {
            await fetch(`https://localhost:7159/posts/${id}/delete`, {
                method: 'DELETE',
            });
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }; 

    return(
        <Card className='activity-item'>
            <Form.Check
            type='checkbox'
            checked={completed}
            onChange={changeCheckbox}
            /> 
            {/* description as p because not all have checkbox later  */}
            <p>{description}</p>
            <div className='activity-item-options'>
                <UpdateButton />
                <DeleteButton id={id} onDelete={deletePost} />
            </div>
        </Card>
    );
}

export default ActivityItem