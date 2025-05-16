import Searchbar from './Searchbar'
import FilterPanel from './FilterPanel'

import './SearchFilterPanel.css'

export default function SearchFilterPanel({ onSearch, showPastEvents, setShowPastEvents, editMode, setEditMode }: {
  onSearch: (term: string) => void 
  showPastEvents: boolean
  setShowPastEvents: (checked: boolean) => void
  editMode: boolean
  setEditMode: (checked: boolean) => void
}){

  return(
    <div className='activity-filter-panel'>
      <Searchbar onSearch={onSearch}/>
      <FilterPanel 
        showPastEvents={showPastEvents} 
        setShowPastEvents={setShowPastEvents} 
        editMode={editMode} 
        setEditMode={setEditMode} 
      />
    </div>
  )
}