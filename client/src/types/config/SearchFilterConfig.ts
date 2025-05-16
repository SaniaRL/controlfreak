import { Category } from '../dto/Category'

// interface includeInSearchItem {
//   name: string
//   type: string
// }

// export interface SearchFilterConfig {
//   searchResult: string
//   activeCategories: Category[]
//   includeInSearch: includeInSearchItem[] 
// }

interface SearchField {
  key: string
  type: 'string' | 'number' | 'date'
}

export interface SearchFilterConfig {
  fieldsToSearch: SearchField[]
}