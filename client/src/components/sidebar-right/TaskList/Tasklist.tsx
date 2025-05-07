import TaskListItem from './TaskListItem'
import { UpdatePayload } from '../../../types/data/UpdatePayload'

import CreateTask from './CreateTask'

import './TaskList.css'
import { TaskData } from '../../../types/data/TaskData'
import { Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'

//Inte void få response? Promise<void>?
function TaskList({ tasks, onDataChange } 
  : { tasks: TaskData[], onDataChange: (updates?: UpdatePayload) => void }) {

  const [filteredTasks, setFilteredTasks] = useState<TaskData[]>([])
  const [showCompletedTasks, setShowCompletedTasks] = useState(false)

  useEffect(() => {
    const newFilteredTasks = showCompletedTasks
      ? tasks
      : tasks.filter((task) => !task.completed)

    setFilteredTasks(newFilteredTasks)
  }, [tasks, showCompletedTasks])

  return(
    <>
      <hr></hr>
      <CreateTask onDataChange={onDataChange} />
      <Form.Check
      className='show-completed'
      label='Show completed' 
      onChange={() => setShowCompletedTasks(!showCompletedTasks)}/>
      <div className="task-container">
      { filteredTasks.map((task) => (
        <TaskListItem onDataChange={onDataChange} key={`task-${task.id}`} task={task} />
      ))}
      </div>
    </>
  )
}

export default TaskList