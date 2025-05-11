import { useEffect, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'

import { Category } from '../../../../types/data/Category'
import { UpdatePayload } from '../../../../types/data/UpdatePayload'

import './Category.css'

export default function CreateCategory({category, onDataChange}: {
    category?: Category
    onDataChange: (update?: UpdatePayload) => void}) {
      const[newState, setNewState] = useState<Category>({
        name: 'Bob?', 
        backgroundColor: '#ffffff',
        textColor: '#000000'
      })

      useEffect(() => {
        if(category) {
          setNewState(category)        
        } 
      }, [])


    const handleOnDataChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      
	  	console.log('in Category data change')
  		console.log(newState)

      const newCategory = !newState.id

			onDataChange?.({
				type: 'categories',
				CRUD: newCategory ? 'POST' : 'PUT',
				id: newCategory ? undefined : newState.id,
				updates: newState
			})

      //Ska detta ske oavsett?
    }

  return(
    <div className='create-category'>
      <Stack gap={2}>
        <Form.Control
          className='create-category-input' 
          type='text' 
          value={newState.name}
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
      </Stack>
    </div>
  )

}