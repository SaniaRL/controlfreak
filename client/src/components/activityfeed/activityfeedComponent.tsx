import "../../App.css"
import { useState } from "react"
import CreateActivity from "./createActivity.tsx"
import ActivityFilterPanel from "./filter-components/ActivityFilterPanel.tsx"
import EventItem from "./eventItem.tsx"
import { CalendarEvent } from "../../types/CalendarEvent.ts"

export default function ActivityfeedComponent() {
	const [searchResults, setSearchResults] = useState<CalendarEvent[]>([])
	
	return (
		<div className="activityfeed">
			<ActivityFilterPanel updateSearchResults={setSearchResults}/>
			<CreateActivity />
			<div className="activity-container">
				{ searchResults.map((event) => (    
					<EventItem key={event.id} id={event.id} description={event.title} content={event.content} />                        
				))}
			</div>
		</div>
	);
}