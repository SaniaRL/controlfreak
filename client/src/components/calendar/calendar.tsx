import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'

import { CalendarProps } from '../../types/props/CalendarProps'
import { EventData } from '../../types/dto/EventData'
import { TaskData } from '../../types/dto/TaskData'

import './Calendar.css'

export default function Calendar({events, tasks, onDataChange, handleDateClick}: CalendarProps ) {
		
	const [calendarEvents, setCalendarEvents] = useState<EventData[] | TaskData[] | undefined>([])
	const [clickedElement, setClickedElement] = useState<HTMLElement | null>(null)

	useEffect(() => {
		const mappedEvents = events?.map(event => {
			return {
				...event,
				textColor: event.category.textColor,
				backgroundColor: event.category.backgroundColor
			}
		})
		setCalendarEvents(mappedEvents)
	}, [events])

	//RRule

	const renderEventContent = (eventInfo : any) => {
		const entry = eventInfo.event

		if(entry.extendedProps.completed !== undefined) {
			return(
				<div className='event-content'>
					<span>{entry.title}</span>
					<input 
						className='calendar-completed-checkbox'
						type='checkbox'
						checked={entry.extendedProps.completed}
						onChange={() => onDataChange?.({
							type: 'tasks',
							CRUD: 'PUT',
							id: entry.id,
							updates: { completed: !entry.extendedProps.completed },
							includePropertyInUrl: true,
						})}
					/>
		  </div>
			)
		}
		return <span>{entry.title}</span>
	}

	const onDateClick = (arg: DateClickArg) => {
		if(clickedElement)
			clickedElement.classList.remove('clicked-element')
		arg.dayEl.classList.add('clicked-element')
		setClickedElement(arg.dayEl)
		handleDateClick(arg.date)
	}
	
	return(
		<div className='calendar-container'>
			<FullCalendar 
			plugins={[dayGridPlugin, rrulePlugin, timeGridPlugin, interactionPlugin]}
			eventContent={renderEventContent}
			initialView='dayGridMonth'
			firstDay={1}
			height='calc(100vh - 80px)'
			headerToolbar={{
				start:'today, prev, next',
				center:'title',
				end:'dayGridMonth, timeGridWeek, timeGridDay'
			}}
			eventSources={[
				{ events: calendarEvents },
				{ events: tasks }
			]}
			dateClick={onDateClick}
			dayMaxEvents={3}
			/>
		</div>
	)
}