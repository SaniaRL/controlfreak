import Searchbar from './Searchbar'
import OrderByDropdown from './OrderByDropdown'
import FilterDropdown from './FilterDropdown'

export default function ActivityFilterPanel({ onSearch }
  : { onSearch: (searchTerm: string) => void }) {
  return(
    <div className='activity-filter-panel'>
      <Searchbar onSearch={onSearch}/>
      <FilterDropdown />
      <OrderByDropdown />
    </div>
  )
}