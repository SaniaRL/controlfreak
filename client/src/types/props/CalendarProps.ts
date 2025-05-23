import { Category } from '../dto/Category'
import { EventData } from '../dto/EventData'
import { TaskData } from '../dto/TaskData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface CalendarProps {
    tasks?: TaskData[]
    events?: EventData[]
    categories: Category[]
    tags?: string[]
    onDataChange?: (update?: UpdatePayload) => void
    handleDateClick: (date: Date) => void
}