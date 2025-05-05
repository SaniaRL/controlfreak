import { TaskData } from '../../types/TaskData'
import { UpdatePayLoad } from '../../types/UpdatePayload'
import TaskList from './tasklist/Tasklist'

//Knapp för om avslutade ska visas
//Kanske skicka och byta namn på CalendarProps idk detta är ju chill kanske ?

function RSidebarComponent( { tasks, onDataChange }: { tasks: TaskData[], onDataChange: (updates?: UpdatePayLoad) => void } ) {
    return(
        <div className="sidebar sidebar-right bg-body-tertiary">
            <TaskList tasks={tasks} onDataChange={onDataChange}/>
        </div>
    )
}

export default RSidebarComponent