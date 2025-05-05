import { CalendarTaskData } from './CalendarTaskData'
import { EventData } from './EventData'
import { UpdatePayLoad } from './UpdatePayload'

export interface CalendarProps {
    tasks?: CalendarTaskData[]
    events?: EventData[]
    tags?: string[]
    category?: string
    onDataChange?: (update: UpdatePayLoad) => void
}