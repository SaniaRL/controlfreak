import { ButtonGroup, Dropdown, DropdownButton, Form } from 'react-bootstrap';

function ActivityFilterPanel() {
  return(
    <div className='activity-filter-panel'>
      <Form.Control
      className='item'
      type='search'
      placeholder='search'>
      </Form.Control>

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