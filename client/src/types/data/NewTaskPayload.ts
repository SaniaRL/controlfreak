export interface NewTaskPayload {
    title: string
    deadline: Date | null
    rrule: string | undefined
    completed?: boolean
    completedWhen?: Date | undefined
    exDates?: Date[] | undefined
}