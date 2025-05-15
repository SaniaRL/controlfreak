import { EventData } from '../types/data/EventData'
import { defaultCategory } from './defaults'

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