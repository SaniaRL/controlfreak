import { Category } from '../data/Category'
import { UpdatePayload } from '../data/UpdatePayload'

export interface CreateEventProps {
  categories: Category[]
  onDataChange: (updates?: UpdatePayload) => void  
}