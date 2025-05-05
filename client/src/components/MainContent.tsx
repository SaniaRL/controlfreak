
import { useState, useEffect } from 'react'
import ActivityfeedComponent from './activityfeed/ActivityfeedComponent'
import Calendar from './calendar/Calendar'
import LSidebarComponent from './sidebar-left/LSidebarComponent'
import RSidebarComponent from './sidebar-right/RSidebarComponent'
import { EventData } from '../types/EventData'
import { TaskData } from '../types/TaskData'
// import { CalendarProps } from '../types/CalendarProps'
import { UpdatePayLoad } from '../types/UpdatePayload'

const BASE_URL = 'https://localhost:7159'
const API = 'APIv1'

function MainContent({ view }: { view: string }) {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<EventData[]>([])
  const [tasks, setTasks] = useState<TaskData[]>([])

  useEffect(() => {		
    const fetchData = async () => {
        fetchTasks(true)  
        fetchEvents()
    }
    fetchData()
  }, [])
  

  async function fetchEvents() {
    setIsLoading(true)
    try {
      const eventResponse = await fetch(`${BASE_URL}/APIv1/events`)
      const events = (await eventResponse.json()) as EventData[]
  
      setEvents(events)  
      console.log(events)
    } catch (e: any) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchTasks(includeCompletedTasks: boolean) {
    //Is loading borde ta nån parameter kanske beroende på vad typ en string som meddelande
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/${API}/tasks/GET?includeCompletedTasks=${includeCompletedTasks}`)
      const tasks = (await response.json()) as TaskData[]
  
      setTasks(mapTasks(tasks))	
    } catch(e: any) {
      console.error(e)
      //Denna bör också ta flera param kanske
      setError(e)
    } finally {
      setIsLoading(false)
    }
    	//ändra kategori till kategori men då också ändra dto och mappa rätt med background och textcolor från kategorin

    //Se till att ha meddelande om loading och error och shit
  }

  function mapTasks(tasks: TaskData[]): TaskData[] {
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

  function onDataChange(data: UpdatePayLoad | undefined) {
    if(data === undefined) {
      //Gör nåt???
      console.log('Data is undefined')
    } else {
      setIsLoading(true)
      try {
        mapCRUD(data)
        //Gör fler saker för andra förändringar och håll crud separat?
      } catch (e: any){
        setError(e)
      } finally {
        setIsLoading(false)
      }  
    }
  }

  const mapCRUD = async (x: UpdatePayLoad) => {
    setIsLoading(true)
    //const för att checka av dem
    const type = x.type
    const id = x.id
    const method = x.CRUD
    const property = x.updates ? Object.keys(x.updates)[0] : undefined
    const value = x.updates ? Object.values(x.updates)[0] : undefined

    const segments = [ BASE_URL, API, type, method, id, property ]
    try {
      const response = await fetch(`${segments.join('/')}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(value),
      })

      if(response.ok) {
        //uppdatera allt och så
        console.log('mapCRUD = ok')
      } else {
        console.error('mapCRUD = ')
      }
    } catch (error: any) {
      console.error("Något gick fel i try/catch")
    }
  }

  useEffect(() => {
		console.log("Updated tasks:", tasks)
	}, [tasks])


  return(
    <div className="main-content">
    <LSidebarComponent />
    { view === 'activity' ? <ActivityfeedComponent /> : <Calendar events={events} tasks={tasks} onDataChange={onDataChange}/>}
    <RSidebarComponent tasks={tasks} onDataChange={onDataChange} />
    </div>
  )
}

export default MainContent