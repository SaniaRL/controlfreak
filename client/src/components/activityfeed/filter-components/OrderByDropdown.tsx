import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'


function OrderByDropdown() {
    return(
        <DropdownButton
        className='item'
        as={ButtonGroup}
        variant='secondary'
        title='OrderBy'>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
    )
}

export default OrderByDropdown