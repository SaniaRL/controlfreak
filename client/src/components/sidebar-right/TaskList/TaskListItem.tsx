import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { TaskData } from '../../../types/TaskDataOLD'
import { UpdatePayLoad } from '../../../types/UpdatePayload'

import DeleteButton from '../../../shared/DeleteButton'

import './TaskList.css'
import { CalendarTaskData } from '../../../types/TaskData'

function TaskListItem({ task, onDataChange } : { task: CalendarTaskData, onDataChange: (updates?: UpdatePayLoad) => void }) {
	const [ completed, setCompleted ] = useState(task.completed);		

	function deleteTask(){
		onDataChange?.({
			type: 'tasks',
			CRUD: 'DELETE',
			updates: {id: task.id}
		})
		//Uppdatera sig eller nåt idk
	}

	function completeTask(){
		setCompleted(!completed)
		onDataChange?.({
			type: 'tasks',
			CRUD: 'PUT',
			id: task.id,
			updates: {completed: completed}
		})
		//Uppdatera sig eller nåt idk
	}

	return(
		<Card className='task-item'>
			<Form.Check
			type='checkbox'
			checked={completed}
			onChange={completeTask}
			/> 
			<p>{task.title}</p>
			<div className='activity-item-options'>
					{/* <UpdateButton /> */}
					<DeleteButton id={Number(task.id)} onDelete={deleteTask} />
			</div>
		</Card>
	)
}

export default TaskListItem