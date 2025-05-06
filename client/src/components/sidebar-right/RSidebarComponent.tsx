import { TaskData } from '../../types/TaskData'
import { UpdatePayLoad } from '../../types/UpdatePayload'

import TaskList from './tasklist/Tasklist'

function RSidebarComponent( { tasks, onDataChange }
	: { tasks: TaskData[], onDataChange: (updates?: UpdatePayLoad) => void } ) {
			
	return(
		<div className="sidebar sidebar-right bg-body-tertiary">
			<TaskList tasks={tasks} onDataChange={onDataChange}/>
		</div>
	)
}

export default RSidebarComponent