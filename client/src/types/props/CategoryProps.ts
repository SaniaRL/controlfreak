import { Category } from '../data/Category'
import { UpdatePayload } from '../data/UpdatePayload'

export interface CategoryProps {
    category: Category
    categories: Category[]
    onChange: (c: Category) => void
    onDataChange: (update?: UpdatePayload) => void
}