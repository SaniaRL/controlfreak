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
		
	const [mappedEvents, setMappedEvents] = useState<EventData[] | undefined>([])
	const [mappedTasks, setMappedTasks] = useState<TaskData[] | undefined>([])

	const [clickedElement, setClickedElement] = useState<HTMLElement | null>(null)

	useEffect(() => {
		const mappedEvents = events?.map(event => ({
			...event,
			textColor: event.category.textColor,
			backgroundColor: event.category.backgroundColor
		}))
		setMappedEvents(mappedEvents)
	}, [events])

	useEffect(() => {
		console.log(tasks)
		const mappedTasks = tasks?.map(task => ({
			...task,
			fullTask: task
		}))
		console.log(mappedTasks)

		setMappedTasks(mappedTasks)
	}, [tasks])

	const renderEventContent = (eventInfo : any) => {
		const event = eventInfo.event	
		if(event.extendedProps.completed !== undefined) {
			return(
				<div className='event-content'>
					<span>{event.title}</span>
					<input 
						className='calendar-completed-checkbox'
						type='checkbox'
						checked={event.extendedProps.completed}
						onChange={() => {console.log(eventInfo.event.start); onDataChange?.({	
							type: 'tasks',
							CRUD: 'PUT',
							id: event.id,
							updates: {completed: !event.extendedProps.completed},							
							includePropertyInUrl: true,
							taskContext: event.extendedProps.fullTask,
							instanceDate: eventInfo.event.start,
						})}}
					/>
		  </div>
			)
		}
		return <span>{event.title}</span>
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
				timeZone='UTC'
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
					{ events: mappedEvents },
					{ events: mappedTasks }
				]}
				dateClick={onDateClick}
				dayMaxEvents={3}
			/>
		</div>
	)
}