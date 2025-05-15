
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'

import { CalendarProps } from '../../types/props/CalendarProps'

import './Calendar.css'
import { useEffect, useState } from 'react'
import { EventData } from '../../types/data/EventData'

export default function Calendar({events, tasks, onDataChange}: CalendarProps) {
	const [calendarEvents, setCalendarEvents] = useState<EventData[] | undefined>([])

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

	//TODO: Click -> Öppnna event/visa event
	//Hantera rrule vid completed
	//Varna vid delete av rrule

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
	
	return(
		<div className="calendar-container">
			<FullCalendar 
			plugins={[dayGridPlugin, rrulePlugin, timeGridPlugin, interactionPlugin]}
			eventContent={renderEventContent}
			initialView="dayGridMonth"
			firstDay={1}
			height={"90vh"}
			headerToolbar={{
				start:"today, prev, next",
				center:"title",
				end:"dayGridMonth, timeGridWeek, timeGridDay"
			}}
			eventSources={[
				{ events: calendarEvents },
				{ events: tasks }
			]}
			dayMaxEvents={3}
			/>
		</div>
	)
}