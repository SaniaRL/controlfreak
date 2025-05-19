import { useEffect, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import { Category } from '../../types/dto/Category'
import { CreateEventProps } from '../../types/props/CreateEventProps'
import { defaultCategory, defaultEvent } from '../../constants/defaults'
import { EventDataNullable } from '../../types/data/EventDataNullable'

import CategoryPicker from '../../shared/category-ui/CategoryPicker'
import DatePicker from '../../shared/date-ui/DatePicker'
import TagDisplay from '../../shared/tag-ui/TagDisplay'

import './EventStyle.css'

export default function CreateEvent({categories, onDataChange, closeOnSave, eventTemplate, setCurrentEventTemplate}
  : CreateEventProps) {
    const [hasRequiredFields, setHasRequiredFields] = useState(false)
    const [newEvent, setNewEvent] = useState<EventDataNullable>(defaultEvent)

  useEffect(() => {
    if(eventTemplate) {
      setNewEvent(eventTemplate)
    }
  }, [eventTemplate])
  
  useEffect(() => {
    if(!newEvent.category) {
      const category = defaultCategory(categories)
      setNewEvent(prev => ({ ...prev, category: category }))
    }
  }, [categories])

  useEffect(() => {
    const hasRequiredFields = 
    newEvent.title !== '' &&
    !!newEvent.start &&
    (!!newEvent.end || !!newEvent.allDay)

    setHasRequiredFields(hasRequiredFields)
    console.log(setHasRequiredFields(hasRequiredFields))
    console.log(newEvent)
  }, [newEvent])

  const createEvent = () => {
    console.log(newEvent)
    onDataChange?.({
      type: 'events',
      CRUD: 'POST',
      updates: newEvent
    })
    closeOnSave()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, type, value, checked } = target
    const fieldValue = type === 'checkbox' ? checked : value

    if (name === 'allDay') {
      setNewEvent(prev => {
        if (fieldValue) {
          return { ...prev, allDay: true, end: undefined }
        } else {
            const newEnd = prev.start
              ? new Date(new Date(prev.start).getTime() + 4 * 60 * 60 * 1000)
              : undefined
            return { ...prev, allDay: false, end: newEnd }
          }
      })
    } else {
      setNewEvent(prev => ({ ...prev, [name]: fieldValue }))
    }
  }

  	const editTag = (newTag: string, prevTag?: string) => {
		if(!newTag || !newEvent.tags) {
			return
		}

		let updatedTags: string[]

		if(prevTag) {
			if(!newEvent.tags.includes(newTag)) {			
			updatedTags = newEvent.tags.map(t => 
				t === prevTag
					? newTag 
					: t
				)
			}
    } else {
      if(!newEvent.tags.includes(newTag)) {
        updatedTags = [...newEvent.tags, newTag]
      } else {
        updatedTags = newEvent.tags.map(t =>
        t.toLowerCase() === newTag.toLowerCase()
          ? t === newTag
            ? t
            : newTag
          : t
      )}
    }
    setNewEvent(prev => ({...prev, tags: updatedTags}))
	}

  const removeTag = (tag: string) => {
    //använd handlechange //tags kan vara undefined?
  setNewEvent(prev => ({ ...prev, tags: prev.tags ? prev.tags.filter(t => t !== tag) : [] }));
  }
  
  const handleCategoryChange = (selectedCategory: Category) => {
  setNewEvent(prev => ({ ...prev, category: selectedCategory }))
  }

  if (!categories.length || !newEvent.category) return null
   
	return(
    <Form className='edit-event-item' onSubmit= {(e) => {
      e.preventDefault() 
      createEvent()
      setCurrentEventTemplate(null)}}>
        <div className='edit-event-item-head'>
          <FormControl 
            type='text'
            name='title' 
            className='event-title' 
            placeholder='...'
            value={newEvent.title}
            onChange={handleChange}
            autoFocus
          />
            

          <DatePicker
            start={newEvent.start!} 
            end={newEvent.end}
            allDay={newEvent.allDay!}
            handleChange={handleChange}
          />
        </div>

        <div className='edit-event-item-body'>
          <FormControl 
            as='textarea'
            name='content' 
            value={newEvent.content} 
            onChange={handleChange}/>
        </div>
  
        <div className='edit-event-item-footer'>
          <CategoryPicker 
          category={newEvent.category!} 
          categories={categories}
          onChange={handleCategoryChange}
          onDataChange={onDataChange}
          />

        <TagDisplay 
          tags={newEvent.tags} 
          tagEditProps={{
            onDelete: removeTag, 
            onEdit: editTag}} />

        <Button 
          disabled={!hasRequiredFields} 
          type='submit'
          >
            save
        </Button>
      </div>
      {/* HIDDEN CONTROLS */}
      <Form.Control type='hidden' value={newEvent.tags}/>
    </Form>
	)
}
  