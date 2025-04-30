import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap'

function FilterDropdown() {
    return(
        <DropdownButton
        className='item'
        as={ButtonGroup}
        variant='secondary'
        title='Filter'>
          <Dropdown.Item>Show </Dropdown.Item>
          <Dropdown.Item>Another action</Dropdown.Item>
          <Dropdown.Item>Something else</Dropdown.Item>
        </DropdownButton>
    )
}

export default FilterDropdown