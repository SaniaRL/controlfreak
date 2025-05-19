import { Category } from './Category'
import { TemplateButtonProps } from './TemplateButtonProps'

export interface EventTemplate {
  id?: number
  title?: string
  tags?: string[]
  rRule?: string
  content?: string
  start?: Date
  end?: Date
  startTime?: Date
  endTime?: Date
  allDay: boolean
  category?: Category
  buttonProps?: TemplateButtonProps
  children?: EventTemplate[]
}