import { useEffect, useState } from 'react'

import ActivityList from './ActivityList.tsx'
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
	const [showPastEvents, setShowPastEvents] = useState(false)
	const [editMode, setEditMode] = useState(false)
  const [createEvent, setCreateEvent] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayEvents, setDisplayEvents] = useState<EventData[]>([])
	const filteredEvents = useSearchFilter(props.events, searchFilterConfig, searchTerm)

  const handleSearchInput = (term: string) => {
		console.log(`handleSearchInput: ${term}`)
    setSearchTerm(term)
  }

	useEffect(() => {
	  setDisplayEvents(filterAndSortEvents(filteredEvents, showPastEvents))
	}, [filteredEvents, showPastEvents])

	const filterAndSortEvents = (events: EventData[], showPastEvents: boolean): EventData[] => {
		return events
			.filter(e => showPastEvents || new Date(e.end ?? new Date(new Date(e.start).setHours(23,59,59,999))) >= new Date())
			.slice().sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
	}

	return (
		<div className='activityfeed'>
			<SearchFilterPanel 
				onSearch={handleSearchInput}
				showPastEvents={showPastEvents}
        setShowPastEvents={setShowPastEvents} 
        editMode={editMode} 
        setEditMode={setEditMode} 
			/>
			<CreateEventToggle onToggle={() => setCreateEvent(!createEvent)} />
			{ createEvent &&
				<CreateEvent categories={props.categories} onDataChange={props.onDataChange} closeOnSave={() => setCreateEvent(false)}/>
			}
			<ActivityList searchTerm={searchTerm} events={displayEvents} categories={props.categories} onDataChange={props.onDataChange}/>
		</div>
	)
}