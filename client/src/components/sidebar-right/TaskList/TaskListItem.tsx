import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { TaskData } from '../../../types/TaskData'
import UpdateButton from '../../../shared/updateButton'
import DeleteButton from '../../../shared/DeleteButton'
import './TaskList.css'

function TaskListItem({ task, updateTasks } : { task: TaskData, updateTasks: () => void }) {
		const [ completed, setCompleted ] = useState(task.completed);
	
		const changeCheckbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
	
			const newCompleted = e.target.checked;
			setCompleted(newCompleted);
	
			try {
				await fetch(`https://localhost:7159/APIv1/tasks/${task.id}/complete`, {
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
				await fetch(`https://localhost:7159/APIv1/tasks/${id}/delete`, {
					method: 'DELETE',
				});
				updateTasks()
			} catch (error) {
				console.error('Error deleting task:', error);
			}
		}; 
	
	return(
		<Card className='task-item'>
			<Form.Check
			type='checkbox'
			checked={completed}
			onChange={changeCheckbox}
			/> 
			<p>{task.title}</p>
			<div className='activity-item-options'>
					{/* <UpdateButton /> */}
					<DeleteButton id={Number(task.id)} onDelete={deletePost} />
			</div>
		</Card>
	)
}

export default TaskListItem