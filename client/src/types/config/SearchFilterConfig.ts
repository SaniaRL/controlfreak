
interface SearchField {
  key: string
  type: 'string' | 'number' | 'string[]'
}

export interface SearchFilterConfig {
  fieldsToSearch: SearchField[]
}