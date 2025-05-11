import { Category } from '../data/Category'

export interface CategoryProps {
    category: Category
    categories: Category[]
    onChange: (c: Category) => void
}