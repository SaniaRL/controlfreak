import { RecurrenceInterval } from "../enums/RecurrenceInterval";

export interface CreateTaskData {
    description: string,
    deadline: Date | null,
    recurrence: RecurrenceInterval
}