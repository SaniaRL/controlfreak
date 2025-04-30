import Searchbar from './Searchbar';
import OrderByDropdown from './OrderByDropdown';
import FilterDropdown from './FilterDropdown';

function ActivityFilterPanel({ updateSearchResults }: { updateSearchResults: React.Dispatch<React.SetStateAction<any[]>> }) {
  return(
    <div className='activity-filter-panel'>
      <Searchbar updateSearchResults={updateSearchResults}/>
      <FilterDropdown />
      <OrderByDropdown />
    </div>
  );
}

export default ActivityFilterPanel