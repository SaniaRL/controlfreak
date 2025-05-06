import { Card, Form } from 'react-bootstrap'

import DeleteButton from '../../../shared/DeleteButton'
import { TaskData } from '../../../types/TaskData'
import { UpdatePayLoad } from '../../../types/UpdatePayload'

import './TaskList.css'
import { useEffect } from 'react'

function TaskListItem({ task, onDataChange } : { task: TaskData, onDataChange: (updates?: UpdatePayLoad) => void }) {


	useEffect(() => {
		console.log("TaskListItem received task:", task);
	}, [task]);

	function deleteTask(){
		onDataChange?.({
			type: 'tasks',
			CRUD: 'DELETE',
			id: task.id,
			updates: {id: task.id}
		})
	}

	function completeTask(){
		onDataChange?.({
			type: 'tasks',
			CRUD: 'PUT',
			id: task.id,
			updates: {completed: !task.completed},
			includePropertyInUrl: true 
		})
	}

	return(
		<Card className='task-item'>
			<Form.Check
			type='checkbox'
			checked={task.completed}
			onChange={completeTask}/> 
			<p className='host-crotesk-custom'>{task.title}</p>
			<div className='activity-item-options'>
				<DeleteButton id={Number(task.id)} onDelete={deleteTask} />
			</div>
		</Card>
	)
}

export default TaskListItem