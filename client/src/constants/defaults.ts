import { Category } from '../types/data/Category'
import { EventData } from '../types/data/EventData'

export const defaultCategory: Category = {
  name: 'text', 
  backgroundColor: '#ffffff',
  textColor: '#000000'
}

export const defaultEvent: EventData = {
  id: '',
  title: '',
  content: '',
  start: new Date(),
  backgroundColor: '',
  textColor: '#000000',
  allDay: false,
  editable: false,
  category: defaultCategory,
  tags: []
}
