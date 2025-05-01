import { RRule } from "./RRule";

export interface TaskData {
    id: number;
    title: string;
    completed: boolean;
    completedWhen: Date;
    isStackable: boolean;
    deadline: Date | null,
    recurrenceRule?: RRule; 
}