import { Category } from './Category'

export interface EventData {
    id: string
    title: string
    content: string
    start: Date
    end?: Date
    backgroundColor: string
    textColor: string
    allDay: boolean
    editable: boolean
    category: Category
    rrule?: string
    tags: string[] 
}