import { ButtonProps } from '../props/ButtonProps'
import { EventData } from './EventData'
import { TaskData } from './TaskData'

export interface PresetConfig {
    id: string | number
    defaultValues: TaskData | EventData
    buttonProps: ButtonProps
}