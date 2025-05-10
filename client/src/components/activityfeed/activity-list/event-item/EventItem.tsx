import { EventData } from '../../../../types/data/EventData'
import { UpdatePayload } from '../../../../types/data/UpdatePayload'
import DateDisplay from '../../misc/date-ui/DateDisplay'
import CategoryDisplay from '../../misc/category-ui/CategoryDisplay'
import StandardButton from '../../../../shared/StandardButton'

import './EventItem.css'

export default function EventItem({event, onDataChange, enableEditMode}
	: {event: EventData, 
		onDataChange: (updates?: UpdatePayload) => void,
		enableEditMode: (id?: number) => void
	}) {

		//TODO: Flytta ut Dates

	function deleteEvent(){
		onDataChange?.({
			type: 'events',
			CRUD: 'DELETE',
			id: event.id,
			updates: {id: event.id}
		})
	}
		
	return(
		<div className='event-item'>
			<div className='event-item-head'>
				<div className='event-title'>{event.title}</div>
				<div className='dates'>
					<DateDisplay
						start={event.start}
						end={event.end}
						allDay={event.allDay}/>
				</div>
				<div className='event-item-btns'>
					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, variant: 'light', className: 'edit-post-button'},
							onClick: () => enableEditMode(Number(event.id)) }}/>
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
			</div>
			<div className='event-item-footer'>
				<div><CategoryDisplay category={event.category}/></div>
			</div>
		</div>
	)
}