import { RecurrenceInterval } from "../enums/recurrenceInterval"

export interface CreateTaskData {
    title: string,
    deadline: Date | null,
    recurrence: RecurrenceInterval
}