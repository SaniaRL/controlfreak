import { useState } from 'react'

import { CloseButton, Form } from 'react-bootstrap'
import { TagEditProps } from '../../../../types/props/TagEditProps'

import './TagDisplay.css'

export default function Tag({ tag: prevState, editProps, autofocus, cantClose }: {
  autofocus?: boolean
  tag: string
  cantClose?: boolean
  editProps?: TagEditProps}) {
    const [newState, setNewState] = useState<string>(prevState)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewState(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setNewState(prevState)
    }
  }

  const handleSave = () => {
    if (newState !== prevState && editProps?.onEdit) {
      editProps.onEdit(newState, prevState)
    } if(!prevState) {
      setNewState('')
    }
  }

  return(
    <div className='tag-item'>

      {editProps && !cantClose &&
        <CloseButton
        className='tag-item-remove'
        onClick={() => editProps.onDelete(prevState)}/>}

      {editProps 
      ? <div className="input-wrapper">
          <span className="input-sizer" aria-hidden="true">{newState || " "}</span>
          <Form.Control
            type="text"
            autoFocus={autofocus}
            value={newState}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            onChange={handleInputChange}
          />
        </div>
        : <div>{prevState}</div>}

    </div>                                                                                                                                                                                                                                                      
  )
}