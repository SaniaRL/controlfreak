
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
        fetchTasks()  
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

  async function fetchTasks() {
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/${API}/tasks/GET`)
      const tasks = (await response.json()) as TaskData[]
  
      setTasks(mapTasks(tasks))	
    } catch(e: any) {
      console.error(e)
      setError(e)
    } finally {
      setIsLoading(false)
    }
    	//ändra kategori till kategori men då också ändra dto och mappa rätt med background och textcolor från kategorin
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

  async function onDataChange(data: UpdatePayLoad | undefined) {
    if(data === undefined) {
      //Gör nåt???
      console.log('Data is undefined')
    } else {
      setIsLoading(true)
      try {
        const response = await executeCRUD(data)
        switch(data.type) {
          case 'tasks':
            switch(data.CRUD) {
              case 'GET':
              case 'PUT':
                updateTaskState(data)
                break
              case 'POST':
                if (response?.ok) {
                  const newTask: TaskData = await response.json()
                  setTasks(prevTasks => newTask ? [...prevTasks, newTask] : prevTasks)
                } else {
                  console.log('onDataChange task POST response not ok')
                } 
              break
              case 'DELETE':
                if (response?.ok) {
                  setTasks(prevTasks => prevTasks.filter(task => task.id !== data.id))
                } else {
                  console.log('onDataChange task DELETE response not ok')
                }     
            }
            break
          case 'events':
            fetchEvents()
            break
          case 'categories': console.log('mapCRUD categories')
        }
        //Gör fler saker för andra förändringar och håll crud separat?
      } catch (e: any){
        setError(e)
      } finally {
        setIsLoading(false)
      }  
    }
  }

  //Kolla innan att response är ok
  function updateTaskState(data: UpdatePayLoad | undefined) {
    if (data) {
      switch (data.CRUD) {
        case 'GET':
          console.log('GET')
          break
        case 'PUT':
          executeCRUD({ type: data.type, CRUD: 'GET', id: data.id })
            .then(response => response?.json())
            .then(updatedTask => { 
              if (updatedTask) {
                setTasks(prevTasks => 
                  prevTasks.map(task =>
                    task.id === updatedTask.id ? updatedTask : task
                  )
                )
              }
            })
          break
        case 'POST':
          console.log('POST')
          break
        case 'DELETE':

          console.log('DELETE')
      }
    }
  }

  const executeCRUD = async (x: UpdatePayLoad) => {
    setIsLoading(true)

    const type = x.type
    const id = x.id
    const method = x.CRUD

    let property
    let value
    if(x.includePropertyInUrl) {
      property = x.updates ? Object.keys(x.updates)[0] : undefined
      value = x.updates ? Object.values(x.updates)[0] : undefined  
    } else {
      value = x.updates
    }

    const segments = [ BASE_URL, API, type, method, id, property ].filter(Boolean)

    try {
      const response = await fetch(`${segments.join('/')}`, {
        method: method,
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(value),
      }) 

      return response

      // if(response.ok) {
      //   //uppdatera allt och så
      //   console.log('mapCRUD = ok')
      // } else {
      //   console.error('mapCRUD = ')
      // }
    } catch (error: any) {
      console.error("Något gick fel i executeCRUD")
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