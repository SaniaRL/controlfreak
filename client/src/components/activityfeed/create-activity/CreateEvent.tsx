import { useEffect, useState } from 'react'
import { Button, Collapse, Container, Form, FormControl } from 'react-bootstrap'

import { UpdatePayload } from '../../../types/data/UpdatePayload'
import { EventData } from '../../../types/data/EventData'
import StandardButton from '../../../shared/StandardButton'

import './CreateEvent.css'

export default function CreateEvent({onDataChange}
  : {onDataChange: (updates?: UpdatePayload) => void}) {
    const [hasRequiredFields, setHasRequiredFields] = useState(false)
    const [newEvent, setNewEvent] = useState<Partial<EventData>>({})
    const [collapse, setCollapse] = useState(false)

  useEffect(() => {
    const hasRequiredFields = 
    !!newEvent.title &&
    !!newEvent.start &&
    (!!newEvent.end || !!newEvent.allDay)

    setHasRequiredFields(hasRequiredFields)
  }, [newEvent])

  const createEvent = () => {
    console.log(newEvent)
    onDataChange?.({
      type: 'events',
      CRUD: 'POST',
      updates: newEvent
    })
    setCollapse(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement
    const { name, type, value, checked } = target
    const fieldValue = type === 'checkbox' ? checked : value
    setNewEvent(prev => ({ ...prev, [name]: fieldValue }))
  }
  
	return(
    <>
    <StandardButton props={{
			buttonProps: { content: {src: '/icons/add_green.png', alt: 'add event button'}, variant: 'light', className: 'create-event-btn'},
			onClick: () => setCollapse(!collapse),
    }}/>

    <Collapse in={collapse}>
      <Container >
        <Form className='create-event' onSubmit= {(e) => {
          e.preventDefault() 
          createEvent()}}>
          <div className='head'>
            <FormControl 
              name='title'
              type='text'
              placeholder='Title'
              required={true}
              onChange={handleChange}/>

            <FormControl 
              name='start'
              type='datetime-local'
              required={true}
              onChange={handleChange}/>

            <FormControl
              name='end'
              type='datetime-local'
              required={!newEvent.allDay}
              onChange={handleChange}/>

            <Form.Check 
              name='allDay'
              type='checkbox'
              onChange={handleChange}/>
            
            <Button>RRPicker</Button>

          </div>
          <div className='body'>
            <FormControl 
                name='content'
                as='textarea'
                rows={3}
                placeholder='Skriv nåt fint idk'
                onChange={handleChange}/>
          </div>
          <div className='footer'>
            <Button>Category</Button>
            <Button>Tags</Button>
            <p>Tags...</p>
            <Button 
              className='submit'
              type='submit'
              disabled={!hasRequiredFields}>
                Create Event
            </Button>
          </div>
        </Form>
      </Container>
    </Collapse>
    </>
	)}