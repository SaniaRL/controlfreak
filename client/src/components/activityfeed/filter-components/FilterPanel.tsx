import { Form } from 'react-bootstrap'

import './SearchFilterPanel.css'

export default function FilterPanel({showPastEvents, setShowPastEvents, editMode, setEditMode}: {
  showPastEvents: boolean
  setShowPastEvents: (checked: boolean) => void
  editMode: boolean
  setEditMode: (checked: boolean) => void
}) {
    return(
      <div className='filter-panel-wrapper'>
        <div className='show-past-events filter-check filter-item'>
          <Form.Check
            checked={showPastEvents}
            onChange={e => setShowPastEvents(e.target.checked)} 
            />
          <Form.Label>
            Show past events
          </Form.Label>
        </div>
        <div className='filter-edit-mode filter-check filter-item'>
          <Form.Check
            checked={editMode}
            onChange={e => setEditMode(e.target.checked)}
          />
          <Form.Label>
            Edit Mode
          </Form.Label>
        </div>
      </div>
    )
}

