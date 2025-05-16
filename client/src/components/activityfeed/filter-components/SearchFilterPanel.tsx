import Searchbar from './Searchbar'
import FilterPanel from './FilterPanel'
import { FilterPanelProps } from '../../../types/props/FilterPanelProps'

export default function SearchFilterPanel({ onSearch }
  : {onSearch: (term: string) => void }){

  return(
    <div className='activity-filter-panel'>
      <Searchbar onSearch={onSearch}/>
      <FilterPanel />
    </div>
  )
}