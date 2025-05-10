import { Category } from '../data/Category'
import { EventData } from '../data/EventData'
import { TaskData } from '../data/TaskData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface ActivityfeedProps {
    tasks?: TaskData[]
    events: EventData[]
    categories: Category[]
    tags?: string[]
    onDataChange?: (update?: UpdatePayload) => void
}