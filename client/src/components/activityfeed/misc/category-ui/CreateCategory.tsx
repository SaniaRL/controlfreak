import { useEffect, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'

import { Category } from '../../../../types/data/Category'
import { UpdatePayload } from '../../../../types/data/UpdatePayload'

import './Category.css'

const defaultValue = {
  name: 'text', 
  backgroundColor: '#ffffff',
  textColor: '#000000'
}

export default function CreateCategory({category, onDataChange, setEditMode}: {
    category?: Category
    onDataChange: (update?: UpdatePayload) => void
    setEditMode: (editMode: boolean) => void }) {
      const[newState, setNewState] = useState<Category>(defaultValue)

      useEffect(() => {
        if(category) {
          setNewState(category)        
        } 
      }, [])


    const handleOnDataChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      
	  	console.log('in Category data change')
  		console.log(newState)

      const newCategory = newState.id === 0

			onDataChange?.({
				type: 'categories',
				CRUD: newCategory ? 'POST' : 'PUT',
				id: newCategory ? undefined : newState.id,
				updates: newState
			})

      setEditMode(false)
      setNewState(defaultValue)
    }

    const onDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      
	  	console.log('in Category delete')
  		console.log(newState)
      
      if(newState.id) {
        onDataChange?.({
            type: 'categories',
            CRUD: 'DELETE',
            id: newState.id
			  })
      }

      setEditMode(false)
      setNewState(defaultValue)
    }


  return(
    <div className='create-category'>
      <Stack gap={2}>
        <Form.Control
          className='create-category-input' 
          type='text' 
          value={newState.name}
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => setNewState(prev => ({ ...prev, name: e.target.value }))}
          spellCheck={false}
          required
          style={{
            backgroundColor: newState?.backgroundColor,
            color: newState?.textColor
          }}/>
        <div className='create-category-color-div'>
          <Form.Control 
            type='color' 
            value={newState?.textColor}
            onChange={(e) => setNewState(prev => ({ ...prev, textColor: e.target.value }))}/>
          <Form.Control 
            type='color' 
            value={newState?.backgroundColor}
            onChange={(e) => setNewState(prev => ({ ...prev, backgroundColor: e.target.value }))}/>
        </div>
        <Button onClick={handleOnDataChange}>
          save
        </Button>
        <Button variant='secondary' onClick={onDelete}>
          delete
        </Button>
      </Stack>
    </div>
  )

}