import { EventData } from '../../../types/data/EventData'
import { UpdatePayload } from '../../../types/data/UpdatePayload'
import StandardButton from '../../../shared/StandardButton'

import '../ActivityFeed.css'

export default function EventItem({event, onDataChange}
	: {event: EventData, onDataChange: (updates?: UpdatePayload) => void}) {

	function deleteEvent(){
		onDataChange?.({
			type: 'events',
			CRUD: 'DELETE',
			id: event.id,
			updates: {id: event.id}
		})
	}

	function updateEvent(){
		onDataChange?.({
			type: 'events',
			CRUD: 'PUT',
			id: event.id,
			updates: {id: event.id}
		})
	}

	//Ev så bara header visar och resten är collapse?
	return(
		<div className='event-item'>
			<div className='event-item-head'>
				<div className='event-title'>{event.title}</div>
				<div className='dates'>
				{new Date(event.start).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
				{ event.end &&
				new Date(event.end).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
				</div>
				<div className='event-item-btns'>
					<StandardButton
							props= {{
								key: event.id,
								id: event.id,
								buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, variant: 'light', className: 'edit-post-button'},
								onClick: updateEvent }}/>
					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { content: {src: '/icons/bin_black.png', alt: 'garbage bin delete button'}, variant: 'light', className: 'edit-post-button'},
							onClick: deleteEvent }}/>
				</div>
			</div>
			<div className='event-item-body'>
				<p>{event.content}</p>
				<p>category placeholder | tags placeholder</p>
			</div>
		</div>
	)
}