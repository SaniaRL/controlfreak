import { useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { UpdatePayLoad } from '../../../types/UpdatePayload'

import DeleteButton from '../../../shared/DeleteButton'

import './TaskList.css'
import { TaskData } from '../../../types/TaskData'

function TaskListItem({ task, onDataChange } : { task: TaskData, onDataChange: (updates?: UpdatePayLoad) => void }) {
	const [ completed, setCompleted ] = useState(task.completed)	

	function deleteTask(){
		onDataChange?.({
			type: 'tasks',
			CRUD: 'DELETE',
			id: task.id,
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
			updates: {completed: completed},
			includePropertyInUrl: true 
		})
		//Uppdatera sig eller nåt idk
	}

	return(
		<Card className='task-item'>
			<Form.Check
			// className='checkbox'
			type='checkbox'
			checked={completed}
			onChange={completeTask}
			/> 
			<p className='host-crotesk-custom'>{task.title}</p>
			<div className='activity-item-options'>
				<DeleteButton id={Number(task.id)} onDelete={deleteTask} />
			</div>
		</Card>
	)
}

export default TaskListItem