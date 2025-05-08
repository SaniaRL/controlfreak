import { EventData } from '../../../types/data/EventData'
import { UpdatePayload } from '../../../types/data/UpdatePayload'
import StandardButton from '../../../shared/StandardButton'

import '../ActivityFeed.css'

export default function EventItem({event, onDataChange, enableEditMode}
	: {event: EventData, 
		onDataChange: (updates?: UpdatePayload) => void,
		enableEditMode: (id?: number) => void
	}) {

	function deleteEvent(){
		onDataChange?.({
			type: 'events',
			CRUD: 'DELETE',
			id: event.id,
			updates: {id: event.id}
		})
	}

	const formattedDates = (() => {
		if (event.allDay) {
			return <>{new Date(event.start).toLocaleDateString("sv-SE")}</>
		}
	
		const startDate = new Date(event.start)
		const startTime = startDate.getMinutes() === 0
			? startDate.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })
			: startDate.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })
		const startStr = startDate.toLocaleDateString("sv-SE")
	
		let endTime = ''
		let endStr = ''
	
		if (event.end) {
			const endDate = new Date(event.end)
			endTime = endDate.getMinutes() === 0 
				? endDate.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })
				: endDate.toLocaleTimeString("sv-SE", { hour: '2-digit', minute: '2-digit' })
			endStr = endDate.toLocaleDateString("sv-SE")
		}
	
		if (event.end && startDate.toDateString() === new Date(event.end).toDateString()) {
			return (
				<>
					{startTime} <span>&nbsp;-&nbsp;</span> {endTime} {startStr}
				</>
			)
		}
	
		return (
			<>
				{startStr} {startTime} <span>&nbsp;-&nbsp;</span> {endStr} {endTime}
			</>
		)
	})()
		
	return(
		<div className='event-item'>
			<div className='event-item-head'>
				<div className='event-title'>{event.title}</div>
				<div className='dates'>
					{formattedDates}
				</div>
				<div className='event-item-btns'>
					<StandardButton
							props= {{
								key: event.id,
								id: event.id,
								buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, variant: 'light', className: 'edit-post-button'},
								onClick: () => enableEditMode(event.id) }}/>
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