import { useState } from 'react'

import { EventDataNullable } from '../../types/data/EventDataNullable'
import { EventTemplate } from '../../types/dto/EventTemplate'
import { TaskData } from '../../types/dto/TaskData'
import { UpdatePayload } from '../../types/data/UpdatePayload'
import PresetPanel from '../preset-panel/PresetPanel'
import StandardButton from '../../shared/StandardButton'
import TaskList from '../tasks/Tasklist'

import './RSidebarComponent.css'

export default function RSidebarComponent( { tasks, onDataChange, eventTemplates, calendarDate, createEventFromTemplate}: { 
	tasks: TaskData[] 
	onDataChange: (updates?: UpdatePayload) => void 
	eventTemplates: EventTemplate[]
	calendarDate: Date | null
	createEventFromTemplate: (event: EventDataNullable) => void
} ) {
	const [showPresetPanel, setShowPresetPanel] = useState(false)
			
	return(
		<div className='sidebar sidebar-right'>
		<StandardButton props={{
            buttonProps: { content: 'Quick', variant: 'light', className: 'show-preset-button'},
            onClick: () => setShowPresetPanel(!showPresetPanel)}} />
		{showPresetPanel &&
		<PresetPanel eventTemplates={eventTemplates} calendarDate={calendarDate} createEventFromTemplate={createEventFromTemplate}/>}               
		<TaskList tasks={tasks} onDataChange={onDataChange}/>
		</div>
	)
}
