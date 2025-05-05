export interface TaskData {
    id: number
    title: string
    start: string
    end: string
    completed: boolean
    completedWhen: Date
    isStackable: boolean
    deadline: Date | null
    allDay: boolean
    backgroundColor: string
    textColor: string
}