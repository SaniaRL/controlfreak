
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { EventData } from "../../types/EventData"
import { useEffect, useState } from "react"

const BASE_URL = 'https://localhost:7159';

function Calendar(){
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false)
	const [events, setEvents] = useState<EventData[]>([])

	useEffect(() => {		
		console.log("in useEffect")
		const fetchData = async () => {

			setIsLoading(true)

			try{
				const response = await fetch(`${BASE_URL}/APIv1/posts/events`)
				const events = (await response.json()) as EventData[]

				setEvents(events)
				console.log(events)
			} catch (e: any) {
				setError(e)
			} finally {
				setIsLoading(false)
			}
		}
		fetchData()
	}, [])

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
			events={events}/>
		</div>
	)
}

export default Calendar