import { Category } from '../dto/Category'

export interface CategoryToggleProps {
  category: Category,
  active: boolean,
  toggleActive: () => void
}