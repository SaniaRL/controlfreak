import { Category } from '../types/dto/Category'
import { EventData } from '../types/dto/EventData'
import { TaskData } from '../types/dto/TaskData'

export function updateList(item: Category, list: Category[]): Category[]
export function updateList(item: EventData, list: EventData[]): EventData[]
export function updateList(item: TaskData, list: TaskData[]): TaskData[]
export function updateList<T extends { id: string | number }>(item: T, list: T[]): T[] {
  return list.map(listItem => listItem.id === item.id ? item : listItem)
}

export function addToList(item: Category, list: Category[]): Category[]
export function addToList(item: EventData, list: EventData[]): EventData[]
export function addToList(item: TaskData, list: TaskData[]): TaskData[]
export function addToList<T>(item: T, list: T[]): T[] {
  return [...list, item]
}

export function deleteFromList(item: Category, list: Category[]): Category[]
export function deleteFromList(item: EventData, list: EventData[]): EventData[]
export function deleteFromList(item: TaskData, list: TaskData[]): TaskData[]
export function deleteFromList<T extends { id: string | number }>(item: T, list: T[]): T[] {
  return list.filter(listItem => listItem.id !== item.id)
}