import { Card, Form } from 'react-bootstrap'

// import DeleteButton from '../../../shared/DeleteButton'
import { TaskData } from '../../../types/data/TaskData'
import { UpdatePayload } from '../../../types/data/UpdatePayload'

import './TaskList.css'
import { useEffect } from 'react'
import StandardButton from '../../../shared/StandardButton'

function TaskListItem({ task, onDataChange } : { task: TaskData, onDataChange: (updates?: UpdatePayload) => void }) {


	useEffect(() => {
		console.log("TaskListItem received task:", task);
	}, [task])

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
				{/* <DeleteButton id={Number(task.id)} onDelete={deleteTask} /> */}
				<StandardButton
				props= {{
					key: task.id,
					id: task.id,
					buttonProps: { content: {src: '/icons/bin_black.png', alt: 'garbage bin delete button'}, variant: 'light', className: 'edit-post-button'},
					onClick: deleteTask,
				}}/>
			</div>
		</Card>
	)
}

export default TaskListItem