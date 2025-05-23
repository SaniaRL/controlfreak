import { useEffect, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import CategoryPicker from '../../shared/category-ui/CategoryPicker'
import DateToggle from '../../shared/date-ui/DateToggle'
import StandardButton from '../../shared/StandardButton'
import TagDisplay from '../../shared/tag-ui/TagDisplay'

import { Category } from '../../types/dto/Category'
import { EditEventItemProps } from '../../types/props/EditEventItemProps'

import './EventStyle.css'

export default function EditEventItem({ event, categories, onDataChange, toggleEditMode, globalEditMode }: EditEventItemProps) {
	const[newState, setNewState] = useState(event)
	const[isDirty, setIsDirty] = useState(false)
	// const[isValid, setIsValid] = useState(false)

	useEffect(() => {
  	setNewState(event)
		console.log('event date')
		console.log(newState.start)
	}, [event, setNewState])

	useEffect(() => {
  	setIsDirty(JSON.stringify(newState) !== JSON.stringify(event))
	}, [newState, event])

		//TODO: Kolla så data är korrekt och varningar och save changes ?
		//Kolla att ingen tom knapp är med


	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: Date } }) => {
    const target = e.target as HTMLInputElement
    const { name, type, value, checked } = target

    let fieldValue: string | boolean = type === 'checkbox' ? checked : value

		if (type === 'datetime-local') {
			fieldValue = new Date(value).toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' }).slice(0, 16);
		}

    setNewState(prev => ({ ...prev, [name]: fieldValue }))
	}

	const updateEvent = () => {
		console.log(newState)
		console.log('in updateEvent')
		onDataChange?.({
			type: 'events',
			CRUD: 'PUT',
			id: event.id,
			updates: newState
		})
		toggleEditMode(Number(event.id))		
	}

	const onCancel = () => {
		toggleEditMode(Number(event.id))
	}

	const editTag = (newTag: string, prevTag?: string) => {
		if(!newTag) {
			return
		}

		let updatedTags: string[]

		if(prevTag) {
			if(!newState.tags.includes(newTag)) {			
			updatedTags = newState.tags.map(t => 
				t === prevTag
					? newTag 
					: t
				)
			}
    } else {
		if(!newState.tags.map(t => t.toLowerCase()).includes(newTag.toLowerCase())) {
			updatedTags = [...newState.tags, newTag]
		} else {
			updatedTags = newState.tags.map(t =>
			t.toLowerCase() === newTag.toLowerCase()
				? t === newTag
					? t
					: newTag
				: t
		)}
	}

		setNewState(prev => ({...prev, tags: updatedTags}))
		console.log(`new state tags ${newState.id}:`)
		console.log(newState.tags)
	}

	const removeTag = (tag: string) => {
		//använd handlechange?
  setNewState(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
	}

	const handleCategoryChange = (selectedCategory: Category) => {
  setNewState(prev => ({ ...prev, category: selectedCategory }))
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
					value={newState.title}
					onChange={handleChange}/>
				
				<DateToggle 
					start={newState.start} 
					end={newState.end}
					allDay={newState.allDay}
					handleChange={handleChange} />

				<div className='event-item-btns'>
					<StandardButton
							props= {{
								key: event.id,
								id: event.id,
								buttonProps: { 
									content: {
										src: '/icons/edit_black.png', 
										alt: 'edit button'}, 
										className: `edit-event-button ${globalEditMode ? 'invisible' : ''}`},
								onClick: () => toggleEditMode(Number(event.id)) }}
					/>

					<StandardButton
						props= {{
							key: event.id,
							id: event.id,
							buttonProps: { 
								content: {
									src: '/icons/bin_black.png', 
									alt: 'garbage bin delete button'}, 
									className: 'edit-event-button'},
							onClick: onCancel }}/>
				</div>
			</div>

			<div className='edit-event-item-body'>
				<FormControl 
					as='textarea'
					name='content' 
					value={newState.content} 
					onChange={handleChange}/>
			</div>

			<div className='edit-event-item-footer'>
				<CategoryPicker 
				category={newState.category} 
				categories={categories!}
				onChange={handleCategoryChange}
				onDataChange={onDataChange}
				/>

				<TagDisplay 
					tags={newState.tags} 
					tagEditProps={{
						onDelete: removeTag, 
						onEdit: editTag}} 
				/>

				{//Villkor om alla kan raaderas
				}
				<Button 
					disabled={!isDirty} 
					type='submit'
					>
						save
				</Button>
			</div>
			<Form.Control type='hidden' value={newState.tags}/>
		</Form>
	)
}