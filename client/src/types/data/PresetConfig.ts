import { ButtonProps } from '../props/ButtonProps'
import { EventData } from '../dto/EventData'
import { TaskData } from '../dto/TaskData'

export interface PresetConfig {
    id: string | number
    defaultValues: TaskData | EventData
    buttonProps: ButtonProps
}