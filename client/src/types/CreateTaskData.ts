import { RecurrenceInterval } from "../enums/recurrenceInterval"

export interface CreateTaskData {
    description: string,
    deadline: Date | null,
    recurrence: RecurrenceInterval
}