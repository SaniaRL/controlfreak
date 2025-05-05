import TaskListItem from './TaskListItem'
import { UpdatePayLoad } from '../../../types/UpdatePayload'

import CreateTask from './CreateTask'

import './TaskList.css'
import { CalendarTaskData } from '../../../types/TaskData'

//Inte void få response? Promise<void>?
function TaskList({ tasks, onDataChange } : { tasks: CalendarTaskData[], onDataChange: (updates?: UpdatePayLoad) => void }) {
  // const [tasks, setTasks] = useState<TaskData[]>([])
  // const [showCompletedTasks, setShowCompletedTasks] = useState(false)

  return(
    <>
      <CreateTask onDataChange={onDataChange} />
      <div className="task-container">
      { tasks.map((task) => (    
        <TaskListItem onDataChange={onDataChange} key={task.id} task={task} />                        
      ))}
      </div>
    </>
  )
}

export default TaskList