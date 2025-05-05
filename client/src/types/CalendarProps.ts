import { TaskData } from './TaskData'
import { EventData } from './EventData'
import { UpdatePayLoad } from './UpdatePayload'

export interface CalendarProps {
    tasks?: TaskData[]
    events?: EventData[]
    tags?: string[]
    category?: string
    onDataChange?: (update: UpdatePayLoad) => void
}