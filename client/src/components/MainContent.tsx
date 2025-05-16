
import { useState, useEffect } from 'react'

import ActivityfeedComponent from './activityfeed/Activityfeed'
import Calendar from './calendar/Calendar'
import { Category } from '../types/dto/Category'
import { EventData } from '../types/dto/EventData'
import LSidebarComponent from './sidebar-left/LSidebarComponent'
import RSidebarComponent from './sidebar-right/RSidebarComponent'
import { TaskData } from '../types/dto/TaskData'
import { UpdatePayload } from '../types/data/UpdatePayload'
import { mapTasks } from '../utils/mapper'
import { updateList } from '../utils/listUtils'
import { apiEndpoint, apiValue} from '../utils/crud'

export default function MainContent({ view }: { view: string }) {
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<EventData[]>([])
  const [tasks, setTasks] = useState<TaskData[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategories, setActiveCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const categoryResponse = await executeCRUD({type:'categories', CRUD: 'GET'})
      if(categoryResponse?.ok) setCategories(await categoryResponse.json() as Category[])

      const eventResponse = await executeCRUD({type: 'events', CRUD: 'GET'})
      if(eventResponse?.ok) setEvents(await eventResponse.json() as EventData[])

      const taskResponse = await executeCRUD({type: 'tasks', CRUD: 'GET'})
      if(taskResponse?.ok) setTasks(mapTasks(await taskResponse.json() as TaskData[]))
    }
    fetchData()
  }, [])

  async function onDataChange(data: UpdatePayload | undefined) {
    console.log('IN ON DATA CHANGE!!!')
    console.log(data)
    if(data === undefined) {
      //Gör nåt???
      console.log('Data is undefined')
    } else {
      setIsLoading(true)
      try {
        const response = await executeCRUD(data)
          if(response?.ok) {
            switch(data.CRUD) {
              case 'GET':
                console.log('onDataChange: GET')
                break
              case 'PUT':
                const updatedItem = await response.json()
                switch(data.type) {
                  case 'tasks':
                    setTasks(prev =>
                      mapTasks(prev.map(task =>
                        task.id === updatedItem.id
                          ? {...task, ...updatedItem}
                          : task
                        )
                      )
                    )
                    break
                  case 'events':
                    setEvents(updateList(updatedItem, events))
                    break
                  case 'categories':
                    setCategories(updateList(updatedItem, categories))
                    setEvents(prev => prev.map(event => 
                      event.category.id === updatedItem.id 
                        ? { ...event, category: updatedItem } 
                        : event
                    )
                  )

                }
              break
              case 'POST':
                switch(data.type) {
                  case 'tasks':
                    const newTask: TaskData = await response.json()
                    setTasks(prev => newTask ? [ ...mapTasks([newTask]), ...prev ] : prev)
                    break
                  case 'events':
                    const newEvent: EventData = await response.json()
                    console.log('newEvent')
                    console.log(newEvent)
                    setEvents(prev => newEvent ? [newEvent, ...prev] : prev)
                    break
                  case 'categories':
                    const newCategory: Category = await response.json()
                    setCategories(prev => newCategory ? [newCategory, ...prev] : prev)
                  break
                }
              break
              case 'DELETE':
                if (response?.ok) {
                  switch(data.type) {
                    case 'tasks':
                      setTasks(prev => mapTasks(prev.filter(task => task.id !== data.id)))
                      break
                    case 'events':
                      setEvents(prev => prev.filter(event => event.id !== data.id))
                      break
                    case 'categories':
                      setCategories(prev => prev.filter(category => category.id !== data.id))
                  }
                } else {
                  console.log('onDataChange task POST response not ok')
                }
            }
          }
      } catch (e: any){
        setError(e)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const executeCRUD = async (x: UpdatePayload) => {
    setIsLoading(true)

    console.log('UpdatePayLoad')
    console.log(x)

    const value = apiValue(x)

    try {

       const options = x.CRUD !== 'GET'
        ? {
          method: x.CRUD,
          headers: { 'Content-Type': 'application/json' },
          body: value !== undefined ? JSON.stringify(value) : undefined,
        }
        : undefined
        
      const response = await fetch(apiEndpoint(x), options)

      return response

    } catch (error: any) {
      console.error("Något gick fel i executeCRUD")
    }
  }

  useEffect(() => {
    setActiveCategories(categories)
  }, [categories])

  const setActiveCategory = (id: number, active: boolean) => {
    setActiveCategories(active
      ? activeCategories.some(c => c.id === id)
        ? activeCategories
        : [...activeCategories, categories.find(c => c.id === id)!]
      : activeCategories.filter(c => c.id !== id)
    )
  }

  const filteredEvents = events.filter(e => 
    activeCategories.some(c => c.id === e.category.id)
  )

  return(
    <div className='main-content'>
      <LSidebarComponent 
        categories={categories}
        activeCategories={activeCategories}
        setActiveCategory={setActiveCategory}/>
      { view === 'activity'
        ? <ActivityfeedComponent 
            events={filteredEvents} 
            categories={activeCategories} 
            onDataChange={onDataChange} 
          />
        : <Calendar 
            events={filteredEvents} 
            tasks={tasks} 
            categories={activeCategories} 
            onDataChange={onDataChange}
          /> 
      }
      <RSidebarComponent 
        tasks={tasks} 
        onDataChange={onDataChange} 
      />
    </div>
  )
}