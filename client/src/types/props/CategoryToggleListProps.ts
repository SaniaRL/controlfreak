import { Category } from '../dto/Category'

export interface CategoryToggleListProps {
  categories: Category[]
  activeCategories: Category[]
  setActiveCategory: (id: number, active: boolean) => void
}