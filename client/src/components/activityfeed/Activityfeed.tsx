import { useEffect, useState } from 'react'

import ActivityList from './activity-list/ActivityList.tsx'
import CreateEvent from '../events/CreateEvent.tsx'
import CreateEventToggle from '../events/CreateEventToggle.tsx'
import SearchFilterPanel from './filter-components/SearchFilterPanel.tsx'

import { ActivityfeedProps } from '../../types/props/ActivityfeedProps.ts'
import { EventData } from '../../types/dto/EventData.ts'
import { SearchFilterConfig } from '../../types/config/SearchFilterConfig.ts'
import { useSearchFilter } from '../../hooks/FieldFilterConfig.tsx'

import './ActivityFeed.css'
import '../events/EventStyle.css'

const searchFilterConfig: SearchFilterConfig = {
  fieldsToSearch: [
    { key: 'title', type: 'string' },
    { key: 'content', type: 'string' },
    { key: 'tags', type: 'string[]' },
  ]
}

export default function ActivityfeedComponent(props: ActivityfeedProps) {
	// const [showPastEvents, setShowPastEvents] = useState(false)
  const [createEvent, setCreateEvent] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayEvents, setDisplayEvents] = useState<EventData[]>([])
	const filteredEvents = useSearchFilter(props.events, searchFilterConfig, searchTerm)

  const handleSearchInput = (term: string) => {
		console.log(`handleSearchInput: ${term}`)
    setSearchTerm(term)
  }

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
			<ActivityList events={filteredEvents} categories={props.categories} onDataChange={props.onDataChange}/>
		</div>
	)
}