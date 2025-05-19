import { Category } from '../dto/Category'
import { UpdatePayload } from '../data/UpdatePayload'
import { EventDataNullable } from '../data/EventDataNullable'

export interface CreateEventProps {
  categories: Category[]
  onDataChange: (updates?: UpdatePayload) => void
  closeOnSave: () => void
  eventTemplate?: EventDataNullable | null
  setCurrentEventTemplate: (template: EventDataNullable | null) => void
}