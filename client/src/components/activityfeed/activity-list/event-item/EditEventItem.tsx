import { useEffect, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import CategoryPicker from '../../misc/category-ui/CategoryPicker'
import StandardButton from '../../../../shared/StandardButton'
import { EventData } from '../../../../types/data/EventData'
import { EventItemProps } from '../../../../types/props/EventItemProps'

import './EventItem.css'

export default function EditEventItem({ event, categories, onDataChange, disableEditMode }
	: EventItemProps) {
			const[isDirty, setIsDirty] = useState(false)
			const[newState, setNewState] = useState<EventData>(event)

			//TODO: Kolla så data är korrekt

	useEffect(() => {
		const isCurrentlyDirty = Object.keys(newState).some(key => {
			return newState[key as keyof EventData] !== event[key as keyof EventData]
		})
		setIsDirty(isCurrentlyDirty)
	}, [newState, event])

	const updateEvent = () => {
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

	//Ha save changes högre upp

	return(
		<Form 
			className='edit-event-item'
			onSubmit={ (e) =>
				{e.preventDefault()
				console.log("Formuläret skickas!")
				updateEvent()}}>
			<div className='event-item-head'>
				<FormControl 
					type='text'
					name='title' 
					className='event-title' 
					defaultValue={event.title}
					onChange={handleChange}/>

				<div className='dates'>
				{new Date(event.start).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
				{ event.end &&
				new Date(event.end).toLocaleString("sv-SE", { dateStyle: "short", timeStyle: "short" })}
				</div>

				<div className='event-item-btns'>
					<StandardButton
							props= {{
								key: event.id,
								id: event.id,
								buttonProps: { content: {src: '/icons/edit_black.png', alt: 'edit button'}, variant: 'light', className: 'edit-post-button'},
								onClick: () => disableEditMode(Number(event.id)) }} />
					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { content: {src: '/icons/bin_black.png', alt: 'garbage bin delete button'}, variant: 'light', className: 'edit-post-button'},
							onClick: onCancel }}/>
				</div>
			</div>

			<div className='event-item-body'>
				<FormControl 
					name='content' 
					defaultValue={event.content} 
					onChange={handleChange}/>
				<Button 
					disabled={!isDirty} 
					type='submit'
					>
						Save changes
				</Button>
				<Button onClick={onCancel} variant='Secondary'>Cancel</Button>
			</div>
			<div className='event-item-footer'>
				<CategoryPicker 
				category={event.category} 
				categories={categories}
				onChange={() => handleChange} />
			</div>
		</Form>
	)
}