import { useState } from 'react'

import EventItem from './event-item/EventItem'
import EditEventItem from './event-item/EditEventItem'
import { ActivityfeedProps } from '../../../types/props/ActivityfeedProps'

import '../ActivityFeed.css'

export default function ActivityList({events, categories, onDataChange}
	: ActivityfeedProps) {
		const [editMode, setEditMode] = useState(false)
		const [editableEvents, setEditableEvents] = useState<number[]>([])


		//TODO är det mer safe med number än string
		
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

		//TODO: setEditMode

	return(
		<div className='activity-list'>
			{events.map(event =>
				<div key={event.id} className='event-wrapper'>
					{editableEvents.includes(Number(event.id)) || editMode
						? <EditEventItem 
								key={event.id} 
								event={event} 
								categories={categories} 
								disableEditMode={addEditableEvent} 
								onDataChange={onDataChange}
							/>
						: <EventItem 
								key={event.id} 
								event={event} 
								enableEditMode={addEditableEvent} 
								onDataChange={onDataChange} 
							/>}				
				</div>
			)}
		</div>
	)

}