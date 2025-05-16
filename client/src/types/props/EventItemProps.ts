import { Category } from '../dto/Category'
import { EventData } from '../dto/EventData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface EventItemProps {
    event: EventData
    categories: Category[]
    onDataChange: (updates?: UpdatePayload) => void
    disableEditMode: (id?: number) => void
}