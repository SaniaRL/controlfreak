import { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import { CategoryProps } from '../../../../types/props/CategoryProps'

import './Category.css'
import CreateCategory from './CreateCategory'

export default function CategoryPicker({category, categories, onChange, onDataChange}: CategoryProps) {
	const [selectedCategory, setSelectedCategory] = useState(category)
	const [editMode, setEditMode] = useState(false)
	const [showItems, setShowItems] = useState(false)


	const handleSelect = (key: string | null | undefined) => {
		if(!key) {
			//Skapa ny kategor-funktion
			return
		}
    const selected = categories.find((c) => String(c.id) === key);
    if (selected) {
      setSelectedCategory(selected)
      onChange(selected)
    }
  }

	const handleCreate = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		e.preventDefault()
		setEditMode(true)
	}

	//Se till att vald categori ej är med
	//Sätt edit-knapp på kategorierna

	return(
		<>			
			<DropdownButton 
				className='category-picker'
				id='category-picker'
				title={selectedCategory.name}
				style={{
					backgroundColor: selectedCategory.backgroundColor,
					color: selectedCategory.textColor}}>
				{editMode
					? <CreateCategory onDataChange={onDataChange}/>
					: <>
						<Dropdown.Item
							className='category-item'
							key={0} 
							eventKey={0}
							onClick={(e) => handleCreate(e)}
							style={{
								backgroundColor: '#3de32b',
								color: '#ffffff'}}>
							+
						</Dropdown.Item>

						<Dropdown.Divider />

						{categories.map(c => (
							c.id !== category.id &&
							<Dropdown.Item
								className='category-item'
								key={c.id}
								eventKey={c.id}
								style={{
									backgroundColor: c.backgroundColor,
									color: c.textColor}}>
								{c.name}
							</Dropdown.Item>
						))}
					</>
				}
			</DropdownButton>
		</>
	)
}