import { useEffect, useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'

import CategoryPicker from '../../misc/category-ui/CategoryPicker'
import DateDisplay from '../../misc/date-ui/DateDisplay'
import StandardButton from '../../../../shared/StandardButton'
import TagDisplay from '../../misc/tag-ui/TagDisplay'

import { Category } from '../../../../types/data/Category'
import { EventData } from '../../../../types/data/EventData'
import { EventItemProps } from '../../../../types/props/EventItemProps'

import './EventItem.css'

export default function EditEventItem({ event, categories, onDataChange, disableEditMode }
	: EventItemProps) {
			const[isDirty, setIsDirty] = useState(false)
			const[newState, setNewState] = useState<EventData>(event)

			//TODO: Kolla så data är korrekt och varningar och save changes ?

			//Kolla att ingen tom knapp är med

	useEffect(() => {
		const isCurrentlyDirty = Object.keys(newState).some(key => {
			if(key === 'tags') {
				return JSON.stringify(newState.tags.sort()) !== JSON.stringify(event.tags.sort());
			}
			return newState[key as keyof EventData] !== event[key as keyof EventData]
		})
		setIsDirty(isCurrentlyDirty)
	}, [newState, event])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onCancel()
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [])

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

		//Den tycks komma hit även om newTag = ""
		//Detta körs en gång per tag istället för endast vid rop
		setNewState(prev => ({...prev, tags: updatedTags}))
		console.log(`new state tags ${newState.id}:`)
		console.log(newState.tags)
	}

	const removeTag = (tag: string) => {
  setNewState(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
	}

	const handleCategoryChange = (selectedCategory: Category) => {
  setNewState(prev => ({ ...prev, category: selectedCategory }))
 	}

	//TODO: autofocus

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
					<DateDisplay 
						start={event.start} 
						end={event.end} 
						allDay={event.allDay} />
				</div>

				<div className='event-item-btns'>
					<StandardButton
							props= {{
								key: event.id,
								id: event.id,
								buttonProps: { 
									content: {
										src: '/icons/edit_black.png', 
										alt: 'edit button'}, 
										className: 'edit-event-button'},
								onClick: () => disableEditMode(Number(event.id)) }} />

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
					defaultValue={newState.content} 
					onChange={handleChange}/>
				{/* <Button onClick={onCancel} variant='Secondary'>Cancel</Button> */}
			</div>

			<div className='edit-event-item-footer'>
				<CategoryPicker 
				category={newState.category} 
				categories={categories}
				onChange={handleCategoryChange} 
				/>

				{newState.tags && <TagDisplay 
					tags={newState.tags} 
					tagEditProps={{
						onDelete: removeTag, 
						onEdit: editTag}} />}

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