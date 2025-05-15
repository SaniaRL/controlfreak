import { createContext } from 'react'
import { Category } from '../data/Category'

export interface CategoryContextType {
  newState: Category
  setNewState: React.Dispatch<React.SetStateAction<Category>>
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)