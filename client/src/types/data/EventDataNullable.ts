import { Category } from '../dto/Category'

export interface EventDataNullable {
  title?: string
  content?: string
  start?: Date
  end?: Date
  backgroundColor?: string
  textColor?: string
  allDay?: boolean
  editable?: boolean
  categoryId?: number
  category?: Category
  rrule?: string
  tags?: string[] 
}