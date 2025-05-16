import { Category } from '../dto/Category'
import { UpdatePayload } from '../data/UpdatePayload'

export interface CreateEventProps {
  categories: Category[]
  onDataChange: (updates?: UpdatePayload) => void
  closeOnSave: () => void
}