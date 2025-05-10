import Searchbar from './Searchbar'
import OrderByDropdown from './OrderByDropdown'
import FilterDropdown from './FilterDropdown'

export default function ActivityFilterPanel({ onSearch }
  : { onSearch: (searchTerm: string) => void }) {

  //TODO: Show by category Show by tags

  return(
    <div className='activity-filter-panel'>
      <Searchbar onSearch={onSearch}/>
      <FilterDropdown />
      <OrderByDropdown />
    </div>
  )
}