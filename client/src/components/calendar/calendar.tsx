
import './Calendar.css'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import { CalendarProps } from '../../types/props/CalendarProps'


function Calendar({events, tasks, onDataChange}: CalendarProps) {

	const renderEventContent = (eventInfo : any) => {
		const entry = eventInfo.event;

		if(entry.extendedProps.completed !== undefined) {
			return(
				<div className="event-content">
					<span>{entry.title}</span>
					<input 
						className="calendar-completed-checkbox"
						type="checkbox"
						checked={entry.extendedProps.completed}
						onChange={() => onDataChange?.({
							type: 'tasks',
							CRUD: 'PUT',
							id: entry.id,
							updates: { completed: !entry.extendedProps.completed }
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
				{ events: events },
				{ events: tasks }
			]}
			dayMaxEvents={3}
			/>
		</div>
	)
}

export default Calendar