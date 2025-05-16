import { useLayoutEffect, useRef, useState } from 'react'
import { Collapse } from 'react-bootstrap'

import CategoryDisplay from '../../shared/category-ui/CategoryDisplay'
import DateDisplay from '../../shared/date-ui/DateDisplay'
import { EventItemProps } from '../../types/props/EventItemProps'
import StandardButton from '../../shared/StandardButton'
import TagDisplay from '../../shared/tag-ui/TagDisplay'
import highlightMatch from '../../utils/highlight'

import './EventStyle.css'

export default function EventItem({event, onDataChange, toggleEditMode, searchTerm}
	: EventItemProps) {
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
				<div className='event-title'>{highlightMatch(event.title, searchTerm)}</div>
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
							buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, className: 'edit-event-button'},
							onClick: () => toggleEditMode(Number(event.id)) }}/>
					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { content: {src: '/icons/bin_black.png', alt: 'garbage bin delete button'}, className: 'edit-event-button'},
							onClick: deleteEvent }}/>
				</div>
			</div>

			<div>
				<Collapse in={event.content !== ''}>
					<div 
						className={canExpand
							? expanded
								? 'event-item-body expanded' 
								: 'event-item-body expandable'
							: 'event-item-body'} 
						ref={contentRef}
						onClick={canExpand ? () => setExpanded(!expanded) : () => {}}>
						<p>{event.content ? highlightMatch(event.content, searchTerm) : ''}</p>
					</div>			
				</Collapse>
			</div>

			<div className='event-item-footer'>
				<CategoryDisplay category={event.category}/>
				<TagDisplay tags={event.tags} />
			</div>
		</div>
	)
}