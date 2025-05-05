import { useEffect, useState } from 'react'
import { TaskData } from '../../../types/TaskData'
import TaskListItem from './TaskListItem'
import './TaskList.css'
import CreateTask from './CreateTask'
import RRPicker from '../../../shared/RRPicker'

const BASE_URL = 'https://localhost:7159';

function TaskList({ showCompletedTasks } : { showCompletedTasks: boolean }) {
  const [tasks, setTasks] = useState<TaskData[]>([])


    const fetchTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/APIv1/tasks?includeCompletedTasks=${showCompletedTasks}`)
        const tasks = (await response.json()) as TaskData[]

        setTasks(tasks)
        console.log(tasks)
      } catch (e: any) {
        console.error(e)
      }
    }; 
    
    useEffect (() => { 
      fetchTasks() 
    }, [])


  return(
    <>
      <CreateTask updateTasks={fetchTasks} />
      <div className="task-container">
      { tasks.map((task) => (    
        <TaskListItem updateTasks={fetchTasks} key={task.id} task={task} />                        
      ))}
      </div>
    </>
  )
}

export default TaskList