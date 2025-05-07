import "../../App.css"
import { useState } from "react"
import CreateActivity from "./CreateActivity.tsx"
import ActivityFilterPanel from "./filter-components/ActivityFilterPanel.tsx"
import EventItem from "./EventItem.tsx"
import { EventData } from "../../types/data/EventData.ts"

export default function ActivityfeedComponent() {
	const [searchResults, setSearchResults] = useState<EventData[]>([])
	
	return (
		<div className="activityfeed">
			<ActivityFilterPanel updateSearchResults={setSearchResults}/>
			<CreateActivity />
			<div className="activity-container">
				{ searchResults.map((event) => (    
					<EventItem key={event.id} event={event} />                        
				))}
			</div>
		</div>
	);
}