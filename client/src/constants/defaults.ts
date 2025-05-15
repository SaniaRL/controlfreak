import { Category } from '../types/data/Category'
import { EventDataNullable } from '../types/data/EventDataNullable'

export const defaultCategoryData: Category = {
  name: 'text', 
  backgroundColor: '#ffffff',
  textColor: '#000000'
}

export const defaultEvent = (): EventDataNullable => {

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return {
    title: '',
    content: '',
    start: new Date(tomorrow.setHours(18, 0, 0, 0)),
    end: new Date(tomorrow.setHours(22, 0, 0, 0)),
    tags: [],
    allDay: false
  }
}

export const defaultCategory = (categories: Category[]): Category => {
  const defaultCategoryId = 1
  const category = categories.find(c => c.id === defaultCategoryId)
  return category!
}
