import { useEffect, useState } from 'react'
import { SearchFilterConfig } from '../types/config/SearchFilterConfig'

export function useSearchFilter<T>(
  data: T[],
  filterConfig: SearchFilterConfig,
  searchTerm: string
) {
  const [filteredData, setFilteredData] = useState<T[]>(data)

  useEffect(() => {
    
    if (!searchTerm) {
      setFilteredData(data)
      return
    }

    const loweredSearch = searchTerm.toLowerCase()
      console.log('results and stuff')

    const results = data.filter(item =>
      filterConfig.fieldsToSearch.some(field => {
        if (field.type !== 'string' && field.type != 'string[]') return false

        const value = (item as any)[field.key]

        if (typeof value === 'string') {
          return value.toLowerCase().includes(loweredSearch)
        }

        if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
          return value.some(v => v.toLowerCase().includes(loweredSearch))
        }

        return false
      })
    )

    setFilteredData(results)
  }, [data, filterConfig, searchTerm])

  return filteredData
}


