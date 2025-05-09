export interface EventData {
    id: number
    title: string
    content: string
    start: Date
    end?: Date
    backgroundColor: string
    textColor: string
    allDay: boolean
    editable: boolean
    rrule?: string
    tags: string[] 
}