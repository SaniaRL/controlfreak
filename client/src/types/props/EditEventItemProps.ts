import { Category } from '../dto/Category'
import { EventData } from '../dto/EventData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface EditEventItemProps {
    event: EventData
    categories: Category[]
    onDataChange: (updates?: UpdatePayload) => void
    toggleEditMode: (id?: number) => void
    globalEditMode: boolean
}