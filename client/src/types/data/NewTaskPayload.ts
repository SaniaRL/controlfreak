export interface NewTaskPayload {
    title: string,
    deadline: Date | null,
    rrule: string | undefined
}