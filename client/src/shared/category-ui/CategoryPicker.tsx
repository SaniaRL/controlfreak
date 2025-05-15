import { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'

import { Category } from '../../types/data/Category'
import { CategoryProps } from '../../types/props/CategoryProps'
import CategoryEditor from './CategoryEditor'

import './Category.css'

export default function CategoryPicker({category, categories, onChange, onDataChange}: CategoryProps) {
	const [selectedCategory, setSelectedCategory] = useState(category)
	const [editCategory, setEditCategory] = useState<Category | undefined>()
	const [editMode, setEditMode] = useState(false)

	const handleSelect = (key: string | number | null) => {
		if(key === 0 || key === '0') {
			setEditMode(true)
			return
		}
    const selected = categories.find((c) => String(c.id) === key)
    if (selected) {
      setSelectedCategory(selected)
      onChange(selected)
    }
  }

	return(
		<>			
			<DropdownButton 
				className='category-picker'
				id='category-picker'
				title={selectedCategory.name}
				onSelect={handleSelect}
				onToggle={(isOpen) => { if (!isOpen) setEditMode(false) }}
				style={{
					backgroundColor: selectedCategory.backgroundColor,
					color: selectedCategory.textColor}}>
				{editMode
					? <CategoryEditor category={editCategory} onDataChange={onDataChange} setEditMode={setEditMode}/>
					: <div className='category-picker-wrapper'>
						<Dropdown.Item
							className='category-item'
							key={0} 
							eventKey={0}
							onClick={(e) => {e.stopPropagation(); setEditCategory(undefined); handleSelect(0)}}
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
								eventKey={String(c.id)}
								style={{
									backgroundColor: c.backgroundColor,
									color: c.textColor}}>
								{c.name}
								<svg
									className='edit-icon'
									height="16"
									viewBox="0 0 24 24"
									width="16"
									xmlns="http://www.w3.org/2000/svg"
									style={{ fill: c.textColor, marginLeft: '8px' }}
									onClick={(e) => {
									  e.stopPropagation()
    								setEditCategory(c)
    								setEditMode(true)
									} }
						    >
									<path d="m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"/>
								</svg>
							</Dropdown.Item>
						))}
					</div>
				}
			</DropdownButton>
		</>
	)
}