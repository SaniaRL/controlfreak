import { TaskData } from '../data/TaskData'
import { EventData } from '../data/EventData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface CalendarProps {
    tasks?: TaskData[]
    events?: EventData[]
    tags?: string[]
    category?: string
    onDataChange?: (update: UpdatePayload) => void
}