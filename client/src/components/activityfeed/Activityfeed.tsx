import { useEffect, useState } from 'react'

import ActivityFilterPanel from './filter-components/ActivityFilterPanel.tsx'
import ActivityList from './activity-list/ActivityList.tsx'

import { ActivityfeedProps } from '../../types/props/ActivityfeedProps.ts'
import { EventData } from '../../types/data/EventData.ts'

import './ActivityFeed.css'
import CreateEvent from '../events/CreateEvent.tsx'

export default function ActivityfeedComponent(props: ActivityfeedProps) {
	const [displayEvents, setDisplayEvents] = useState<EventData[]>([])

	useEffect(() => {
		setDisplayEvents(props.events)
	}, [props.events])

	const handleSearchResults = (searchTerm: string) => {
		setDisplayEvents( searchTerm !== ''
			? props.events.filter(event => event.title.toLowerCase().includes(searchTerm))
			: props.events
		)
	}

	//TODO: Visa event på snarast kommande först ej passerade.

	return (
		<div className='activityfeed'>
			<ActivityFilterPanel onSearch={handleSearchResults}/>
			<CreateEvent categories={props.categories} onDataChange={props.onDataChange}/>
			<ActivityList events={displayEvents} categories={props.categories} onDataChange={props.onDataChange}/>
		</div>
	)
}