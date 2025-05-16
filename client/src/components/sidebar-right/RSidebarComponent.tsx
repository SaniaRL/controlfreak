import { useState } from 'react'

import { TaskData } from '../../types/dto/TaskData'
import { UpdatePayload } from '../../types/data/UpdatePayload'
import PresetPanel from './preset-panel/PresetPanel'
import TaskList from './tasklist/Tasklist'
import StandardButton from '../../shared/StandardButton'

import './RSidebarComponent.css'

function RSidebarComponent( { tasks, onDataChange }
	: { tasks: TaskData[], onDataChange: (updates?: UpdatePayload) => void } ) {
	const [showPresetPanel, setShowPresetPanel] = useState(false)
			
	return(
		<div className='sidebar sidebar-right'>
		<StandardButton props={{
            buttonProps: { content: 'Quick', variant: 'light', className: 'show-preset-button'},
            onClick: () => setShowPresetPanel(!showPresetPanel)}} />
		{showPresetPanel &&
		<PresetPanel />}               
		<TaskList tasks={tasks} onDataChange={onDataChange}/>
		</div>
	)
}

export default RSidebarComponent