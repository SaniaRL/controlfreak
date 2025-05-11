import { useState } from 'react'

import { CloseButton, Form } from 'react-bootstrap'
import { TagEditProps } from '../../../../types/props/TagEditProps'

import './TagDisplay.css'

export default function Tag({ tag: prevState, editProps }: {
  tag: string
  editProps?: TagEditProps}) {
    // const [isEditing, setIsEditing] = useState(false)
    const [newState, setNewState] = useState(prevState)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewState(e.target.value)
  }

    const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setNewState(prevState)
    }
  }

  const handleSave = () => {
    if (newState !== prevState && editProps?.onEdit) {
      editProps.onEdit(prevState, newState)
    }
  }


  return(
    <div className='tag-item'>

      {editProps && 
        <CloseButton
        className='tag-item-close'
        onClick={() => editProps.onDelete(prevState)}/>}

      {editProps 
      ? <Form.Control 
          type='text' 
          placeholder={newState} 
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          onChange={handleInputChange}/>
      : <div># {prevState}</div>}

    </div>                                                                                                                                                                                                                                                      
  )
}