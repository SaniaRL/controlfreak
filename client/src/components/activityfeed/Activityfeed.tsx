import "../../App.css"
import { useEffect, useState } from 'react'

import CreateActivity from './CreateActivity.tsx'
import ActivityFilterPanel from './filter-components/ActivityFilterPanel.tsx'
import { UpdatePayload } from '../../types/data/UpdatePayload.ts'
import ActivityList from './activity-list/ActivityList.tsx'
import { EventData } from "../../types/data/EventData.ts"

export default function ActivityfeedComponent({events, onDataChange}
	: {events: EventData[], onDataChange: (updates?: UpdatePayload) => void}) {
	const [displayEvents, setDisplayEvents] = useState<EventData[]>([])

	useEffect(() => {
		setDisplayEvents(events)
	}, [events])

	const handleSearchResults = (searchTerm: string) => {
		setDisplayEvents( searchTerm !== ''
			? events.filter(event => event.title.toLowerCase().includes(searchTerm))
			: events)
	}

	return (
		<div className='activityfeed'>
			<ActivityFilterPanel onSearch={handleSearchResults}/>
			<CreateActivity />
			<ActivityList events={displayEvents} onDataChange={onDataChange}/>
		</div>
	)
}