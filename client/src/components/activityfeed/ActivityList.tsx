import { useEffect, useState } from 'react'

import EventItem from '../events/EventItem'
import EditEventItem from '../events/EditEventItem'
import { ActivityListProps } from '../../types/props/ActivityListProps'

import './ActivityFeed.css'

export default function ActivityList({events, categories, onDataChange, searchTerm, editMode}: ActivityListProps) 
{
	const [editableEvents, setEditableEvents] = useState<number[]>([])

	useEffect(() => {
		if (editMode) {
			setEditableEvents(events.map(event => Number(event.id)))
		} else {
			setEditableEvents([])
		}
	}, [editMode, events])
	
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
								toggleEditMode={addEditableEvent} 
								onDataChange={onDataChange}
								globalEditMode={editMode}
							/>
						: <EventItem 
								key={event.id} 
								event={event} 
								toggleEditMode={addEditableEvent} 
								onDataChange={onDataChange}
								searchTerm={searchTerm}
							/>}				
				</div>
			)}
		</div>
	)

}