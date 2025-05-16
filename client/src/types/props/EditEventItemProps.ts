import { Category } from '../dto/Category'
import { EventData } from '../dto/EventData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface EditEventItemProps {
    event: EventData
    categories: Category[] //Optonal för samma props till EditEventItem
    onDataChange: (updates?: UpdatePayload) => void
    toggleEditMode: (id?: number) => void
    // searchTerm: string
}