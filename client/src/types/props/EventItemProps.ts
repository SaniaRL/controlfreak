import { Category } from '../data/Category'
import { EventData } from '../data/EventData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface EventItemProps {
    event: EventData
    categories: Category[]
    onDataChange: (updates?: UpdatePayload) => void
    disableEditMode: (id?: number) => void
}