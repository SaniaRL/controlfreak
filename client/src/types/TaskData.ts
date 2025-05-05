
export interface CalendarTaskData {
    id: string
    title: string
    start: Date
    end?: Date | undefined
    completed: boolean
    completedWhen: Date | undefined
    deadline: Date | null
    isStackable: boolean
    allDay: boolean
    backgroundColor: string
    textColor: string
    rrule?: string | undefined
    tags: string[] | undefined
}