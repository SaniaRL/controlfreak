import { useState } from 'react'
import { UpdatePayload } from '../../../types/data/UpdatePayload'
import { EventData } from '../../../types/data/EventData'
import EventItem from './EventItem'
import EditEventItem from './EditEventItem'


export default function ActivityList({events, onDataChange}
	: {events: EventData[], onDataChange: (updates?: UpdatePayload) => void}) {
		const [editMode, setEditMode] = useState(false)
		const [editableEvents, setEditableEvents] = useState<number[]>([])

		const addEditableEvent = (id?: number) => {
			if(id) {
				setEditableEvents(prevEditableEvents =>
					prevEditableEvents.includes(id)
						? prevEditableEvents.filter(x => x !== id)
						: [...prevEditableEvents, id]
				)	
			} else {
				console.log('addEditableEvent: no valid id')
			}
		}

	return(
		<div className='activity-container'>
			{events.map(event =>
				editableEvents.includes(event.id) || editMode
				? <EditEventItem key={event.id} event={event} disableEditMode={addEditableEvent} onDataChange={onDataChange}/>
				: <EventItem key={event.id} event={event} enableEditMode={addEditableEvent} onDataChange={onDataChange} />
			)}
		</div>
	)

}