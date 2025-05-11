import { useEffect, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import CategoryPicker from '../../misc/category-ui/CategoryPicker'
import StandardButton from '../../../../shared/StandardButton'
import TagDisplay from '../../misc/tag-ui/TagDisplay'

import { EventData } from '../../../../types/data/EventData'
import { EventItemProps } from '../../../../types/props/EventItemProps'

import './EventItem.css'
import DateDisplay from '../../misc/date-ui/DateDisplay'

export default function EditEventItem({ event, categories, onDataChange, disableEditMode }
	: EventItemProps) {
			const[isDirty, setIsDirty] = useState(false)
			const[newState, setNewState] = useState<EventData>(event)

			//TODO: Kolla så data är korrekt och varningar och save changes ?

	useEffect(() => {
		const isCurrentlyDirty = Object.keys(newState).some(key => {
			if(key === 'tags') {
				return JSON.stringify(newState.tags.sort()) !== JSON.stringify(event.tags.sort());
			}
			return newState[key as keyof EventData] !== event[key as keyof EventData]
		})
		setIsDirty(isCurrentlyDirty)
	}, [newState, event])

	const updateEvent = () => {
		console.log(newState)
		console.log('in updateEvent')
			onDataChange?.({
				type: 'events',
				CRUD: 'PUT',
				id: event.id,
				updates: newState
			})
		disableEditMode(Number(event.id))		
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewState(prev => ({ ...prev, [name]: value }))
	}

	const onCancel = () => {
		disableEditMode(Number(event.id))
	}

	const editTag = (prevTag: string, newTag: string) => {
    if(!newState.tags.includes(newTag)) {
		const updatedTags = newState.tags.map(t => t === prevTag ? newTag : t )
		setNewState(prev => ({...prev, tags: updatedTags}))
    }
	}

	const removeTag = (tag: string) => {
		newState.tags = newState.tags.filter(t => t !== tag)
	}

	return(
		<Form 
			className='edit-event-item'
			onSubmit={ (e) =>
				{e.preventDefault()
				console.log("Formuläret skickas!")
				updateEvent()}}>
			<div className='edit-event-item-head'>
				<FormControl 
					type='text'
					name='title' 
					className='event-title' 
					defaultValue={newState.title}
					onChange={handleChange}/>

				<div className='dates'>
					<DateDisplay start={event.start} end={event.end} allDay={event.allDay} />
				</div>

				<div className='event-item-btns'>
					<StandardButton
							props= {{
								key: event.id,
								id: event.id,
								buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, variant: 'light', className: 'edit-event-button'},
								onClick: () => disableEditMode(Number(event.id)) }} />
					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { content: {src: '/icons/bin_black.png', alt: 'garbage bin delete button'}, variant: 'light', className: 'edit-event-button'},
							onClick: onCancel }}/>
				</div>
			</div>

			<div className='event-item-body'>
				<FormControl 
					as='textarea'
					name='content' 
					defaultValue={newState.content} 
					onChange={handleChange}/>
				{/* <Button onClick={onCancel} variant='Secondary'>Cancel</Button> */}
			</div>

			<div className='edit-event-item-footer'>
				<CategoryPicker 
				category={newState.category} 
				categories={categories}
				onChange={() => handleChange} 
				/>
				{newState.tags && <TagDisplay tags={newState.tags} tagEditProps={{onDelete: removeTag, onEdit: editTag,}} />}
				<Button 
					disabled={!isDirty} 
					type='submit'
					>
						Save changes
				</Button>
			</div>
			{/* HIDDEN CONTROLS */}
			<Form.Control type='hidden' value={newState.tags}/>
		</Form>
	)
}