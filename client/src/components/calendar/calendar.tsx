
import "./calendar.css"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventData } from "../../types/EventData"
import { useEffect, useState } from "react"
import { CalendarTaskData } from "../../types/CalendarTaskData"

const BASE_URL = 'https://localhost:7159';

function Calendar(){
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false)
	const [events, setEvents] = useState<EventData[]>([])
	const [tasks, setTasks] = useState<CalendarTaskData[]>([])
	const [combined, setCombined] = useState<(EventData | CalendarTaskData)[]>([])


	useEffect(() => {		
		console.log("in useEffect")
		const fetchData = async () => {

			setIsLoading(true)

			try{
				const eventResponse = await fetch(`${BASE_URL}/APIv1/events/calendar`)
				const events = (await eventResponse.json()) as EventData[]

				setEvents(events)
				console.log(events)

				const taskResponse = await fetch(`${BASE_URL}/APIv1/tasks/calendar`)
				const tasks = (await taskResponse.json()) as CalendarTaskData[]

				setTasks(mapTasks(tasks))
				console.log(tasks)

				setCombined([...events, ...tasks])

			} catch (e: any) {
				setError(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

	function mapTasks(tasks: CalendarTaskData[]): CalendarTaskData[] {
		return tasks.map(task => ({
			...task,
			start: task.start ?? new Date().toISOString()
		}));	
	}

	return(
		<div className="calendar-container">
			<FullCalendar 
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			initialView="dayGridMonth"
			firstDay={1}
			height={"90vh"}
			aspectRatio={1.5}
			headerToolbar={{
				start:"today, prev, next",
				center:"title",
				end:"dayGridMonth, timeGridWeek, timeGridDay"
			}}
			eventSources={[
				{ events: events },
				{ events: tasks }
			]}
			/>
		</div>
	)
}

export default Calendar