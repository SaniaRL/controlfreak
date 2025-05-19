
interface SearchField {
  key: string
  type: 'string' | 'string[]'
}

export interface SearchFilterConfig {
  fieldsToSearch: SearchField[]
}