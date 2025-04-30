import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Searchbar from './Searchbar';

function ActivityFilterPanel({ updateSearchResults }: { updateSearchResults: React.Dispatch<React.SetStateAction<any[]>> }) {
  return(
    <div className='activity-filter-panel'>
      <Searchbar updateSearchResults={updateSearchResults}/>

      <DropdownButton
      className='item'
      as={ButtonGroup}
      variant='secondary'
      title='Filter'>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>

      <DropdownButton
      className='item'
      as={ButtonGroup}
      variant='secondary'
      title='OrderBy'>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default ActivityFilterPanel