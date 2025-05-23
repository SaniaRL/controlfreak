import { EventData } from '../dto/EventData'
import { UpdatePayload } from '../data/UpdatePayload'

export interface EventItemProps {
    event: EventData
    onDataChange: (updates?: UpdatePayload) => void
    toggleEditMode: (id?: number) => void
    searchTerm: string
}