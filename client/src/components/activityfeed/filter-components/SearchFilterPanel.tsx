import Searchbar from './Searchbar'
import FilterPanel from './FilterPanel'

export default function SearchFilterPanel({ onSearch }
  : { onSearch: (searchTerm: string) => void }) {

  return(
    <div className='activity-filter-panel'>
      <Searchbar onSearch={onSearch}/>
      <FilterPanel />
    </div>
  )
}