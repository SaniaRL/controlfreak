import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { RecurrenceInterval } from "../enums/RecurrenceInterval";

function RecurrencePicker({ setRecurrence } : { setRecurrence: React.Dispatch<React.SetStateAction<number>> }) {
  return (
    <DropdownButton
    className='item'
    as={ButtonGroup}
    variant='secondary'
    title='Recurring'>
      {(Object.keys(RecurrenceInterval)).map((key, index) => (
        <Dropdown.Item 
        key={key} 
        onClick={() => setRecurrence(index)}>
          {key}
        </Dropdown.Item>
      ))}
    </DropdownButton>  
  );
}

export default RecurrencePicker