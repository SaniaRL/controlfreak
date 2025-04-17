import { Card, Form } from 'react-bootstrap'
import '../../App.css'
import DeleteButton from  '../../shared/deleteButton.tsx'
import UpdateButton from '../../shared/updateButton.tsx';

// import { useState } from "react";

function ActivityItem({ /*id,*/ description, isCompleted }: { /* id: number,*/ description: string; isCompleted: boolean }) {
    // const [ completed, setCompleted ] = useState(isCompleted);

    // const changeCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const newCompleted = e.target.checked;
    //     setCompleted(newCompleted);

    //     try {
    //         await fetch(`https://localhost:7159/posts/${id}/completion`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(newCompleted),
    //         });
    //     } catch (error) {
    //         console.error("Error updating task:", error);
    //     }
    // }; 


    return(
        <Card className='activity-item'>
            <Form.Check
            type='checkbox'
            checked={isCompleted}
            // onChange={changeCheckbox}
            /> 
            {/* description as p because not all have checkbox later  */}
            <p>{description}</p>
            <div className='activity-item-options'>
                <UpdateButton />
                <DeleteButton />
            </div>
        </Card>
    );
}

export default ActivityItem