import { NewTaskPayload } from '../types/data/NewTaskPayload'
import { UpdatePayload } from '../types/data/UpdatePayload'
import { TaskData } from '../types/dto/TaskData'
import { addExdate, addExdateAllDay } from './rruleUtils'


export const completeTaskWithRRule = (data: UpdatePayload): [UpdatePayload, UpdatePayload] => {
  const task = data.taskContext as TaskData
  const date = data.instanceDate

  if (!task || !date) throw new Error('Missing task or instanceDate in payload')

  const postPayload = createInstanceRRuleTask(task, date)
  const putPayload = excludeCompleteFromRRuleTask(task, date)

  return [postPayload, putPayload]
}

export const excludeCompleteFromRRuleTask = (task: TaskData, completedDate: Date): UpdatePayload => {
  if (!task.rrule) throw new Error('Task has no rrule')

  console.log('task.rrule')
  console.log(task.rrule)

  const updatedRrule = addExdateAllDay(task.rrule, completedDate);
  console.log('updatedRrule')

  console.log(updatedRrule)
 return {
    type: 'tasks',
    CRUD: 'PUT',
    id: task.id,
    updates: {
      rrule: updatedRrule
    },
    includePropertyInUrl: true
  }
}

export const createInstanceRRuleTask = (task: TaskData, instanceDate: Date): UpdatePayload => {
    const instanceTask: NewTaskPayload = {
      title: task.title,
      rrule: undefined,
      completed: true,
      deadline: instanceDate
  }

  console.log('instanceTask')
  console.log(instanceTask)

  return {
    type: 'tasks',
    CRUD: 'POST',
    includePropertyInUrl: false,
    updates: instanceTask
  }

}