import { TaskData } from '../types/dto/TaskData'
import { EventTemplate } from '../types/dto/EventTemplate'
import { EventDataNullable } from '../types/data/EventDataNullable'
import { defaultEvent } from '../constants/defaults'


export const mapTasks = (tasks: TaskData[]): TaskData[] => {
  return tasks.map(task => {
    const start = task.completedWhen
      ? task.completedWhen 
      : task.deadline 
        ? task.deadline
        : new Date()
    return {
      ...task,
      start: start,
    }
  })
}

export const mapEventTemplateToNullableEvent = (template: EventTemplate, calendarDate: Date | null): EventDataNullable => {
  const defaultEventValues = defaultEvent()
  const date = calendarDate ? calendarDate : new Date()

  const start: Date | undefined = template.startTime 
    ? addTimeToDates(date, new Date(template.startTime)) 
    : defaultEventValues.start
      ? addTimeToDates(date, defaultEventValues.start)
      : date
  
  const end = template.endTime 
    ? addTimeToDates(date, new Date(template.endTime)) 
    : defaultEventValues.end 
      ? addTimeToDates(date, defaultEventValues.end) 
      : undefined
    
return {  
  title: template.title ?? defaultEventValues.title,
  content: template.content ?? defaultEventValues.content,
  start: start,
  end: end,
  backgroundColor: template.category?.backgroundColor,
  textColor: template.category?.textColor,
  allDay: template.allDay ?? defaultEventValues.allDay,
  editable: true,
  category: template.category,
  rrule: template.rRule,
  tags: template.tags ?? defaultEventValues.tags
}}

const addTimeToDates = (date: Date, time: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), time.getSeconds())
}
