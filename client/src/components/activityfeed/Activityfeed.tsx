import { useEffect, useState } from 'react'

import ActivityList from './activity-list/ActivityList.tsx'
import CreateEvent from '../events/CreateEvent.tsx'
import CreateEventToggle from '../events/CreateEventToggle.tsx'
import SearchFilterPanel from './filter-components/SearchFilterPanel.tsx'

import { ActivityfeedProps } from '../../types/props/ActivityfeedProps.ts'
import { EventData } from '../../types/dto/EventData.ts'
import { useSearchFilter } from '../../hooks/FieldFilterConfig.tsx'

import './ActivityFeed.css'
import '../events/EventStyle.css'
import { SearchFilterConfig } from '../../types/config/SearchFilterConfig.ts'


	const searchFilterConfig: SearchFilterConfig = {
  fieldsToSearch: [
    { key: 'title', type: 'string' },
    { key: 'content', type: 'string' },
  ]
}

export default function ActivityfeedComponent(props: ActivityfeedProps) {
	const [createEvent, setCreateEvent] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [displayEvents, setDisplayEvents] = useState<EventData[]>([])
	const filteredEvents = useSearchFilter(props.events, searchFilterConfig, searchTerm)

  const handleSearchInput = (term: string) => {
    setSearchTerm(term)
	}

	useEffect(() => {
		if (searchTerm !== '') {
			setDisplayEvents(filteredEvents)
			return
		}

		const now = new Date()
		const upcoming = props.events
			.filter(event => new Date(event.start) > now)
			.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

		setDisplayEvents(upcoming)
	}, [props.events, searchTerm, filteredEvents])


	useEffect(() => {
		setDisplayEvents(props.events.sort())
	}, [props.events])

	return (
		<div className='activityfeed'>
			<SearchFilterPanel onSearch={handleSearchInput}/>
			<CreateEventToggle onToggle={() => setCreateEvent(!createEvent)} />
			{ createEvent &&
				<CreateEvent categories={props.categories} onDataChange={props.onDataChange} closeOnSave={() => setCreateEvent(false)}/>
			}
			<ActivityList events={displayEvents} categories={props.categories} onDataChange={props.onDataChange}/>
		</div>
	)
}