import { useEffect, useState } from 'react'
import { SearchFilterConfig } from '../types/config/SearchFilterConfig'

export function useSearchFilter<T>(
  data: T[],
  filterConfig: SearchFilterConfig,
  searchTerm: string,
  caseSensitive?: boolean
) {
  const [filteredData, setFilteredData] = useState<T[]>(data)

  useEffect(() => {
    
    if (!searchTerm) {
      setFilteredData(data)
      return
    }

    const search = caseSensitive ? searchTerm : searchTerm.toLowerCase()

    const results = data.filter(item =>
      filterConfig.fieldsToSearch.some(field => {

        const value = (item as any)[field.key]

        if (typeof value === 'string') 
          return caseSensitive ? value.includes(search) :value.toLowerCase().includes(search)
        

        if (Array.isArray(value) && value.every(v => typeof v === 'string'))
          return value.some(v => caseSensitive ? v.includes(search) : v.toLowerCase().includes(search))

        return false
      })
    )
    setFilteredData(results)
  }, [data, filterConfig, searchTerm, caseSensitive])

  return filteredData
}


