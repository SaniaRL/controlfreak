import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { EventData } from '../../../../types/data/EventData'
import { UpdatePayload } from '../../../../types/data/UpdatePayload'

import CategoryDisplay from '../../misc/category-ui/CategoryDisplay'
import DateDisplay from '../../misc/date-ui/DateDisplay'
import StandardButton from '../../../../shared/StandardButton'
import TagDisplay from '../../misc/tag-ui/TagDisplay'

import './EventItem.css'

export default function EventItem({event, onDataChange, enableEditMode}
	: {event: EventData, 
		onDataChange: (updates?: UpdatePayload) => void,
		enableEditMode: (id?: number) => void
	}) {
	const[canExpand, setCanExpand] = useState(false)
	const[expanded, setExpanded] = useState(false)

	const contentRef = useRef<HTMLDivElement | null>(null)

		useLayoutEffect(() => {
				if (contentRef.current) {
					const hasOverflow = contentRef.current.scrollHeight > contentRef.current.clientHeight
					if (hasOverflow !== canExpand) {
						setCanExpand(hasOverflow);
					}
				}
			}, [])

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
							buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, variant: 'light', className: 'edit-event-button'},
							onClick: () => enableEditMode(Number(event.id)) }}/>
					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { content: {src: '/icons/bin_black.png', alt: 'garbage bin delete button'}, variant: 'light', className: 'edit-event-button'},
							onClick: deleteEvent }}/>
				</div>
			</div>

			<div 
				className={canExpand
					? expanded
						? 'event-item-body expanded' 
						: 'event-item-body expandable'
					: 'event-item-body'} 
				ref={contentRef}
				onClick={canExpand ? () => setExpanded(!expanded) : () => {}}>
				<p>{event.content}</p>
			</div>

			<div className='event-item-footer'>
				<CategoryDisplay category={event.category}/>
				{event.tags && <TagDisplay tags={event.tags} />}
			</div>
		</div>
	)
}