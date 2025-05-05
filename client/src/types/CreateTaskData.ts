export interface CreateTaskData {
    title: string,
    deadline: Date | null,
    rrule: string | undefined
}