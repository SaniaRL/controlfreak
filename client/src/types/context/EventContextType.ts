import { createContext } from 'react'
import { EventData } from '../data/EventData'

export interface EventContextType {
  events: EventData[]
  setEvents: React.Dispatch<React.SetStateAction<EventData[]>>
}

export const EventContext = createContext<EventContextType | undefined>(undefined)

