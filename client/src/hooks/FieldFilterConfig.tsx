import { useState, useEffect } from 'react'
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

    const results = data.filter(item =>
      filterConfig.fieldsToSearch.some(field => {
        if (field.type !== 'string') return false

        const value = (item as any)[field.key]

        if (Array.isArray(value)) {
          return value.some((v: string) => v.toLowerCase().includes(loweredSearch))
        }

        if (typeof value !== 'string') return false

        return value.toLowerCase().includes(loweredSearch)
      })
    )

    setFilteredData(results)
  }, [data, filterConfig, searchTerm])

  return filteredData
}
