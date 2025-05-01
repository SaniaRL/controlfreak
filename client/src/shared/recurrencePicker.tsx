import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
import { RecurrenceInterval } from "../enums/recurrenceInterval"

function RecurrencePicker({ setRecurrence, className } 
  : { setRecurrence: React.Dispatch<React.SetStateAction<number>>, className?: string}) {
  return (
    <DropdownButton
    className={className}
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